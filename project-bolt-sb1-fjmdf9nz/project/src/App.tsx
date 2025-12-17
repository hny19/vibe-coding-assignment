import { useState, useEffect, useMemo } from 'react';
import { ListChecks } from 'lucide-react';
import { Task, Category, FilterType } from './types';
import { loadTasks, saveTasks } from './utils/storage';
import { AddTaskForm } from './components/AddTaskForm';
import { TaskList } from './components/TaskList';
import { ProgressBar } from './components/ProgressBar';
import { FilterTabs } from './components/FilterTabs';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadedTasks = loadTasks();
    setTasks(loadedTasks);
  }, []);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const addTask = (title: string, category: Category) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      category,
      completed: false,
      createdAt: Date.now(),
    };
    setTasks([newTask, ...tasks]);
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const editTask = (id: string, title: string, category: Category) => {
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, title, category } : task
    ));
  };

  const filteredTasks = useMemo(() => {
    let filtered = tasks;

    if (activeFilter === 'active') {
      filtered = filtered.filter((task) => !task.completed);
    } else if (activeFilter === 'completed') {
      filtered = filtered.filter((task) => task.completed);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((task) =>
        task.title.toLowerCase().includes(query) ||
        task.category.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [tasks, activeFilter, searchQuery]);

  const counts = useMemo(() => ({
    all: tasks.length,
    active: tasks.filter((task) => !task.completed).length,
    completed: tasks.filter((task) => task.completed).length,
  }), [tasks]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <ListChecks size={40} className="text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-800">Smart Todo List</h1>
          </div>
          <p className="text-gray-600">Organize your tasks efficiently and stay productive</p>
        </div>

        <ProgressBar total={tasks.length} completed={counts.completed} />

        <AddTaskForm onAdd={addTask} />

        <FilterTabs
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          counts={counts}
        />

        <TaskList
          tasks={filteredTasks}
          onToggle={toggleTask}
          onDelete={deleteTask}
          onEdit={editTask}
        />
      </div>
    </div>
  );
}

export default App;
