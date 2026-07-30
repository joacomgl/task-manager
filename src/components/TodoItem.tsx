import { useState } from 'react';
import type { Task } from '../types/task';

interface TodoItemProps {
  task: Task;
  onToggle: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onEdit: (taskId: string, data: { title: string; description: string }) => void;
}

export default function TodoItem({ task, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const handleSave = () => {
    if (!title.trim()) return;
    onEdit(task.id, { title, description });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTitle(task.title);
    setDescription(task.description);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <li className="task-item task-item--editing">
        <div className="task-item__content" style={{ flex: 1 }}>
          <input
            className="input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
          <input
            className="input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descripción (opcional)"
            style={{ marginTop: '0.5rem' }}
          />
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
          <button className="todo-form__submit" onClick={handleSave}>Guardar</button>
          <button className="btn btn--ghost" onClick={handleCancel}>Cancelar</button>
        </div>
      </li>
    );
  }

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
      <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
        <button className="btn btn--ghost" style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem' }} onClick={() => setIsEditing(true)}>
          Editar
        </button>
        <button className="btn btn--danger" onClick={() => onDelete(task.id)}>
          Eliminar
        </button>
      </div>
    </li>
  );
}
