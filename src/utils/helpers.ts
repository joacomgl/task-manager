export function formatTaskCount(total: number, completed: number): string {
  return `${completed} de ${total} tareas completadas`;
}

export function filterTasks(
  tasks: { completed: boolean }[],
  filter: 'all' | 'pending' | 'completed'
) {
  if (filter === 'pending') return tasks.filter((t) => !t.completed);
  if (filter === 'completed') return tasks.filter((t) => t.completed);
  return tasks;
}
