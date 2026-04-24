import { useState, useEffect } from 'react';
import { Clock, TrendingUp, Trash2, Filter } from 'lucide-react';

const DIET_LABELS = { veg: '🌿 Vegetarian', nonveg: '🍗 Non-Veg', vegan: '🌱 Vegan' };
const GOAL_LABELS = { weight_loss: '⚖️ Weight Loss', muscle_gain: '💪 Muscle Gain', maintenance: '🎯 Maintenance' };
const PHASE_COLORS = { menstrual: '#EF4444', follicular: '#10B981', ovulation: '#F59E0B', luteal: '#8B5CF6' };
const PHASE_EMOJIS = { menstrual: '🩸', follicular: '🌱', ovulation: '✨', luteal: '🌙' };

export default function History() {
  const [history, setHistory] = useState([]);
  const [filter,  setFilter]  = useState('all'); // all | day | week

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('mealHistory') || '[]');
    setHistory(data);
  }, []);

  const filtered = filter === 'all' ? history : history.filter(h => h.type === filter);

  const clearHistory = () => {
    if (confirm('Clear all meal history?')) {
      localStorage.removeItem('mealHistory');
      setHistory([]);
    }
  };

  return (
    <div className="animate-fade-in-up container" style={{ maxWidth: '840px' }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <h1>Meal History</h1>
        <div className="flex gap-2 items-center">
          <div className="flex gap-1">
            {['all', 'day', 'week'].map(f => (
              <button key={f} id={`history-filter-${f}`}
                className={`btn ${filter === f ? 'btn-primary' : 'btn-ghost'}`}
                style={{ padding: '0.45rem 0.9rem', fontSize: '0.875rem' }}
                onClick={() => setFilter(f)}>
                {f === 'all' ? 'All' : f === 'day' ? 'Day Plans' : 'Week Plans'}
              </button>
            ))}
          </div>
          {history.length > 0 && (
            <button id="history-clear" className="btn btn-ghost" style={{ padding: '0.45rem 0.75rem', color: '#EF4444', borderColor: 'rgba(239,68,68,0.3)' }}
              onClick={clearHistory} title="Clear history">
              <Trash2 size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Stats bar */}
      {history.length > 0 && (
        <div className="glass-panel mb-6" style={{ padding: '1.25rem 1rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '1rem', textAlign: 'center' }}>
          <div style={{ padding: '0.5rem' }}>
            <div style={{ fontWeight: 800, fontSize: 'clamp(1.2rem, 4vw, 1.5rem)', color: 'var(--color-primary)' }}>{history.length}</div>
            <div className="text-xs text-faint uppercase tracking-wide">Total Plans</div>
          </div>
          <div style={{ padding: '0.5rem' }}>
            <div style={{ fontWeight: 800, fontSize: 'clamp(1.2rem, 4vw, 1.5rem)', color: '#6366F1' }}>
              {Math.round(history.reduce((s, h) => s + (h.totalCalories || 0), 0) / history.length)}
            </div>
            <div className="text-xs text-faint uppercase tracking-wide">Avg. kcal/day</div>
          </div>
          <div style={{ padding: '0.5rem' }}>
            <div style={{ fontWeight: 800, fontSize: 'clamp(1.2rem, 4vw, 1.5rem)', color: '#F59E0B' }}>
              {history.filter(h => h.menstrualPhase).length}
            </div>
            <div className="text-xs text-faint uppercase tracking-wide">Cycle-Synced</div>
          </div>
        </div>
      )}

      {/* Empty state */}
      {filtered.length === 0 ? (
        <div className="glass-panel text-center" style={{ padding: '4rem 2rem' }}>
          <Clock size={48} style={{ color: 'var(--color-text-faint)', margin: '0 auto 1rem' }} />
          <h3 style={{ marginBottom: '0.5rem' }}>No history yet</h3>
          <p className="text-muted">Generate meal plans on the Dashboard to see them here.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((item, i) => {
            const phase = item.menstrualPhase;
            const phaseColor = phase ? PHASE_COLORS[phase] : null;

            return (
              <div key={i} className="history-item">
                <div style={{ flex: 1, minWidth: 0 }}>
                  {/* Date & time */}
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-faint text-xs">
                      <Clock size={11} style={{ display: 'inline', marginRight: 3 }} />
                      {new Date(item.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      {' · '}
                      {new Date(item.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    {phase && (
                      <span style={{
                        fontSize: '0.72rem', fontWeight: 600,
                        color: phaseColor,
                        background: `${phaseColor}18`,
                        border: `1px solid ${phaseColor}40`,
                        borderRadius: '9999px',
                        padding: '0.15rem 0.6rem'
                      }}>
                        {PHASE_EMOJIS[phase]} {phase.charAt(0).toUpperCase() + phase.slice(1)}
                      </span>
                    )}
                  </div>

                  {/* Meal names */}
                  {item.mealNames && (
                    <div className="text-sm" style={{ fontWeight: 500, color: 'var(--color-text)', marginBottom: '0.35rem' }}>
                      {item.mealNames.join(' · ')}
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex gap-2 flex-wrap">
                    {item.diet && <span className="badge badge-green" style={{ fontSize: '0.72rem' }}>{DIET_LABELS[item.diet] || item.diet}</span>}
                    {item.goal && <span className="badge badge-purple" style={{ fontSize: '0.72rem' }}>{GOAL_LABELS[item.goal] || item.goal}</span>}
                    {item.type && <span className="badge badge-amber" style={{ fontSize: '0.72rem' }}>{item.type === 'week' ? '📅 Week Plan' : '☀️ Day Plan'}</span>}
                  </div>
                </div>

                {/* Calories */}
                <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: '1rem' }}>
                  <div style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--color-primary)' }}>{item.totalCalories}</div>
                  <div className="text-xs text-faint">kcal/day</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
