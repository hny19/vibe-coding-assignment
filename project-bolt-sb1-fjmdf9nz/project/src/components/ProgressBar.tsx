import { CheckCircle2 } from 'lucide-react';

interface ProgressBarProps {
  total: number;
  completed: number;
}

export const ProgressBar = ({ total, completed }: ProgressBarProps) => {
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <CheckCircle2 size={24} className="text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-800">Progress</h2>
        </div>
        <div className="text-sm font-medium text-gray-600">
          {completed} of {total} completed
        </div>
      </div>

      <div className="relative w-full h-3 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="mt-2 text-right">
        <span className="text-2xl font-bold text-blue-600">{percentage}%</span>
      </div>
    </div>
  );
};
