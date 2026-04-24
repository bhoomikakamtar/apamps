import { useState, useEffect } from 'react';
import { Save, User, Leaf, AlertTriangle, RotateCcw, Info } from 'lucide-react';
import { ALLERGENS, calculateMenstrualPhaseFromDate, menstrualPhases } from './RecommendationEngine';

export default function Settings() {
  const [profile, setProfile] = useState({
    name: '', age: '', gender: 'prefer_not',
    diet: 'veg', goal: 'maintenance',
    allergies: [], lastPeriodDate: '',
  });
  const [calculatedPhase, setCalcPhase] = useState(null);
  const [saved, setSaved] = useState(false);
  const [notifEnabled, setNotifEnabled] = useState(localStorage.getItem('notificationsEnabled') === 'true');
  const [notifPermission, setNotifPermission] = useState(typeof Notification !== 'undefined' ? Notification.permission : 'default');

  useEffect(() => {
    try {
      const p = JSON.parse(localStorage.getItem('userProfile') || '{}');
      setProfile(prev => ({ ...prev, ...p }));
      if (p.lastPeriodDate) setCalcPhase(calculateMenstrualPhaseFromDate(p.lastPeriodDate));
    } catch (_) {}
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
    if (name === 'lastPeriodDate') setCalcPhase(value ? calculateMenstrualPhaseFromDate(value) : null);
    setSaved(false);
  };

  const set = (field, val) => { setProfile(p => ({ ...p, [field]: val })); setSaved(false); };

  const toggleAllergen = (id) => {
    setProfile(prev => ({
      ...prev,
      allergies: prev.allergies.includes(id)
        ? prev.allergies.filter(a => a !== id)
        : [...prev.allergies, id]
    }));
    setSaved(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem('userProfile', JSON.stringify(profile));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleReset = () => {
    if (confirm('Clear all saved preferences and history?')) {
      localStorage.clear();
      setProfile({ name: '', age: '', gender: 'prefer_not', diet: 'veg', goal: 'maintenance', allergies: [], lastPeriodDate: '' });
      setCalcPhase(null);
    }
  };

  const maxDate = new Date().toISOString().split('T')[0];

  return (
    <div className="animate-fade-in-up container" style={{ maxWidth: '800px' }}>
      <h1 className="mb-8">Settings</h1>

      <form onSubmit={handleSave}>

        {/* ── Profile ── */}
        <div className="glass-panel p-8 mb-6">
          <h3 className="flex items-center gap-2 mb-6" style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem' }}>
            <User size={20} style={{ color: 'var(--color-primary)' }} /> Profile
          </h3>

          <div className="grid grid-2 gap-4 mb-4">
            <div>
              <label className="form-label">Name</label>
              <input id="s-name" type="text" className="form-input" name="name"
                value={profile.name} onChange={handleChange} placeholder="Your name" />
            </div>
            <div>
              <label className="form-label">Age</label>
              <input id="s-age" type="number" className="form-input" name="age"
                value={profile.age} onChange={handleChange} placeholder="Years" min="10" max="100" />
            </div>
          </div>

          <div>
            <label className="form-label">Gender</label>
            <div className="flex gap-2 flex-wrap">
              {[
                { id: 'male',       label: '♂ Male' },
                { id: 'female',     label: '♀ Female' },
                { id: 'prefer_not', label: 'Other / Prefer not to say' },
              ].map(g => (
                <button key={g.id} type="button" id={`s-gender-${g.id}`}
                  className={`btn btn-phase ${profile.gender === g.id ? 'active' : ''}`}
                  onClick={() => set('gender', g.id)}>{g.label}</button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Diet & Goal ── */}
        <div className="glass-panel p-8 mb-6">
          <h3 className="flex items-center gap-2 mb-6" style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem' }}>
            <Leaf size={20} style={{ color: 'var(--color-primary)' }} /> Diet & Goal
          </h3>

          <div className="mb-5">
            <label className="form-label">Dietary Preference</label>
            <div className="flex gap-2 flex-wrap">
              {[
                { id: 'veg',    label: '🌿 Vegetarian', color: '#10B981' },
                { id: 'nonveg', label: '🍗 Non-Vegetarian', color: '#EF4444' },
                { id: 'vegan',  label: '🌱 Vegan',      color: '#84CC16' },
              ].map(d => (
                <button key={d.id} type="button" id={`s-diet-${d.id}`}
                  className={`btn btn-phase ${profile.diet === d.id ? 'active' : ''}`}
                  style={profile.diet === d.id ? { borderColor: d.color, color: d.color, background: `${d.color}18` } : {}}
                  onClick={() => set('diet', d.id)}>{d.label}</button>
              ))}
            </div>
          </div>

          <div>
            <label className="form-label">Default Fitness Goal</label>
            <div className="flex gap-2 flex-wrap">
              {[
                { id: 'weight_loss', label: '⚖️ Weight Loss' },
                { id: 'muscle_gain', label: '💪 Muscle Gain' },
                { id: 'maintenance', label: '🎯 Maintenance' },
              ].map(g => (
                <button key={g.id} type="button" id={`s-goal-${g.id}`}
                  className={`btn btn-phase ${profile.goal === g.id ? 'active' : ''}`}
                  onClick={() => set('goal', g.id)}>{g.label}</button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Allergies ── */}
        <div className="glass-panel p-6 mb-6">
          <h3 className="flex items-center gap-2 mb-2" style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem' }}>
            <AlertTriangle size={20} style={{ color: '#F59E0B' }} /> Allergies & Intolerances
          </h3>
          <p className="text-sm text-muted mb-4">
            Meals containing these ingredients will be <strong>automatically excluded</strong> from your plans.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '0.6rem' }}>
            {ALLERGENS.map(a => (
              <button key={a.id} type="button" id={`s-allergy-${a.id}`}
                className="btn btn-phase"
                style={
                  profile.allergies.includes(a.id)
                    ? { borderColor: '#EF4444', color: '#EF4444', background: 'rgba(239,68,68,0.1)', textDecoration: 'line-through', padding: '0.6rem', fontSize: '0.85rem' }
                    : { padding: '0.6rem', fontSize: '0.85rem' }
                }
                onClick={() => toggleAllergen(a.id)}>
                {a.emoji} {a.label}
                {profile.allergies.includes(a.id) && <span style={{ textDecoration: 'none', fontSize: '0.7rem' }}> ✕</span>}
              </button>
            ))}
          </div>
        </div>

        {/* ── Menstrual Cycle (female only) ── */}
        {profile.gender === 'female' && (
          <div className="glass-panel p-6 mb-6" style={{ borderColor: 'rgba(249,168,212,0.3)', background: 'rgba(249,168,212,0.03)' }}>
            <h3 className="flex items-center gap-2 mb-2" style={{ borderBottom: '1px solid rgba(249,168,212,0.2)', paddingBottom: '1rem', color: '#F9A8D4' }}>
              🩸 Menstrual Cycle
            </h3>
            <p className="text-sm text-muted mb-4">
              Enter the first day of your <strong>last period</strong>. NutriPhase will calculate your current cycle phase and automatically adjust your full-day and weekly meal plans with phase-specific nutrients.
            </p>

            <div className="mb-4">
              <label className="form-label" style={{ color: '#F9A8D4' }}>📅 First Day of Last Period</label>
              <input id="s-period-date" type="date" className="form-input" name="lastPeriodDate"
                value={profile.lastPeriodDate} max={maxDate}
                style={{ borderColor: 'rgba(249,168,212,0.5)' }}
                onChange={handleChange} />
            </div>

            {/* Live result */}
            {calculatedPhase && (
              <div style={{
                background: calculatedPhase.colorLight,
                border: `1px solid ${calculatedPhase.color}50`,
                borderRadius: 'var(--radius-md)',
                padding: '1rem 1.25rem',
                marginBottom: '1rem'
              }}>
                <div className="flex items-center gap-3">
                  <span style={{ fontSize: '1.8rem' }}>{calculatedPhase.emoji}</span>
                  <div>
                    <div style={{ fontWeight: 700, color: calculatedPhase.color }}>
                      {calculatedPhase.name} Phase · Day {calculatedPhase.cycleDay}
                    </div>
                    <div className="text-sm text-muted">{calculatedPhase.description}</div>
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap mt-3">
                  <span className="text-xs text-faint" style={{ alignSelf: 'center' }}>Key nutrients:</span>
                  {calculatedPhase.nutrients.map(n => (
                    <span key={n} className="badge" style={{
                      background: `${calculatedPhase.color}20`,
                      color: calculatedPhase.color,
                      border: `1px solid ${calculatedPhase.color}40`,
                      fontSize: '0.72rem'
                    }}>{n}</span>
                  ))}
                </div>
              </div>
            )}

            {/* All 4 phases mini-reference */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.5rem' }}>
              {menstrualPhases.map(phase => (
                <div key={phase.id} style={{
                  background: calculatedPhase?.id === phase.id ? phase.colorLight : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${calculatedPhase?.id === phase.id ? phase.color + '60' : 'var(--color-border)'}`,
                  borderRadius: 'var(--radius-sm)',
                  padding: '0.75rem',
                  opacity: calculatedPhase && calculatedPhase.id !== phase.id ? 0.45 : 1,
                  transition: 'all 0.2s',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.2rem'
                }}>
                  <div style={{ fontWeight: 700, fontSize: '0.85rem', color: phase.color }}>{phase.emoji} {phase.name}</div>
                  <div className="text-xs text-faint">{phase.days}</div>
                </div>
              ))}
            </div>

            <div className="flex items-start gap-2 mt-4" style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-sm)', padding: '0.75rem' }}>
              <Info size={14} style={{ color: 'var(--color-text-faint)', flexShrink: 0, marginTop: '2px' }} />
              <p className="text-xs text-faint" style={{ margin: 0 }}>
                Cycle calculations use a standard 28-day cycle. If your cycle length differs, the phase shown is an approximation. Always consult a healthcare professional for medical advice.
              </p>
            </div>
          </div>
        )}

        {/* ── Notifications ── */}
        <div className="glass-panel p-6 mb-6">
          <h3 className="flex items-center gap-2 mb-2" style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem' }}>
            <Activity size={20} style={{ color: 'var(--color-primary)' }} /> Notifications
          </h3>
          <p className="text-sm text-muted mb-6">
            Get reminded of your perfectly timed meals throughout the day.
          </p>

          <div className="flex items-center justify-between p-4 bg-surface rounded-lg border border-border" style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-md)', padding: '1rem', border: '1px solid var(--color-border)' }}>
            <div>
              <div style={{ fontWeight: 600 }}>Daily Meal Reminders</div>
              <div className="text-xs text-faint">Morning, Afternoon, Snacks & Dinner</div>
            </div>
            <button
              type="button"
              className={`btn ${notifEnabled ? 'btn-primary' : 'btn-ghost'}`}
              style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}
              onClick={() => {
                const newState = !notifEnabled;
                setNotifEnabled(newState);
                localStorage.setItem('notificationsEnabled', newState);
                
                if (newState && Notification.permission === 'default') {
                  Notification.requestPermission().then(setNotifPermission);
                }
              }}
            >
              {notifEnabled ? 'Enabled' : 'Disabled'}
            </button>
          </div>

          <div className="flex gap-3 mt-4">
            <button
              type="button"
              className="btn btn-ghost"
              style={{ flex: 1, fontSize: '0.85rem', padding: '0.6rem' }}
              onClick={() => {
                if (Notification.permission !== 'granted') {
                  Notification.requestPermission().then(setNotifPermission);
                } else {
                  new Notification("NutriPhase Notifications Active!", {
                    body: "You will now receive meal reminders at scheduled times.",
                    icon: "/favicon.svg"
                  });
                }
              }}
            >
              Test Notification
            </button>
            {notifPermission === 'denied' && (
              <p className="text-xs text-faint mt-2" style={{ color: '#EF4444' }}>
                Notifications are blocked by your browser. Please enable them in site settings.
              </p>
            )}
          </div>
        </div>

        {/* ── Actions ── */}
        <div className="flex gap-4">
          <button id="s-save" type="submit" className="btn btn-primary" style={{ flex: 1, padding: '1rem', fontSize: '1rem' }}>
            <Save size={18} /> Save Settings
          </button>
          <button id="s-reset" type="button" className="btn btn-ghost" onClick={handleReset}>
            <RotateCcw size={18} /> Reset All
          </button>
        </div>

        {saved && (
          <div className="text-center mt-4" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
            ✓ Settings saved — Dashboard will use these defaults.
          </div>
        )}
      </form>
    </div>
  );
}
