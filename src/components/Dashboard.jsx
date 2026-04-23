import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  calculateMenstrualPhaseFromDate,
  menstrualPhases, ALLERGENS, autoDetectPhase
} from './RecommendationEngine';
import {
  Sparkles, Calendar, Sun, Clock,
  User, Leaf, AlertTriangle, Info, ArrowRight
} from 'lucide-react';

const DIET_OPTIONS = [
  { id:"veg",    label:"Vegetarian",     emoji:"🌿", color:"#10B981" },
  { id:"nonveg", label:"Non-Vegetarian", emoji:"🍗", color:"#EF4444" },
  { id:"vegan",  label:"Vegan",          emoji:"🌱", color:"#84CC16" },
];
const GOAL_OPTIONS = [
  { id:"weight_loss", label:"Weight Loss", emoji:"⚖️" },
  { id:"muscle_gain", label:"Muscle Gain", emoji:"💪" },
  { id:"maintenance", label:"Maintenance", emoji:"🎯" },
];

function PhasePill({ phase }) {
  if (!phase) return null;
  return (
    <div className="flex items-center gap-3 p-4 animate-fade-in"
      style={{ background:phase.colorLight, border:`1px solid ${phase.color}50`, borderRadius:'var(--radius-md)', marginTop:'0.75rem' }}>
      <span style={{ fontSize:'1.8rem' }}>{phase.emoji}</span>
      <div>
        <div style={{ fontWeight:700, color:phase.color }}>
          {phase.name} Phase &nbsp;·&nbsp; Day {phase.cycleDay} of your cycle
        </div>
        <p className="text-sm text-muted" style={{ margin:0 }}>{phase.description}</p>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();

  const [gender,          setGender]      = useState('prefer_not');
  const [diet,            setDiet]        = useState('veg');
  const [goal,            setGoal]        = useState('maintenance');
  const [allergies,       setAllergies]   = useState([]);
  const [lastPeriodDate,  setPeriodDate]  = useState('');
  const [calculatedPhase, setCalcPhase]   = useState(null);
  const [viewMode,        setViewMode]    = useState('day');
  const [loading,         setLoading]     = useState(false);
  const [detectedPhase,   setDetPhase]    = useState('');

  useEffect(() => {
    setDetPhase(autoDetectPhase());
    try {
      const p = JSON.parse(localStorage.getItem('userProfile') || '{}');
      if (p.gender)         setGender(p.gender);
      if (p.diet)           setDiet(p.diet);
      if (p.goal)           setGoal(p.goal);
      if (p.allergies)      setAllergies(p.allergies);
      if (p.lastPeriodDate) {
        setPeriodDate(p.lastPeriodDate);
        setCalcPhase(calculateMenstrualPhaseFromDate(p.lastPeriodDate));
      }
    } catch (_) {}
  }, []);

  const handlePeriodDateChange = (e) => {
    const val = e.target.value;
    setPeriodDate(val);
    setCalcPhase(val ? calculateMenstrualPhaseFromDate(val) : null);
  };

  const toggleAllergen = (id) =>
    setAllergies(prev => prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]);

  const handleGenerate = () => {
    setLoading(true);
    const opts = {
      goal, diet, allergies,
      lastPeriodDate,
      menstrualPhaseId: calculatedPhase?.id ?? null,
    };
    // Navigate to Results page, passing options as router state
    setTimeout(() => {
      navigate('/results', { state: { opts, viewMode } });
    }, 400);
  };

  const isFemale = gender === 'female';
  const maxDate  = new Date().toISOString().split('T')[0];

  return (
    <div className="animate-fade-in-up" style={{ maxWidth:'880px', margin:'0 auto' }}>

      {/* Header */}
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 style={{ marginBottom:'0.25rem' }}>Build Your Meal Plan</h1>
          <p className="text-muted text-sm flex items-center gap-2">
            <Clock size={14}/> Current time phase:&nbsp;
            <strong style={{ color:'var(--color-primary)' }}>{detectedPhase}</strong>
          </p>
        </div>
        <div className="flex gap-2">
          <button id="view-day" className={`btn ${viewMode==='day'?'btn-primary':'btn-ghost'}`}
            style={{ padding:'0.6rem 1.2rem' }} onClick={() => setViewMode('day')}>
            <Sun size={16}/> Today
          </button>
          <button id="view-week" className={`btn ${viewMode==='week'?'btn-primary':'btn-ghost'}`}
            style={{ padding:'0.6rem 1.2rem' }} onClick={() => setViewMode('week')}>
            <Calendar size={16}/> Full Week
          </button>
        </div>
      </div>

      {/* ── Card 1: Profile & Diet ── */}
      <div className="glass-panel p-8 mb-5">
        <h3 className="flex items-center gap-2 mb-6" style={{ borderBottom:'1px solid var(--color-border)', paddingBottom:'1rem' }}>
          <User size={18} style={{ color:'var(--color-primary)' }}/> Profile & Diet
        </h3>
        <div className="grid grid-2 gap-8">
          <div className="flex flex-col gap-5">
            {/* Gender */}
            <div>
              <label className="form-label">Gender</label>
              <div className="flex gap-2 flex-wrap">
                {[{id:'male',label:'♂ Male'},{id:'female',label:'♀ Female'},{id:'prefer_not',label:'Other'}].map(g => (
                  <button key={g.id} id={`gender-${g.id}`}
                    className={`btn btn-phase ${gender===g.id?'active':''}`}
                    onClick={() => { setGender(g.id); if(g.id!=='female'){setPeriodDate('');setCalcPhase(null);} }}>
                    {g.label}
                  </button>
                ))}
              </div>
            </div>
            {/* Diet */}
            <div>
              <label className="form-label flex items-center gap-2"><Leaf size={13}/> Dietary Preference</label>
              <div className="flex gap-2 flex-wrap">
                {DIET_OPTIONS.map(d => (
                  <button key={d.id} id={`diet-${d.id}`}
                    className={`btn btn-phase ${diet===d.id?'active':''}`}
                    style={diet===d.id?{borderColor:d.color,color:d.color,background:`${d.color}18`}:{}}
                    onClick={() => setDiet(d.id)}>
                    {d.emoji} {d.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            {/* Fitness goal */}
            <label className="form-label">Fitness Goal</label>
            <div className="flex flex-col gap-3">
              {GOAL_OPTIONS.map(g => (
                <button key={g.id} id={`goal-${g.id}`}
                  className={`btn btn-phase ${goal===g.id?'active':''}`}
                  style={{ justifyContent:'flex-start', padding:'0.75rem 1rem', textAlign:'left' }}
                  onClick={() => setGoal(g.id)}>
                  <span style={{ fontSize:'1.2rem' }}>{g.emoji}</span>
                  <span style={{ fontWeight:600 }}>{g.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Card 2: Allergies ── */}
      <div className="glass-panel p-8 mb-5">
        <h3 className="flex items-center gap-2 mb-2" style={{ borderBottom:'1px solid var(--color-border)', paddingBottom:'1rem' }}>
          <AlertTriangle size={18} style={{ color:'#F59E0B' }}/> Allergies & Intolerances
        </h3>
        <p className="text-sm text-muted mb-4">Tap to exclude. Matching ingredients will be removed from every meal slot.</p>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'0.6rem' }}>
          {ALLERGENS.map(a => (
            <button key={a.id} id={`allergy-${a.id}`}
              className="btn btn-phase"
              style={allergies.includes(a.id)?{borderColor:'#EF4444',color:'#EF4444',background:'rgba(239,68,68,0.1)',textDecoration:'line-through'}:{}}
              onClick={() => toggleAllergen(a.id)}>
              {a.emoji} {a.label}
            </button>
          ))}
        </div>
        {allergies.length > 0 && (
          <p className="text-xs text-faint mt-3">
            ⚠️ {allergies.length} item(s) excluded · <button type="button" style={{ background:'none',border:'none',color:'var(--color-primary)',cursor:'pointer',fontSize:'inherit' }} onClick={() => setAllergies([])}>Clear all</button>
          </p>
        )}
      </div>

      {/* ── Card 3: Menstrual Cycle (female only) ── */}
      {isFemale && (
        <div className="glass-panel p-8 mb-5" style={{ borderColor:'rgba(249,168,212,0.3)' }}>
          <h3 className="flex items-center gap-2 mb-2" style={{ borderBottom:'1px solid rgba(249,168,212,0.2)', paddingBottom:'1rem', color:'#F9A8D4' }}>
            🩸 Menstrual Cycle Tracker
          </h3>
          <p className="text-sm text-muted mb-5">
            Enter the first day of your last period. NutriPhase automatically calculates your current cycle phase and adjusts every meal recommendation with phase-specific nutrients.
          </p>

          <div style={{ maxWidth:'320px' }}>
            <label className="form-label" style={{ color:'#F9A8D4' }}>📅 First Day of Last Period</label>
            <input id="period-date-input" type="date" className="form-input"
              value={lastPeriodDate} max={maxDate}
              style={{ borderColor:'rgba(249,168,212,0.5)' }}
              onChange={handlePeriodDateChange}/>
          </div>

          {!lastPeriodDate && (
            <div className="flex items-center gap-2 mt-3 text-sm text-faint">
              <Info size={14}/> Enter a date to auto-detect your phase
            </div>
          )}

          <PhasePill phase={calculatedPhase}/>

          {/* Phase reference mini-cards */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'0.5rem', marginTop:'1rem' }}>
            {menstrualPhases.map(phase => (
              <div key={phase.id} style={{
                background: calculatedPhase?.id===phase.id ? phase.colorLight : 'rgba(255,255,255,0.03)',
                border:`1px solid ${calculatedPhase?.id===phase.id ? phase.color+'60' : 'var(--color-border)'}`,
                borderRadius:'var(--radius-sm)', padding:'0.6rem 0.75rem',
                opacity: calculatedPhase && calculatedPhase.id!==phase.id ? 0.45 : 1,
                transition:'all 0.2s'
              }}>
                <div style={{ fontWeight:700, fontSize:'0.8rem', color:phase.color }}>{phase.emoji} {phase.name}</div>
                <div className="text-xs text-faint">{phase.days}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Generate CTA ── */}
      <button id="generate-plan" className="btn btn-primary w-full"
        style={{ padding:'1.1rem', fontSize:'1.1rem', borderRadius:'var(--radius-lg)' }}
        onClick={handleGenerate} disabled={loading}>
        {loading
          ? <><span className="spinner"/> Preparing your plan...</>
          : <><Sparkles size={22}/> Generate {viewMode==='week'?'7-Day':'Full Day'} Meal Plan <ArrowRight size={20}/></>
        }
      </button>
    </div>
  );
}
