import { useState, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, loginWithGoogle } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      navigate('/tasks');
    } catch {
      setError('Email o contraseña incorrectos.');
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    try {
      await loginWithGoogle();
      navigate('/tasks');
    } catch {
      setError('No se pudo iniciar sesión con Google.');
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
        <p className="auth-card__subtitle">Iniciá sesión para continuar</p>
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
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="btn btn--primary" type="submit">Ingresar</button>
        </form>
        <div className="divider">o</div>
        <button className="btn btn--google" onClick={handleGoogleLogin}>
          🔵 Ingresar con Google
        </button>
        {error && <p className="error-msg">{error}</p>}
        <p className="auth-link">
          ¿No tenés cuenta? <Link to="/register">Registrate</Link>
        </p>
      </div>
    </div>
  );
}
