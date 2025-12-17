import { ListTodo } from 'lucide-react';
import { Task, Category } from '../types';
import { TaskItem } from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string, category: Category) => void;
}

export const TaskList = ({ tasks, onToggle, onDelete, onEdit }: TaskListProps) => {
  if (tasks.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-12 text-center">
        <ListTodo size={48} className="mx-auto text-gray-300 mb-4" />
        <p className="text-gray-400 text-lg">No tasks found</p>
        <p className="text-gray-300 text-sm mt-2">Add a new task to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};
