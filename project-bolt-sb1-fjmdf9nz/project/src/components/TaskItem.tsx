import { useState } from 'react';
import { Check, Edit2, Trash2, X, Save } from 'lucide-react';
import { Task, Category } from '../types';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string, category: Category) => void;
}

const categoryColors: Record<Category, string> = {
  Work: 'bg-blue-100 text-blue-700 border-blue-200',
  Personal: 'bg-green-100 text-green-700 border-green-200',
  School: 'bg-purple-100 text-purple-700 border-purple-200',
};

export const TaskItem = ({ task, onToggle, onDelete, onEdit }: TaskItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editCategory, setEditCategory] = useState(task.category);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSave = () => {
    if (editTitle.trim()) {
      onEdit(task.id, editTitle.trim(), editCategory);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setEditCategory(task.category);
    setIsEditing(false);
  };

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      onDelete(task.id);
    }, 300);
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-sm border border-gray-100 p-4 transition-all duration-300 hover:shadow-md ${
        isDeleting ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
      }`}
    >
      {isEditing ? (
        <div className="space-y-3">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
          <div className="flex gap-2 mb-3">
            {(['Work', 'Personal', 'School'] as Category[]).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setEditCategory(cat)}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                  editCategory === cat
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all text-sm font-medium"
            >
              <Save size={16} />
              Save
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center gap-1 px-3 py-1.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all text-sm font-medium"
            >
              <X size={16} />
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-start gap-3">
          <button
            onClick={() => onToggle(task.id)}
            className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
              task.completed
                ? 'bg-blue-600 border-blue-600'
                : 'border-gray-300 hover:border-blue-400'
            }`}
          >
            {task.completed && <Check size={14} className="text-white" />}
          </button>

          <div className="flex-1 min-w-0">
            <p
              className={`text-gray-800 font-medium break-words transition-all ${
                task.completed ? 'line-through text-gray-400' : ''
              }`}
            >
              {task.title}
            </p>
            <span
              className={`inline-block mt-2 px-2 py-1 rounded-md text-xs font-medium border ${
                categoryColors[task.category]
              }`}
            >
              {task.category}
            </span>
          </div>

          <div className="flex gap-1 flex-shrink-0">
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
              title="Edit task"
            >
              <Edit2 size={16} />
            </button>
            <button
              onClick={handleDelete}
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
              title="Delete task"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
