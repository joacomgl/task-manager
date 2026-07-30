import type { Task } from '../types/task';
import TodoItem from './TodoItem';

interface TodoListProps {
  tasks: Task[];
  onToggle: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onEdit: (taskId: string, data: { title: string; description: string }) => void;
}

export default function TodoList({ tasks, onToggle, onDelete, onEdit }: TodoListProps) {
  if (tasks.length === 0) {
    return <p className="task-list__empty">No hay tareas todavía. ¡Agregá la primera!</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TodoItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}
