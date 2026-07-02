import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoForm from '../src/components/TodoForm';

describe('TodoForm', () => {
  it('renderiza el formulario correctamente', () => {
    render(<TodoForm onAdd={vi.fn()} />);
    expect(screen.getByPlaceholderText('Título de la tarea')).toBeInTheDocument();
    expect(screen.getByText('+ Agregar')).toBeInTheDocument();
  });

  it('llama a onAdd con los datos correctos al enviar', () => {
    const onAdd = vi.fn();
    render(<TodoForm onAdd={onAdd} />);

    fireEvent.change(screen.getByPlaceholderText('Título de la tarea'), {
      target: { value: 'Mi tarea de prueba' },
    });
    fireEvent.click(screen.getByText('+ Agregar'));

    expect(onAdd).toHaveBeenCalledWith({
      title: 'Mi tarea de prueba',
      description: '',
      completed: false,
    });
  });

  it('no llama a onAdd si el título está vacío', () => {
    const onAdd = vi.fn();
    render(<TodoForm onAdd={onAdd} />);
    fireEvent.click(screen.getByText('+ Agregar'));
    expect(onAdd).not.toHaveBeenCalled();
  });
});
