import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const ses = new SESClient({
    region: process.env.AWS_REGION!,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método no permitido.' });
    }

    const { toEmail, tasks } = req.body;

    if (!toEmail || !tasks) {
        return res.status(400).json({ error: 'Faltan datos: toEmail y tasks son requeridos.' });
    }

    const pending = tasks.filter((t: { completed: boolean }) => !t.completed);
    const completed = tasks.filter((t: { completed: boolean }) => t.completed);

    const htmlBody = `
    <h1>Resumen de tus tareas</h1>
    <h2>✅ Completadas (${completed.length})</h2>
    <ul>
      ${completed.map((t: { title: string }) => `<li>${t.title}</li>`).join('')}
    </ul>
    <h2>⏳ Pendientes (${pending.length})</h2>
    <ul>
      ${pending.map((t: { title: string }) => `<li>${t.title}</li>`).join('')}
    </ul>
  `;

    const command = new SendEmailCommand({
        Source: process.env.AWS_SES_FROM_EMAIL!,
        Destination: {
            ToAddresses: [toEmail],
        },
        Message: {
            Subject: {
                Data: 'Resumen de tus tareas — Task Manager',
            },
            Body: {
                Html: {
                    Data: htmlBody,
                },
            },
        },
    });

    try {
        await ses.send(command);
        return res.status(200).json({ message: 'Email enviado correctamente.' });
    } catch (error) {
        console.error('Error SES:', error);
        return res.status(500).json({ error: 'No se pudo enviar el email.' });
    }
}