// TaskInput.tsx
// This component allows users to input new tasks for the todo list.

import { useState } from 'react';

// Propsexpected from the parent (App): a function to add a task by title
type TaskInputProps = {
  onAddTask: (title: string) => void;
};

// Functional component to handle adding new tasks
export default function TaskInput({ onAddTask }: TaskInputProps) {
  // Local state for the input field
  const [inputValue, setInputValue] = useState('');

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    // prevent page reload
    e.preventDefault(); 
    // remove extra spaces
    const trimmed = inputValue.trim(); 
    if (trimmed.length > 0) {
      // call the parent function to add the task
      onAddTask(trimmed); 
      // clear the input after submitting
      setInputValue(''); 
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      {/* Text input field */}
      <input
        type="text"
        placeholder="Add a task..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="flex-grow px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {/* Add button */}
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add
      </button>
    </form>
  );
}
