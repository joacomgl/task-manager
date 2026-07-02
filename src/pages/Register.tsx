import { useState, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { register, loginWithGoogle } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await register(email, password);
      navigate('/tasks');
    } catch {
      setError('No se pudo crear la cuenta. Verificá los datos.');
    }
  };

  const handleGoogleRegister = async () => {
    setError('');
    try {
      await loginWithGoogle();
      navigate('/tasks');
    } catch {
      setError('No se pudo registrar con Google.');
    }
  };

  return (
    <div className="auth-page">
      <div className="glass auth-card">
        <div className="auth-card__topbar">
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
        <h1 className="auth-card__title">Task Manager</h1>
        <p className="auth-card__subtitle">Creá tu cuenta gratuita</p>
        <form className="form" onSubmit={handleSubmit}>
          <input
            className="input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="input"
            type="password"
            placeholder="Contraseña (mínimo 6 caracteres)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
          <button className="btn btn--primary" type="submit">Crear cuenta</button>
        </form>
        <div className="divider">o</div>
        <button className="btn btn--google" onClick={handleGoogleRegister}>
          🔵 Registrarse con Google
        </button>
        {error && <p className="error-msg">{error}</p>}
        <p className="auth-link">
          ¿Ya tenés cuenta? <Link to="/login">Iniciá sesión</Link>
        </p>
      </div>
    </div>
  );
}