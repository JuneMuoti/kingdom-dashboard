import React, { useState, useEffect } from 'react';
import { Project } from '../types';

interface Props {
  open: boolean;
  project?: Project | null;
  onSave: (id: string, progress: number) => void;
  onClose: () => void;
}

function barColor(p: number) {
  if (p >= 100) return '#7ecb5f';
  if (p >= 60) return '#2dbd8f';
  if (p >= 30) return '#e8a64a';
  return '#e05c5c';
}

export const ProgressModal: React.FC<Props> = ({ open, project, onSave, onClose }) => {
  const [progress, setProgress] = useState(0);
  useEffect(() => { if (project) setProgress(project.progress); }, [project, open]);
  if (!open || !project) return null;

  return (
    <div onClick={e => { if (e.target === e.currentTarget) onClose(); }} style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1000, padding: '1rem', animation: 'fadeIn 0.15s ease',
    }}>
      <div style={{
        background: 'var(--bg-card)', border: '1px solid var(--border-hover)',
        borderRadius: 'var(--radius)', padding: '1.75rem', width: '100%', maxWidth: 380,
        animation: 'scaleIn 0.2s ease',
      }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 600, marginBottom: 6 }}>Update progress</h2>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>{project.title}</p>

        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 48, fontWeight: 700, color: barColor(progress) }}>{progress}%</span>
        </div>

        <div style={{ height: 8, background: 'rgba(255,255,255,0.06)', borderRadius: 10, overflow: 'hidden', marginBottom: '1rem' }}>
          <div style={{ height: '100%', width: `${progress}%`, background: barColor(progress), borderRadius: 10, transition: 'width 0.2s' }} />
        </div>

        <input type="range" min={0} max={100} step={5} value={progress}
          onChange={e => setProgress(Number(e.target.value))}
          style={{ width: '100%', accentColor: barColor(progress), marginBottom: '1.5rem' }} />

        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={onClose} style={{
            flex: 1, padding: 10, fontSize: 14, borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border)', background: 'transparent',
            color: 'var(--text-secondary)', cursor: 'pointer',
          }}>Cancel</button>
          <button onClick={() => onSave(project.id, progress)} style={{
            flex: 2, padding: 10, fontSize: 14, fontWeight: 500,
            borderRadius: 'var(--radius-sm)', border: 'none',
            background: barColor(progress), color: '#0d0d0d', cursor: 'pointer',
          }}>Save progress</button>
        </div>
      </div>
    </div>
  );
};
