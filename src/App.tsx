import React, { useState, useMemo } from 'react';
import { Project, Status } from './types';
import { SEED_PROJECTS, STATUS_CONFIG } from './data';
import { useLocalStorage } from './useLocalStorage';
import { ProjectCard } from './components/ProjectCard';
import { Modal } from './components/Modal';
import { ProgressModal } from './components/ProgressModal';

type Filter = 'all' | Status;

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

export default function App() {
  const [projects, setProjects] = useLocalStorage<Project[]>('ka-projects', SEED_PROJECTS);
  const [filter, setFilter] = useState<Filter>('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [editProject, setEditProject] = useState<Project | null>(null);
  const [progressProject, setProgressProject] = useState<Project | null>(null);
  const [progressOpen, setProgressOpen] = useState(false);

  const filtered = useMemo(() =>
    filter === 'all' ? projects : projects.filter(p => p.status === filter),
    [projects, filter]
  );

  const metrics = useMemo(() => ({
    total: projects.length,
    active: projects.filter(p => p.status === 'active').length,
    done: projects.filter(p => p.status === 'done').length,
    avg: projects.length ? Math.round(projects.reduce((a, p) => a + p.progress, 0) / projects.length) : 0,
  }), [projects]);

  function handleSave(data: Omit<Project, 'id'> & { id?: string }) {
    if (data.id) {
      setProjects(prev => prev.map(p => p.id === data.id ? { ...p, ...data } as Project : p));
    } else {
      setProjects(prev => [...prev, { ...data, id: generateId() } as Project]);
    }
    setModalOpen(false);
    setEditProject(null);
  }

  function handleDelete(id: string) {
    if (window.confirm('Remove this project?')) {
      setProjects(prev => prev.filter(p => p.id !== id));
    }
  }

  function handleProgressSave(id: string, progress: number) {
    setProjects(prev => prev.map(p => p.id === id
      ? { ...p, progress, status: progress === 100 ? 'done' : p.status }
      : p
    ));
    setProgressOpen(false);
    setProgressProject(null);
  }

  const filterOptions: { key: Filter; label: string }[] = [
    { key: 'all', label: `All (${projects.length})` },
    { key: 'active', label: 'Active' },
    { key: 'done', label: 'Done' },
    { key: 'stalled', label: 'Stalled' },
    { key: 'draft', label: 'Draft' },
  ];

  return (
   <div style={{ minHeight: '100vh', padding: '2rem 1.5rem', maxWidth: 1100, margin: '0 auto', background: '#ffffff', borderRadius: 16 }}>

      {/* Header */}
      <div style={{ marginBottom: '2.5rem', animation: 'fadeUp 0.4s ease' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <p style={{ fontSize: 11, color: 'var(--green)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 8, fontWeight: 500 }}>
              An ambassador for Christ in every organization
            </p>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2, marginBottom: 6 }}>
              Kingdom Ambassadors @MarketPlace
            </h1>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>Marketplace class · Project progress dashboard</p>
          </div>
          <button
  onClick={() => { setEditProject(null); setModalOpen(true); }}
  style={{
    padding: '10px 20px',
    fontSize: 14,
    fontWeight: 700,
    borderRadius: 'var(--radius-sm)',
    border: 'none',
    background: '#c4a050',
    color: '#0a1628',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    flexShrink: 0,
    boxShadow: '0 2px 8px rgba(196,160,80,0.4)',
    transition: 'opacity 0.15s',
  }}
  onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.opacity = '0.85'}
  onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.opacity = '1'}
>
  + Add project
</button>
        </div>
      </div>

      {/* Metrics */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
        gap: 10, marginBottom: '2rem', animation: 'fadeUp 0.45s ease',
      }}>
        {[
         { label: 'Total projects', value: metrics.total, color: 'var(--gold)' },
          { label: 'Active', value: metrics.active, color: STATUS_CONFIG.active.color },
          { label: 'Completed', value: metrics.done, color: STATUS_CONFIG.done.color },
          { label: 'Avg progress', value: `${metrics.avg}%`, color: metrics.avg >= 60 ? 'var(--green)' : 'var(--amber)' },
        ].map(m => (
          <div key={m.label} style={{
            background: 'var(--bg-card)', border: '1px solid var(--border)',
            borderRadius: 'var(--radius)', padding: '1rem 1.1rem',
          }}>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, color: m.color, marginBottom: 4 }}>{m.value}</p>
          <p style={{ fontSize: 12, color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.07em' }}>{m.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 8, marginBottom: '1.5rem', flexWrap: 'wrap', animation: 'fadeUp 0.5s ease' }}>
        {filterOptions.map(f => (
          <button key={f.key} onClick={() => setFilter(f.key)} style={{
            padding: '6px 14px', fontSize: 13, borderRadius: 'var(--radius-pill)',
            border: `1px solid ${filter === f.key ? 'var(--green-border)' : 'var(--border)'}`,
            background: filter === f.key ? 'var(--green-dim)' : 'transparent',
            color: filter === f.key ? 'var(--green)' : 'var(--text-secondary)',
            cursor: 'pointer', fontWeight: filter === f.key ? 500 : 400,
            transition: 'all 0.15s',
          }}>{f.label}</button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-tertiary)' }}>
          <p style={{ fontSize: 32, marginBottom: 12 }}>📋</p>
          <p style={{ fontSize: 14 }}>No projects in this category</p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
          gap: 12,
        }}>
          {filtered.map((p, i) => (
            <ProjectCard
              key={p.id}
              project={p}
              style={{ animationDelay: `${i * 0.05}s` }}
              onEdit={proj => { setEditProject(proj); setModalOpen(true); }}
              onDelete={handleDelete}
              onProgressClick={proj => { setProgressProject(proj); setProgressOpen(true); }}
            />
          ))}
        </div>
      )}

      {/* Footer */}
      <div style={{ marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
        <p style={{ fontSize: 12, color: 'var(--text-tertiary)', fontStyle: 'italic' }}>
          Isaiah 2:2 · The mountain of the Lord will be established as the highest
        </p>
      </div>

      <Modal
        open={modalOpen}
        project={editProject}
        onSave={handleSave}
        onClose={() => { setModalOpen(false); setEditProject(null); }}
      />
      <ProgressModal
        open={progressOpen}
        project={progressProject}
        onSave={handleProgressSave}
        onClose={() => { setProgressOpen(false); setProgressProject(null); }}
      />
    </div>
  );
}
