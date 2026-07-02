import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from '../src/components/TodoList';
import type { Task } from '../src/types/task';

const mockTasks: Task[] = [
  { id: '1', title: 'Tarea uno', description: '', completed: false, createdAt: 1 },
  { id: '2', title: 'Tarea dos', description: '', completed: true, createdAt: 2 },
];

describe('TodoList', () => {
  it('renderiza la lista de tareas', () => {
    render(<TodoList tasks={mockTasks} onToggle={vi.fn()} onDelete={vi.fn()} />);
    expect(screen.getByText('Tarea uno')).toBeInTheDocument();
    expect(screen.getByText('Tarea dos')).toBeInTheDocument();
  });

  it('muestra mensaje cuando no hay tareas', () => {
    render(<TodoList tasks={[]} onToggle={vi.fn()} onDelete={vi.fn()} />);
    expect(screen.getByText('No hay tareas todavía. ¡Agregá la primera!')).toBeInTheDocument();
  });

  it('llama a onDelete al hacer clic en Eliminar', () => {
    const onDelete = vi.fn();
    render(<TodoList tasks={mockTasks} onToggle={vi.fn()} onDelete={onDelete} />);
    const deleteButtons = screen.getAllByText('Eliminar');
    fireEvent.click(deleteButtons[0]);
    expect(onDelete).toHaveBeenCalledWith('1');
  });

  it('llama a onToggle al hacer clic en el checkbox', () => {
    const onToggle = vi.fn();
    render(<TodoList tasks={mockTasks} onToggle={onToggle} onDelete={vi.fn()} />);
    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[0]);
    expect(onToggle).toHaveBeenCalledWith(mockTasks[0]);
  });
});
