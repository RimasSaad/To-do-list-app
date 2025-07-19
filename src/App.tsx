import { useEffect, useState } from 'react';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import FilterBar from './components/FilterBar';
import type { Task, Filter } from './types/task';

function App() {
  // State to hold an array of tasks with an order of most recent first
  const [tasks, setTasks] = useState<Task[]>([]);

  // State to hold the current filter applied to the task list
  const [filter, setFilter] = useState<Filter>('All');

  // State to track if tasks have been loaded from localStorage
  const [hasLoaded, setHasLoaded] = useState(false); 

  // Load tasks from localStorage once on mountn
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
      // generates a unique ID based on the current timestamp
      id: Date.now().toString(),
      title,
      completed: false,
    };
    // Add the new task to the beginning of the task list using the latest state
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
    return tasks; // All tasks
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-xl mx-auto bg-white rounded shadow p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">My To-Do List</h1>
        
        {/* Input for adding tasks */}
        <TaskInput onAddTask={addTask} />

        {/* Filter bar */}
        <FilterBar currentFilter={filter} onFilterChange={setFilter} />

        {/* Task list, filtered */}
        <TaskList
          tasks={getFilteredTasks()}
          onToggle={toggleTask}
          onDelete={deleteTask}
        />

        {/* Button to clear all tasks */}
        {tasks.length > 0 && (
          <div className="mt-4 text-center">
            <button
              onClick={clearTasks}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Clear All Tasks
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;