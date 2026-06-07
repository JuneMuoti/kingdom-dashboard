import { Project } from './types';

export const SEED_PROJECTS: Project[] = [
  { id: '1', title: 'Tech & Financial Integrity', team: 'June & Partner', mountain: 'Technology', status: 'active', progress: 60, date: '2026-06-20', notes: 'Daniel model — zero compromise framework' },
  { id: '2', title: 'Kingdom Customer Service Culture', team: 'Grace & Daniel', mountain: 'Business', status: 'active', progress: 40, date: '2026-06-20', notes: '' },
  { id: '3', title: 'Ethical Leadership Playbook', team: 'Samuel & Ruth', mountain: 'Government', status: 'draft', progress: 20, date: '2026-06-20', notes: '' },
  { id: '4', title: 'Youth Empowerment Model', team: 'Esther & Paul', mountain: 'Education', status: 'stalled', progress: 30, date: '2026-06-20', notes: '' },
  { id: '5', title: 'Workplace Integrity Framework', team: 'David & Lydia', mountain: 'Business', status: 'done', progress: 100, date: '2026-06-14', notes: 'Presented — excellent feedback' },
];

export const MOUNTAINS = ['Technology', 'Business', 'Education', 'Government', 'Media', 'Arts & Entertainment', 'Family'] as const;

export const STATUS_CONFIG = {
  active:  { label: 'Active',   color: 'var(--gold-bright)', bg: 'var(--gold-dim)',  border: 'var(--gold-border)' },
  done:    { label: 'Done',     color: '#6ab0e8',            bg: 'var(--blue-dim)',  border: 'var(--blue-border)' },
  stalled: { label: 'Stalled',  color: 'var(--amber)',       bg: 'var(--amber-dim)', border: 'rgba(212,146,42,0.3)' },
  draft:   { label: 'Draft',    color: 'var(--text-secondary)', bg: 'var(--gray-dim)', border: 'var(--border)' },
};
