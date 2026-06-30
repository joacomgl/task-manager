import type { Task } from '../types/task';

interface TodoItemProps {
  task: Task;
  onToggle: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

export default function TodoItem({ task, onToggle, onDelete }: TodoItemProps) {
  return (
    <li>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task)}
      />
      <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
        {task.title}
      </span>
      {task.description && <small> — {task.description}</small>}
      <button onClick={() => onDelete(task.id)}>Eliminar</button>
    </li>
  );
}
