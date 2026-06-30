import type { Task } from '../types/task';
import TodoItem from './TodoItem';

interface TodoListProps {
  tasks: Task[];
  onToggle: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

export default function TodoList({ tasks, onToggle, onDelete }: TodoListProps) {
  if (tasks.length === 0) return <p>No hay tareas todavía.</p>;

  return (
    <ul>
      {tasks.map((task) => (
        <TodoItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </ul>
  );
}
