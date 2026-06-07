export type Status = 'active' | 'done' | 'stalled' | 'draft';

export type Mountain =
  | 'Technology'
  | 'Business'
  | 'Education'
  | 'Government'
  | 'Media'
  | 'Arts & Entertainment'
  | 'Family';

export interface Project {
  id: string;
  title: string;
  team: string;
  mountain: Mountain;
  status: Status;
  progress: number;
  date: string;
  notes?: string;
}
