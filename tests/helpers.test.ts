import { describe, it, expect } from 'vitest';
import { formatTaskCount, filterTasks } from '../src/utils/helpers';

describe('formatTaskCount', () => {
  it('devuelve el formato correcto', () => {
    expect(formatTaskCount(5, 3)).toBe('3 de 5 tareas completadas');
  });

  it('funciona con cero completadas', () => {
    expect(formatTaskCount(3, 0)).toBe('0 de 3 tareas completadas');
  });
});

describe('filterTasks', () => {
  const tasks = [
    { completed: true },
    { completed: false },
    { completed: true },
  ];

  it('filtra tareas pendientes', () => {
    expect(filterTasks(tasks, 'pending')).toHaveLength(1);
  });

  it('filtra tareas completadas', () => {
    expect(filterTasks(tasks, 'completed')).toHaveLength(2);
  });

  it('devuelve todas las tareas', () => {
    expect(filterTasks(tasks, 'all')).toHaveLength(3);
  });
});
