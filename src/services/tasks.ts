import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore';
import { db } from './firebase';
import type { Task, NewTask } from '../types/task';

const tasksRef = (userId: string) =>
  collection(db, 'users', userId, 'tasks');

export function subscribeToTasks(
  userId: string,
  callback: (tasks: Task[]) => void
) {
  const q = query(tasksRef(userId), orderBy('createdAt', 'desc'));
  return onSnapshot(q, (snapshot) => {
    const tasks = snapshot.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    })) as Task[];
    callback(tasks);
  });
}

export function createTask(userId: string, task: NewTask) {
  return addDoc(tasksRef(userId), {
    ...task,
    createdAt: Date.now(),
  });
}

export function updateTask(
  userId: string,
  taskId: string,
  data: Partial<NewTask>
) {
  const taskDoc = doc(db, 'users', userId, 'tasks', taskId);
  return updateDoc(taskDoc, data);
}

export function deleteTask(userId: string, taskId: string) {
  const taskDoc = doc(db, 'users', userId, 'tasks', taskId);
  return deleteDoc(taskDoc);
}
