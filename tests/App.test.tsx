import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Tasks from '../src/pages/Tasks';

// Mock de Firebase para evitar llamadas reales
vi.mock('../src/config/firebase.config', () => ({
  auth: {},
  db: {},
  firebaseApp: {},
}));

vi.mock('../src/hooks/useAuth', () => ({
  useAuth: () => ({
    user: { email: 'test@test.com', uid: '123' },
    loading: false,
    logout: vi.fn(),
  }),
}));

vi.mock('../src/hooks/useTasks', () => ({
  useTasks: () => ({
    tasks: [],
    loading: false,
    error: '',
    addTask: vi.fn(),
    toggleComplete: vi.fn(),
    removeTask: vi.fn(),
  }),
}));

describe('Tasks page', () => {
  it('renders the heading', () => {
    render(<Tasks />);
    expect(screen.getByText('Task Manager')).toBeInTheDocument();
  });
});
