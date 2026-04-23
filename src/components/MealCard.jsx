import { Info, Flame } from 'lucide-react';

export default function MealCard({ meal }) {
  if (!meal) return null;

  // Calculate percentages for macro bars
  const totalMacros = meal.protein + meal.carbs + meal.fats;
  const proteinPct = (meal.protein / totalMacros) * 100;
  const carbsPct = (meal.carbs / totalMacros) * 100;
  const fatsPct = (meal.fats / totalMacros) * 100;

  return (
    <div className="glass-panel animate-fade-in mt-8" style={{ padding: '2rem' }}>
      <div className="flex items-center justify-between mb-4">
        <h2 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '2rem' }}>{meal.icon}</span> {meal.name}
        </h2>
        <div className="badge flex items-center gap-2" style={{ fontSize: '1rem', padding: '0.5rem 1rem' }}>
          <Flame size={20} /> {meal.calories} kcal
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '1.5rem', background: 'rgba(16, 185, 129, 0.05)' }}>
        <h4 className="flex items-center gap-2" style={{ color: 'var(--color-primary)', margin: 0 }}>
          <Info size={20} /> Why this meal?
        </h4>
        <p style={{ margin: '0.5rem 0 0 0' }}>{meal.reason}</p>
      </div>

      <div>
        <h4 style={{ marginBottom: '1rem' }}>Nutritional Breakdown</h4>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>{meal.protein}g</div>
            <div className="text-light" style={{ fontSize: '0.875rem' }}>Protein</div>
            <div className="macro-bar-container"><div className="macro-bar-fill bg-protein" style={{ width: `${proteinPct}%` }}></div></div>
          </div>
          <div>
            <div style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>{meal.carbs}g</div>
            <div className="text-light" style={{ fontSize: '0.875rem' }}>Carbs</div>
            <div className="macro-bar-container"><div className="macro-bar-fill bg-carbs" style={{ width: `${carbsPct}%` }}></div></div>
          </div>
          <div>
            <div style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>{meal.fats}g</div>
            <div className="text-light" style={{ fontSize: '0.875rem' }}>Fats</div>
            <div className="macro-bar-container"><div className="macro-bar-fill bg-fats" style={{ width: `${fatsPct}%` }}></div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
