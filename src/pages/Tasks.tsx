import { useAuth } from '../hooks/useAuth';
import { useTasks } from '../hooks/useTasks';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';

export default function Tasks() {
  const { user, logout } = useAuth();
  const { tasks, loading, error, addTask, toggleComplete, removeTask } =
    useTasks(user?.uid);

  return (
    <div>
      <h1>Tasks</h1>
      <p>Sesión: {user?.email}</p>
      <button onClick={logout}>Cerrar sesión</button>

      <TodoForm onAdd={addTask} />

      {loading && <p>Cargando tareas...</p>}
      {error && <p>{error}</p>}

      <TodoList tasks={tasks} onToggle={toggleComplete} onDelete={removeTask} />
    </div>
  );
}
