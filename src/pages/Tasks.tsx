import { useAuth } from '../hooks/useAuth';

export default function Tasks() {
  const { user, logout } = useAuth();

  return (
    <div>
      <h1>Tasks</h1>
      <p>Sesión: {user?.email}</p>
      <button onClick={logout}>Cerrar sesión</button>
    </div>
  );
}
