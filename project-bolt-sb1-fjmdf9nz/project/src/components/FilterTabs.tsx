import { Search } from 'lucide-react';
import { FilterType } from '../types';

interface FilterTabsProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  counts: {
    all: number;
    active: number;
    completed: number;
  };
}

export const FilterTabs = ({
  activeFilter,
  onFilterChange,
  searchQuery,
  onSearchChange,
  counts,
}: FilterTabsProps) => {
  const filters: { type: FilterType; label: string; count: number }[] = [
    { type: 'all', label: 'All', count: counts.all },
    { type: 'active', label: 'Active', count: counts.active },
    { type: 'completed', label: 'Completed', count: counts.completed },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search
            size={20}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search tasks..."
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="flex gap-2">
          {filters.map(({ type, label, count }) => (
            <button
              key={type}
              onClick={() => onFilterChange(type)}
              className={`px-4 py-3 rounded-lg font-medium transition-all ${
                activeFilter === type
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {label}
              <span
                className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                  activeFilter === type
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {count}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
