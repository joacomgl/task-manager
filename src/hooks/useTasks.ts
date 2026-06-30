import { useEffect, useState } from 'react';
import {
  subscribeToTasks,
  createTask,
  updateTask,
  deleteTask,
} from '../services/tasks';
import type { Task, NewTask } from '../types/task';

export function useTasks(userId: string | undefined) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!userId) {
      setTasks([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const unsubscribe = subscribeToTasks(userId, (data) => {
      setTasks(data);
      setLoading(false);
    });

    return unsubscribe;
  }, [userId]);

  const addTask = async (task: NewTask) => {
    if (!userId) return;
    try {
      await createTask(userId, task);
    } catch {
      setError('No se pudo crear la tarea.');
    }
  };

  const editTask = async (taskId: string, data: Partial<NewTask>) => {
    if (!userId) return;
    try {
      await updateTask(userId, taskId, data);
    } catch {
      setError('No se pudo actualizar la tarea.');
    }
  };

  const removeTask = async (taskId: string) => {
    if (!userId) return;
    try {
      await deleteTask(userId, taskId);
    } catch {
      setError('No se pudo eliminar la tarea.');
    }
  };

  const toggleComplete = (task: Task) =>
    editTask(task.id, { completed: !task.completed });

  return { tasks, loading, error, addTask, editTask, removeTask, toggleComplete };
}
