// TaskItem.tsx
// This component represents a single task item in the todo list.

import type { Task } from '../types/task';
import { TrashIcon } from '@heroicons/react/24/outline';

// Props expected from the parent (App): the task object, and two handlers
type TaskItemProps = {
  task: Task;
  // Function to mark as completed/incomplete
  onToggle: (id: string) => void;   // Called when checkbox is toggled
  // Function to delete the task
  onDelete: (id: string) => void;   // Called when delete icon is clicked
};

// Functional component
export default function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  return (
    <li
      // <li> with conditional background based on completion
      className={`flex items-center justify-between p-3 border rounded ${
        task.completed ? 'bg-gray-100' : 'bg-white'
      }`}
    >
      {/* Left side: checkbox + task title */}
      <div className="flex items-center gap-3">
        {/* Checkbox: checked based on task.completed, triggers onToggle on change */}
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="w-5 h-5 text-blue-600"
        />

        {/* Task title: applies line-through and gray text when completed */}
        <span
          className={`text-lg ${
            task.completed ? 'line-through text-gray-500' : 'text-gray-900'
          }`}
        >
          {task.title}
        </span>
      </div>

      {/* Right side: delete button with trash icon */}
      <button
        type="button"
        onClick={() => onDelete(task.id)}
        className="text-gray-500 hover:text-red-500"
      >
        <TrashIcon className="w-5 h-5" />
      </button>
    </li>
  );
}
