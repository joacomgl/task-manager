import { useState } from 'react';
import type { Task } from '../types/task';

interface EmailSummaryButtonProps {
  userEmail: string;
  tasks: Task[];
}

export default function EmailSummaryButton({ userEmail, tasks }: EmailSummaryButtonProps) {
  const [emailStatus, setEmailStatus] = useState('');
  const [sendingEmail, setSendingEmail] = useState(false);

  const handleSendSummary = async () => {
    setSendingEmail(true);
    setEmailStatus('');
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ toEmail: userEmail, tasks }),
      });
      if (!response.ok) throw new Error('Error al enviar');
      setEmailStatus('✅ Email enviado correctamente.');
    } catch {
      setEmailStatus('❌ No se pudo enviar el email.');
    } finally {
      setSendingEmail(false);
    }
  };

  return (
    <div className="email-summary">
      <button className="btn btn--primary" onClick={handleSendSummary} disabled={sendingEmail}>
        {sendingEmail ? 'Enviando...' : '📧 Enviar resumen por email'}
      </button>
      {emailStatus && <p className="status-msg">{emailStatus}</p>}
    </div>
  );
}
