export type Category = 'Work' | 'Personal' | 'School';

export type FilterType = 'all' | 'active' | 'completed';

export interface Task {
  id: string;
  title: string;
  category: Category;
  completed: boolean;
  createdAt: number;
}
