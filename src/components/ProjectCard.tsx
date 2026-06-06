import React from 'react';
import { Project } from '../types';
import { STATUS_CONFIG } from '../data';

interface Props {
  project: Project;
  onEdit: (p: Project) => void;
  onDelete: (id: string) => void;
  onProgressClick: (p: Project) => void;
  style?: React.CSSProperties;
}

function barColor(p: number) {
  if (p >= 100) return '#7ecb5f';
  if (p >= 60) return '#2dbd8f';
  if (p >= 30) return '#e8a64a';
  return '#e05c5c';
}

function formatDate(d: string) {
  if (!d) return '—';
  const dt = new Date(d + 'T00:00:00');
  return dt.toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' });
}

export const ProjectCard: React.FC<Props> = ({ project: p, onEdit, onDelete, onProgressClick, style }) => {
  const sc = STATUS_CONFIG[p.status];
  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius)',
      padding: '1.25rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      transition: 'border-color 0.2s, background 0.2s',
      animation: 'fadeUp 0.35s ease both',
      ...style,
    }}
    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border-hover)'; (e.currentTarget as HTMLDivElement).style.background = 'var(--bg-card-hover)'; }}
    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLDivElement).style.background = 'var(--bg-card)'; }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
  <p style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 15, color: '#f0e9d6', marginBottom: 4, lineHeight: 1.3 }}>{p.title}</p>
         <p style={{ fontSize: 12, color: '#8a9bbf' }}>👥 {p.team}</p>
        </div>
        <span style={{
          fontSize: 11, fontWeight: 500, padding: '3px 10px',
          borderRadius: 'var(--radius-pill)',
          background: sc.bg, color: sc.color,
          border: `1px solid ${sc.border}`,
          whiteSpace: 'nowrap', flexShrink: 0,
        }}>{sc.label}</span>
      </div>

      {/* Progress */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          <span style={{ fontSize: 11, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Progress</span>
          <span style={{ fontSize: 11, color: '#8a9bbf', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Progress</span>
        </div>
        <div style={{ height: 5, background: 'rgba(255,255,255,0.06)', borderRadius: 10, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${p.progress}%`, background: barColor(p.progress), borderRadius: 10, transition: 'width 0.5s ease' }} />
        </div>
      </div>

      {/* Meta */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
        <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>📅 {formatDate(p.date)}</span>
        <span style={{ fontSize: 11, color: 'var(--green)', background: 'var(--green-dim)', padding: '2px 8px', borderRadius: 'var(--radius-pill)', border: '1px solid var(--green-border)' }}>
          ⛰ {p.mountain}
        </span>
      </div>

      {p.notes && (
        <p style={{ fontSize: 12, color: 'var(--text-tertiary)', fontStyle: 'italic', borderLeft: '2px solid var(--border)', paddingLeft: 8 }}>{p.notes}</p>
      )}

      {/* Actions */}
      <div style={{ display: 'flex', gap: 6, paddingTop: 8, borderTop: '1px solid var(--border)' }}>
        {[
          { label: 'Edit', icon: '✏️', action: () => onEdit(p) },
          { label: 'Progress', icon: '📈', action: () => onProgressClick(p) },
          { label: 'Remove', icon: '🗑', action: () => onDelete(p.id), danger: true },
        ].map(btn => (
          <button key={btn.label} onClick={btn.action} style={{
            flex: 1, padding: '6px 4px', fontSize: 12,
            borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)',
            background: 'transparent', color: btn.danger ? 'var(--red)' : 'var(--text-secondary)',
            cursor: 'pointer', transition: 'all 0.15s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4,
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = btn.danger ? 'var(--red-dim)' : 'rgba(255,255,255,0.04)'; (e.currentTarget as HTMLButtonElement).style.borderColor = btn.danger ? 'rgba(224,92,92,0.3)' : 'var(--border-hover)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)'; }}
          >{btn.icon} {btn.label}</button>
        ))}
      </div>
    </div>
  );
};
