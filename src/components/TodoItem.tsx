import type { Task } from '../types/task';

interface TodoItemProps {
  task: Task;
  onToggle: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

export default function TodoItem({ task, onToggle, onDelete }: TodoItemProps) {
  return (
    <li className="task-item">
      <input
        className="task-item__checkbox"
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task)}
      />
      <div className="task-item__content">
        <p className={`task-item__title${task.completed ? ' task-item__title--completed' : ''}`}>
          {task.title}
        </p>
        {task.description && (
          <p className="task-item__desc">{task.description}</p>
        )}
      </div>
      <button className="btn btn--danger" onClick={() => onDelete(task.id)}>
        Eliminar
      </button>
    </li>
  );
}
