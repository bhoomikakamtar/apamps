import { Leaf, Brain, Activity, ShieldCheck, Globe } from 'lucide-react';
import { menstrualPhases } from './RecommendationEngine';

export default function About() {
  return (
    <div className="animate-fade-in-up container" style={{ maxWidth: '900px' }}>
      <h1 className="mb-8">About NutriPhase</h1>

      {/* ── What is it ── */}
      <div className="glass-panel p-8 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div style={{ width: 52, height: 52, borderRadius: 'var(--radius-md)', background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)', flexShrink: 0 }}>
            <Leaf size={28} />
          </div>
          <h2 style={{ margin: 0 }}>What is NutriPhase?</h2>
        </div>
        <p style={{ fontSize: '1.05rem', lineHeight: 1.9 }}>
          NutriPhase is a <strong style={{ color: 'var(--color-text)' }}>Phase-Aware Meal Recommendation System</strong> — a health and nutrition assistant that goes beyond generic diet advice. It analyses your <em>time of day</em>, <em>menstrual cycle phase</em>, <em>dietary preference</em>, <em>fitness goal</em>, and <em>food allergies</em> to generate personalised full-day and 7-day meal plans.
        </p>
      </div>

      {/* ── Core Modules ── */}
      <div className="glass-panel p-6 mb-6">
        <h3 className="mb-6 flex items-center gap-2"><Brain size={20} style={{ color: '#6366F1' }} /> Core Modules</h3>
        <div className="grid grid-2 gap-4">
          {[
            { color: '#10B981', icon: <Activity size={18} />, title: 'Recommendation Engine', desc: 'Rule-based system mapping phase, goal, diet type, and allergens to a curated meal database of 35+ meals.' },
            { color: '#EC4899', icon: '🩸', title: 'Menstrual Cycle Tracker', desc: 'Enter last period date → NutriPhase computes cycle day → selects the correct phase (Menstrual, Follicular, Ovulation, Luteal) and adjusts nutrients accordingly.' },
            { color: '#6366F1', icon: '🌿', title: 'Diet & Allergy Filter', desc: 'Supports Vegetarian, Non-Vegetarian, and Vegan diets. 6 common allergens are filtered out automatically from every plan.' },
            { color: '#F59E0B', icon: '📅', title: 'Full-Day & 7-Day Plans', desc: 'Generates Breakfast, Mid-Morning, Lunch, Evening Snack, and Dinner — either for today or for the entire upcoming week.' },
          ].map((m, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '1.25rem' }}>
              <div style={{ fontSize: typeof m.icon === 'string' ? '1.4rem' : undefined, color: m.color, marginBottom: '0.5rem' }}>
                {m.icon}
              </div>
              <div style={{ fontWeight: 700, marginBottom: '0.35rem' }}>{m.title}</div>
              <p className="text-sm text-muted" style={{ margin: 0, lineHeight: 1.6 }}>{m.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Menstrual Phases ── */}
      <div className="glass-panel p-6 mb-6">
        <h3 className="mb-2">🩸 The 4 Menstrual Phases</h3>
        <p className="text-muted text-sm mb-6">Each phase has different hormonal and nutritional needs. NutriPhase calculates your phase automatically from your last period date.</p>
        <div className="grid grid-2 gap-4">
          {menstrualPhases.map(phase => (
            <div key={phase.id} style={{
              background: phase.colorLight,
              border: `1px solid ${phase.color}40`,
              borderRadius: 'var(--radius-lg)',
              padding: '1.25rem'
            }}>
              <div style={{ fontWeight: 700, color: phase.color, marginBottom: '0.25rem' }}>
                {phase.emoji} {phase.name} · {phase.days}
              </div>
              <p className="text-sm text-muted" style={{ margin: '0 0 0.75rem' }}>{phase.description}</p>
              <div className="flex gap-1 flex-wrap">
                {phase.nutrients.map(n => (
                  <span key={n} style={{
                    fontSize: '0.7rem', fontWeight: 600, padding: '0.15rem 0.6rem',
                    borderRadius: '9999px',
                    background: `${phase.color}20`, color: phase.color,
                    border: `1px solid ${phase.color}40`
                  }}>{n}</span>
                ))}
              </div>
              <div className="mt-2">
                <span className="text-xs text-faint">Boost: </span>
                <span className="text-xs text-muted">{phase.boostFoods.join(', ')}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Tech Stack ── */}
      <div className="glass-panel p-6 mb-6">
        <h3 className="mb-4 flex items-center gap-2"><ShieldCheck size={20} style={{ color: 'var(--color-primary)' }} /> Tech Stack</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.75rem' }}>
          {[
            { label: 'React.js',           sub: 'UI Framework',         color: '#61DAFB' },
            { label: 'Vite',               sub: 'Build Tool',           color: '#646CFF' },
            { label: 'Vanilla CSS',        sub: 'Styling',              color: '#10B981' },
            { label: 'React Router',       sub: 'Navigation',           color: '#F59E0B' },
            { label: 'Supabase',           sub: 'Backend / Database',   color: '#3ECF8E' },
            { label: 'localStorage',       sub: 'Offline Fallback',     color: '#94A3B8' },
          ].map((t, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '1rem', textAlign: 'center' }}>
              <div style={{ fontWeight: 700, color: t.color, fontSize: '0.95rem', marginBottom: '0.2rem' }}>{t.label}</div>
              <div className="text-xs text-faint" style={{ fontSize: '0.65rem' }}>{t.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── SDG ── */}
      <div className="glass-panel p-6" style={{ borderColor: '#4C9F3840' }}>
        <h3 className="mb-4 flex items-center gap-2"><Globe size={20} style={{ color: '#4C9F38' }} /> UN Sustainable Development Goals</h3>
        <div style={{ background: 'linear-gradient(135deg, #3a7d32, #4C9F38)', borderRadius: 'var(--radius-lg)', padding: 'clamp(1rem, 5vw, 2rem)', display: 'flex', gap: '1.5rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div style={{ fontSize: '3rem', fontWeight: 900, lineHeight: 1, color: 'white', flexShrink: 0 }}>3</div>
          <div style={{ flex: 1, minWidth: '240px' }}>
            <div style={{ fontWeight: 700, color: 'white', fontSize: '1.1rem', marginBottom: '0.5rem' }}>Good Health and Well-being</div>
            <p style={{ margin: 0, color: 'rgba(255,255,255,0.85)', fontSize: '0.95rem', lineHeight: 1.7 }}>
              NutriPhase promotes healthy, informed eating habits for people of all ages by providing accessible, personalised nutrition guidance — supporting SDG Goal 3: ensuring healthy lives and well-being.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
