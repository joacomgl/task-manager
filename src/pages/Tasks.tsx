import { useAuth } from '../hooks/useAuth';
import { useTasks } from '../hooks/useTasks';
import { useTheme } from '../hooks/useTheme';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';
import EmailSummaryButton from '../components/EmailSummaryButton';

export default function Tasks() {
  const { user, logout } = useAuth();
  const { tasks, loading, error, addTask, editTask, toggleComplete, removeTask } = useTasks(user?.uid);
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <nav className="glass navbar">
        <span className="navbar__brand">Task Manager</span>
        <div className="navbar__actions">
          <span className="navbar__email">{user?.email}</span>
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          <button className="btn btn--ghost" onClick={logout}>Salir</button>
        </div>
      </nav>
      <main className="tasks-page">
        <div className="glass">
          <TodoForm onAdd={addTask} />
        </div>
        {loading && <p className="loading">Cargando tareas...</p>}
        {error && <p className="error-msg">{error}</p>}
        <div className="glass">
          <TodoList
            tasks={tasks}
            onToggle={toggleComplete}
            onDelete={removeTask}
            onEdit={editTask}
          />
        </div>
        {user?.email && (
          <div className="glass">
            <EmailSummaryButton userEmail={user.email} tasks={tasks} />
          </div>
        )}
      </main>
    </>
  );
}
