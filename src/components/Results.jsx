import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getDayPlan, getWeekPlan } from './RecommendationEngine';
import DayPlanCard from './DayPlanCard';
import WeekPlanView from './WeekPlanView';
import { ArrowLeft, RefreshCw } from 'lucide-react';

const DIET_LABELS  = { veg:'🌿 Vegetarian', nonveg:'🍗 Non-Vegetarian', vegan:'🌱 Vegan' };
const GOAL_LABELS  = { weight_loss:'⚖️ Weight Loss', muscle_gain:'💪 Muscle Gain', maintenance:'🎯 Maintenance' };

export default function Results() {
  const { state } = useLocation();
  const navigate  = useNavigate();
  const [plan, setPlan] = useState(null);

  const opts     = state?.opts     ?? {};
  const viewMode = state?.viewMode ?? 'day';

  useEffect(() => {
    if (!state) { navigate('/dashboard'); return; }

    // Generate plan
    const generated = viewMode === 'week'
      ? getWeekPlan(opts)
      : getDayPlan(opts);
    setPlan(generated);

    // Save to history
    const entry = {
      date: new Date().toISOString(),
      type: viewMode,
      goal: opts.goal,
      diet: opts.diet,
      menstrualPhase: opts.menstrualPhaseId,
      totalCalories: viewMode === 'day' ? generated.totalCalories
        : Math.round(generated.reduce((s,d) => s+d.totalCalories,0) / 7),
      mealNames: viewMode === 'day'
        ? [generated.breakfast?.name, generated.lunch?.name, generated.dinner?.name].filter(Boolean)
        : [`${generated.length}-day plan`]
    };
    const h = JSON.parse(localStorage.getItem('mealHistory') || '[]');
    localStorage.setItem('mealHistory', JSON.stringify([entry, ...h].slice(0, 50)));
  }, []); // eslint-disable-line

  const regenerate = () => {
    const generated = viewMode === 'week' ? getWeekPlan(opts) : getDayPlan(opts);
    setPlan(generated);
  };

  if (!plan) return (
    <div className="flex items-center justify-center" style={{ minHeight:'40vh' }}>
      <div className="flex flex-col items-center gap-4">
        <span className="spinner" style={{ width:40, height:40, borderWidth:3 }}/>
        <p className="text-muted">Crafting your personalised plan…</p>
      </div>
    </div>
  );

  return (
    <div className="animate-fade-in-up container" style={{ maxWidth:'960px' }}>

      {/* Top bar */}
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <button className="btn btn-ghost" style={{ padding:'0.6rem 1rem' }} onClick={() => navigate('/dashboard')}>
          <ArrowLeft size={18}/> Back to Dashboard
        </button>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Summary badges */}
          {opts.diet   && <span className="badge badge-green">{DIET_LABELS[opts.diet]}</span>}
          {opts.goal   && <span className="badge badge-purple">{GOAL_LABELS[opts.goal]}</span>}
          <span className="badge badge-amber">{viewMode==='week'?'📅 7-Day Plan':'☀️ Day Plan'}</span>

          <button className="btn btn-ghost" style={{ padding:'0.6rem 1rem' }} onClick={regenerate}
            title="Generate a fresh set of meals">
            <RefreshCw size={16}/> Regenerate
          </button>
        </div>
      </div>

      {/* Plan output */}
      {viewMode === 'day'  && <DayPlanCard  plan={plan} />}
      {viewMode === 'week' && <WeekPlanView plan={plan} />}

      {/* Bottom CTA */}
      <div className="flex gap-4 mt-8 flex-wrap">
        <button className="btn btn-ghost" style={{ flex:1 }} onClick={() => navigate('/dashboard')}>
          <ArrowLeft size={18}/> Adjust Preferences
        </button>
        <button className="btn btn-primary" style={{ flex:1 }} onClick={() => navigate('/history')}>
          View History
        </button>
      </div>
    </div>
  );
}
