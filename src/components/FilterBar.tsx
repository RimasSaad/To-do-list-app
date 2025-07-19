// FilterBar.tsx
// This component provides a filter bar to filter tasks by their completion status.

import type { Filter } from '../types/task';

// Props for the FilterBar component
type FilterBarProps = {
  currentFilter: Filter;    // currently selected filter
  // function to update filter
  onFilterChange: (filter: Filter) => void; 
};

// List of available filters
const filters: Filter[] = ['All', 'Completed', 'Incomplete'];

// FilterBar renders three buttons: All, Completed, Incomplete
export default function FilterBar({ currentFilter, onFilterChange }: FilterBarProps) {
  return (
    <div className="flex justify-center gap-2 mt-4">
      {/* Loop through each filter and render a button */}
      {filters.map((filter) => (
        <button
          key={filter}
          type="button"
          onClick={() => onFilterChange(filter)} // when clicked, notify parent
          className={`px-4 py-1 rounded border text-sm font-medium transition ${
            currentFilter === filter
              ? 'bg-blue-500 text-white border-blue-500'    // active filter 
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100' // inactive filter
          }`}
        >
          {/* Capitalize the first letter of the filter name */}
          {filter}
        </button>
      ))}
    </div>
  );
}
