import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { VercelRequest, VercelResponse } from '@vercel/node';

// Mockeamos el cliente de AWS SES: no queremos que los tests
// disparen emails reales, solo verificar que el handler lo usa bien.
const sendMock = vi.fn();

vi.mock('@aws-sdk/client-ses', () => {
    function SESClient() {
        return { send: sendMock };
    }
    function SendEmailCommand(input: unknown) {
        return { input };
    }
    return { SESClient, SendEmailCommand };
});

// Variables de entorno necesarias para que el módulo se inicialice.
process.env.AWS_REGION = 'us-east-1';
process.env.AWS_ACCESS_KEY_ID = 'test-key';
process.env.AWS_SECRET_ACCESS_KEY = 'test-secret';
process.env.AWS_SES_FROM_EMAIL = 'no-reply@task-manager.test';

// Import dinámico para que corra DESPUÉS de setear las env vars y el mock.
const { default: handler } = await import('../api/send-email');

function createMockRes() {
    const res = {
        statusCode: 0,
        body: undefined as unknown,
        status(code: number) {
            res.statusCode = code;
            return res;
        },
        json(payload: unknown) {
            res.body = payload;
            return res;
        },
    };
    return res as unknown as VercelResponse & { statusCode: number; body: unknown };
}

const sampleTasks = [
    { title: 'Comprar café', completed: true },
    { title: 'Escribir tests', completed: false },
];

describe('POST /api/send-email', () => {
    beforeEach(() => {
        sendMock.mockReset();
    });

    it('rechaza métodos que no sean POST', async () => {
        const req = { method: 'GET' } as VercelRequest;
        const res = createMockRes();

        await handler(req, res);

        expect(res.statusCode).toBe(405);
        expect(res.body).toEqual({ error: 'Método no permitido.' });
        expect(sendMock).not.toHaveBeenCalled();
    });

    it('rechaza el request si faltan toEmail o tasks', async () => {
        const req = { method: 'POST', body: { toEmail: 'user@test.com' } } as VercelRequest;
        const res = createMockRes();

        await handler(req, res);

        expect(res.statusCode).toBe(400);
        expect(sendMock).not.toHaveBeenCalled();
    });

    it('arma y envía el email correctamente con el resumen de tareas', async () => {
        sendMock.mockResolvedValueOnce({ MessageId: 'abc-123' });

        const req = {
            method: 'POST',
            body: { toEmail: 'user@test.com', tasks: sampleTasks },
        } as VercelRequest;
        const res = createMockRes();

        await handler(req, res);

        // Se llamó a SES una sola vez
        expect(sendMock).toHaveBeenCalledTimes(1);

        // El comando se armó con el destinatario y el contenido esperado
        const sentCommand = sendMock.mock.calls[0][0];
        expect(sentCommand.input.Destination.ToAddresses).toEqual(['user@test.com']);
        expect(sentCommand.input.Message.Subject.Data).toContain('Resumen de tus tareas');
        expect(sentCommand.input.Message.Body.Html.Data).toContain('Comprar café');
        expect(sentCommand.input.Message.Body.Html.Data).toContain('Escribir tests');
        expect(sentCommand.input.Message.Body.Html.Data).toContain('Completadas (1)');
        expect(sentCommand.input.Message.Body.Html.Data).toContain('Pendientes (1)');

        // Respuesta exitosa al cliente
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ message: 'Email enviado correctamente.' });
    });

    it('devuelve 500 si SES falla al enviar', async () => {
        sendMock.mockRejectedValueOnce(new Error('SES no disponible'));

        const req = {
            method: 'POST',
            body: { toEmail: 'user@test.com', tasks: sampleTasks },
        } as VercelRequest;
        const res = createMockRes();

        await handler(req, res);

        expect(res.statusCode).toBe(500);
        expect(res.body).toEqual({ error: 'No se pudo enviar el email.' });
    });
});