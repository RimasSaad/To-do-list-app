import { useEffect, useState } from 'react';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import FilterBar from './components/FilterBar';
import type { Task, Filter } from './types/task';
import { ClipboardDocumentCheckIcon, TrashIcon } from '@heroicons/react/24/solid';

function App() {
  // State to hold an array of tasks with an order of most recent first
  const [tasks, setTasks] = useState<Task[]>([]);

  // State to hold the current filter applied to the task list
  const [filter, setFilter] = useState<Filter>('All');

  // State to track if tasks have been loaded from localStorage
  const [hasLoaded, setHasLoaded] = useState(false);

  // Load tasks from localStorage once on mount
  useEffect(() => {
    const stored = localStorage.getItem('tasks');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        console.log('Loaded from localStorage:', parsed); // Debugging line
        setTasks(parsed);
      } catch (e) {
        console.error("Failed to parse stored tasks:", e);
      }
    }
    setHasLoaded(true); // Set hasLoaded to true after attempting to load tasks
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    if (hasLoaded) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks, hasLoaded]);

  // Function to add a new task, incomplete initially
  const addTask = (title: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      completed: false,
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  // Function to toggle the completion status of a task
  const toggleTask = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Function to delete a task by its ID
  const deleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  // Function to clear all tasks
  const clearTasks = () => {
    setTasks([]);
  };

  // Function to filter the tasks before rendering
  const getFilteredTasks = () => {
    if (filter === 'Completed') return tasks.filter((task) => task.completed);
    if (filter === 'Incomplete') return tasks.filter((task) => !task.completed);
    return tasks;
  };

  return (
    <div className="min-h-screen bg-violet-100 p-4">

      {/* Header section with icon and welcome text */}
      <header className="flex items-center justify-center gap-3 mb-6">
        <ClipboardDocumentCheckIcon className="w-8 h-8 text-purple-400" />
        <h1 className="text-2xl font-bold text-purple-500">Welcome to Your To-Do List</h1>
      </header>

      <div className="bg-white rounded shadow p-6 mx-auto max-w-screen-xl">

        {/* Responsive two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-[30%_70%] gap-6 mt-6">
          
          {/* Left column: All tasks (only on tablet and larger) */}
          <div className="hidden md:block border-r pr-4">
            
            {/* Task input component */}
            <TaskInput onAddTask={addTask} />

            {/* Clear all button + All tasks header */}
            {tasks.length > 0 && (
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-purple-500">All Tasks</h2>
                <button
                  onClick={clearTasks}
                  className="flex items-center gap-1 text-m text-red-700 hover:text-red-800 cursor-pointer"
                >
                  <TrashIcon className="w-4 h-4" />
                  Clear All
                </button>
              </div>
            )}

            {/* Full list of all tasks (unfiltered) */}
            <TaskList
              tasks={tasks}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />
          </div>

          {/* Right column: Filters + filtered list */}
          <div className="pl-0 md:p-4">
            
            {/* Placeholder block */}
            <div className="h-20 bg-purple-100 rounded mb-4 flex items-center justify-center text-purple-400">
              Placeholder block (for future use) {/* This can be used for additional features (API quotes) */}
            </div>

            <div className="md:hidden">
              {/* Task input component on mobile */}
              <TaskInput onAddTask={addTask} />
            </div>

            {/* Filter controls + Clear button on mobile */}
            <div className="flex flex-col gap-2">
              {/* Filter + Clear All bar on mobile */}
              <div className="flex items-center justify-between md:justify-start md:gap-4 mb-2">
                
                {/* Filter buttons left-aligned) */}
                <FilterBar currentFilter={filter} onFilterChange={setFilter} />

                {/* Clear All only on mobile right-aligned */}
                {tasks.length > 0 && (
                  <button
                    onClick={clearTasks}
                    className="md:hidden flex items-center gap-1 text-sm text-red-700 hover:text-red-800 cursor-pointer"
                  >
                    <TrashIcon className="w-4 h-4" />
                    Clear All
                  </button>
                )}
              </div>

              {/* Filtered list */}
              <TaskList
                tasks={getFilteredTasks()}
                onToggle={toggleTask}
                onDelete={deleteTask}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;