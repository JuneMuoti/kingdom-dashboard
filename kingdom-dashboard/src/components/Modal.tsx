import React, { useState, useEffect } from 'react';
import { Project, Status, Mountain } from '../types';
import { MOUNTAINS } from '../data';

interface Props {
  open: boolean;
  project?: Project | null;
  onSave: (p: Omit<Project, 'id'> & { id?: string }) => void;
  onClose: () => void;
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '9px 12px', fontSize: 14,
  background: 'var(--bg-input)', border: '1px solid var(--border)',
  borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)',
  outline: 'none', transition: 'border-color 0.15s',
};
const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: 11, color: 'var(--text-secondary)',
  textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6,
};

export const Modal: React.FC<Props> = ({ open, project, onSave, onClose }) => {
  const [title, setTitle] = useState('');
  const [team, setTeam] = useState('');
  const [mountain, setMountain] = useState<Mountain>('Technology');
  const [status, setStatus] = useState<Status>('active');
  const [progress, setProgress] = useState(0);
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (project) {
      setTitle(project.title); setTeam(project.team);
      setMountain(project.mountain); setStatus(project.status);
      setProgress(project.progress); setDate(project.date);
      setNotes(project.notes || '');
    } else {
      setTitle(''); setTeam(''); setMountain('Technology');
      setStatus('active'); setProgress(50); setDate(''); setNotes('');
    }
  }, [project, open]);

  if (!open) return null;

  const handleSave = () => {
    if (!title.trim()) return;
    onSave({ id: project?.id, title: title.trim(), team: team.trim() || 'Unassigned', mountain, status, progress, date, notes });
  };

  return (
    <div onClick={e => { if (e.target === e.currentTarget) onClose(); }} style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1000, padding: '1rem', animation: 'fadeIn 0.15s ease',
    }}>
      <div style={{
        background: 'var(--bg-card)', border: '1px solid var(--border-hover)',
        borderRadius: 'var(--radius)', padding: '1.75rem', width: '100%', maxWidth: 460,
        animation: 'scaleIn 0.2s ease',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 600 }}>
            {project ? 'Edit project' : 'Add project'}
          </h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: 20, lineHeight: 1 }}>×</button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div><label style={labelStyle}>Project title *</label>
            <input style={inputStyle} value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Tech & Financial Integrity"
              onFocus={e => (e.target as HTMLInputElement).style.borderColor = 'var(--gold)'}
              onBlur={e => (e.target as HTMLInputElement).style.borderColor = 'var(--border)'} />
          </div>
          <div><label style={labelStyle}>Group / pair names</label>
            <input style={inputStyle} value={team} onChange={e => setTeam(e.target.value)} placeholder="e.g. June & Mary"
              onFocus={e => (e.target as HTMLInputElement).style.borderColor = 'var(--gold)'}
              onBlur={e => (e.target as HTMLInputElement).style.borderColor = 'var(--border)'} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div><label style={labelStyle}>Mountain</label>
              <select style={inputStyle} value={mountain} onChange={e => setMountain(e.target.value as Mountain)}>
                {MOUNTAINS.map(m => <option key={m}>{m}</option>)}
              </select>
            </div>
            <div><label style={labelStyle}>Status</label>
              <select style={inputStyle} value={status} onChange={e => setStatus(e.target.value as Status)}>
                <option value="active">Active</option>
                <option value="draft">Draft</option>
                <option value="stalled">Stalled</option>
                <option value="done">Done</option>
              </select>
            </div>
          </div>
          <div>
            <label style={labelStyle}>Progress — {progress}%</label>
            <input type="range" min={0} max={100} step={5} value={progress}
              onChange={e => setProgress(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--gold)' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-tertiary)', marginTop: 4 }}>
              <span>0%</span><span>50%</span><span>100%</span>
            </div>
          </div>
          <div><label style={labelStyle}>Presentation date</label>
            <input type="date" style={inputStyle} value={date} onChange={e => setDate(e.target.value)}
              onFocus={e => (e.target as HTMLInputElement).style.borderColor = 'var(--gold)'}
              onBlur={e => (e.target as HTMLInputElement).style.borderColor = 'var(--border)'} />
          </div>
          <div><label style={labelStyle}>Notes (optional)</label>
            <textarea style={{ ...inputStyle, resize: 'vertical', minHeight: 70 }} value={notes} onChange={e => setNotes(e.target.value)} placeholder="Key insight, biblical principle, status note..."
              onFocus={e => (e.target as HTMLTextAreaElement).style.borderColor = 'var(--gold)'}
              onBlur={e => (e.target as HTMLTextAreaElement).style.borderColor = 'var(--border)'} />
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10, marginTop: '1.5rem' }}>
          <button onClick={onClose} style={{
            flex: 1, padding: '10px', fontSize: 14, borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border)', background: 'transparent',
            color: 'var(--text-secondary)', cursor: 'pointer',
          }}>Cancel</button>
          <button onClick={handleSave} disabled={!title.trim()} style={{
            flex: 2, padding: '10px', fontSize: 14, fontWeight: 500,
            borderRadius: 'var(--radius-sm)', border: 'none',
            background: 'var(--gold)', color: 'var(--navy)', cursor: 'pointer',
            opacity: title.trim() ? 1 : 0.5,
          }}>Save project</button>
        </div>
      </div>
    </div>
  );
};
