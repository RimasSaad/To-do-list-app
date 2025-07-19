// TaskList.tsx
// This component renders a list of tasks, each represented by TaskItem.

import type { Task } from '../types/task';
import TaskItem from './TaskItem';

// Props expected from the parent (App)
type TaskListProps = {
  tasks: Task[];
  // Function to mark as completed/incomplete
  onToggle: (id: string) => void;
  // Function to delete the task
  onDelete: (id: string) => void;
};

export default function TaskList({ tasks, onToggle, onDelete }: TaskListProps) {
  // If no tasks, show a placeholder
  if (tasks.length === 0) {
    return <p className="text-purple-500 text-center mt-4">No tasks yet, Get productive!</p>;
  }

  // If there is tasks render them
  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
