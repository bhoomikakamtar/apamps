import { Flame, Info, TrendingUp, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

const SLOT_LABELS = {
  breakfast:     { label: "Breakfast",       emoji: "🌅", time: "7:00 – 9:00 AM" },
  mid_morning:   { label: "Mid-Morning",     emoji: "☕", time: "10:30 – 11:00 AM" },
  lunch:         { label: "Lunch",           emoji: "🌞", time: "1:00 – 2:00 PM" },
  evening_snack: { label: "Evening Snack",   emoji: "🌆", time: "5:00 – 6:00 PM" },
  dinner:        { label: "Dinner",          emoji: "🌙", time: "8:00 – 9:00 PM" },
};

function MacroBar({ value, max, className }) {
  return (
    <div className="macro-bar-container" style={{ flex: 1 }}>
      <div className={`macro-bar-fill ${className}`} style={{ width: `${Math.min((value / max) * 100, 100)}%` }} />
    </div>
  );
}

function MealSlot({ slotKey, meal }) {
  const [open, setOpen] = useState(false);
  const meta = SLOT_LABELS[slotKey];
  const total = meal.protein + meal.carbs + meal.fats || 1;

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        transition: "border-color 0.2s",
      }}
      onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(16,185,129,0.4)"}
      onMouseLeave={e => e.currentTarget.style.borderColor = "var(--color-border)"}
    >
      {/* Slot header — always visible */}
      <div
        className="flex items-center justify-between"
        style={{ padding: "1rem 1.25rem", cursor: "pointer" }}
        onClick={() => setOpen(o => !o)}
      >
        <div className="flex items-center gap-3">
          <span style={{ fontSize: "1.4rem" }}>{meal.icon}</span>
          <div>
            <div className="flex items-center gap-2">
              <span style={{ fontSize: "0.72rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--color-text-faint)" }}>
                {meta.emoji} {meta.label}
              </span>
              <span className="text-faint text-xs">· {meta.time}</span>
            </div>
            <div style={{ fontWeight: 600, fontSize: "0.95rem", color: "var(--color-text)", lineHeight: 1.3 }}>{meal.name}</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="badge badge-green" style={{ whiteSpace: "nowrap" }}>
            <Flame size={12} /> {meal.calories} kcal
          </span>
          {open ? <ChevronUp size={16} style={{ color: "var(--color-text-faint)" }} /> : <ChevronDown size={16} style={{ color: "var(--color-text-faint)" }} />}
        </div>
      </div>

      {/* Expanded details */}
      {open && (
        <div style={{ padding: "0 1.25rem 1.25rem", borderTop: "1px solid var(--color-border)" }}>
          {/* Reason */}
          <div className="reason-box mt-4">
            <p className="text-sm" style={{ margin: 0, color: "var(--color-text-muted)" }}>
              <Info size={13} style={{ display: "inline", marginRight: 6, verticalAlign: "middle" }} />
              {meal.reason}
            </p>
          </div>
          {/* Macros */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(80px, 1fr))", gap: "0.75rem", marginTop: "1rem" }}>
            {[
              { label: "Protein", value: meal.protein, unit: "g", color: "#EF4444", bar: "bg-protein" },
              { label: "Carbs",   value: meal.carbs,   unit: "g", color: "#F59E0B", bar: "bg-carbs" },
              { label: "Fats",    value: meal.fats,    unit: "g", color: "#3B82F6", bar: "bg-fats" },
            ].map(m => (
              <div key={m.label} style={{ textAlign: "center" }}>
                <div style={{ fontWeight: 700, color: m.color, fontSize: '0.9rem' }}>{m.value}{m.unit}</div>
                <div className="text-xs text-faint uppercase tracking-wide" style={{ fontSize: '0.65rem' }}>{m.label}</div>
                <MacroBar value={m.value} max={total} className={m.bar} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function DayPlanCard({ plan }) {
  const slots = ["breakfast", "mid_morning", "lunch", "evening_snack", "dinner"];

  return (
    <div className="animate-scale-in">
      {/* Menstrual phase banner */}
      {plan.menstrualPhase && (
        <div
          className="glass-panel mb-6"
          style={{
            padding: "1.25rem 1.5rem",
            borderColor: plan.menstrualPhase.color,
            background: plan.menstrualPhase.colorLight,
          }}
        >
          <div className="flex items-center gap-3 flex-wrap">
            <span style={{ fontSize: "2rem" }}>{plan.menstrualPhase.emoji}</span>
            <div>
              <div style={{ fontWeight: 700, color: plan.menstrualPhase.color }}>
                {plan.menstrualPhase.name} Phase · {plan.menstrualPhase.days}
              </div>
              <p className="text-sm" style={{ margin: "0.2rem 0 0", color: "var(--color-text-muted)" }}>
                {plan.menstrualPhase.description}
              </p>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap mt-3">
            <span className="text-xs font-semibold text-faint uppercase tracking-wide" style={{ alignSelf: "center" }}>Focus nutrients:</span>
            {plan.menstrualPhase.nutrients.map(n => (
              <span key={n} className="badge" style={{ background: `${plan.menstrualPhase.color}20`, color: plan.menstrualPhase.color, border: `1px solid ${plan.menstrualPhase.color}40`, fontSize: "0.75rem" }}>{n}</span>
            ))}
          </div>
          <div className="flex gap-2 flex-wrap mt-2">
            <span className="text-xs font-semibold text-faint uppercase tracking-wide" style={{ alignSelf: "center" }}>Boost foods:</span>
            {plan.menstrualPhase.boostFoods.map(f => (
              <span key={f} style={{ fontSize: "0.8rem", color: "var(--color-text-muted)" }}>✔ {f}</span>
            ))}
          </div>
        </div>
      )}

      {/* Daily totals summary */}
      <div className="glass-panel mb-6" style={{ padding: "1.5rem" }}>
        <h3 className="mb-4 flex items-center gap-2">
          <TrendingUp size={20} style={{ color: "var(--color-primary)" }} /> Today's Nutritional Overview
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "0.75rem" }}>
          {[
            { label: "Calories",  value: plan.totalCalories, unit: "kcal", color: "var(--color-primary)" },
            { label: "Protein",   value: plan.totalProtein,  unit: "g",    color: "#EF4444" },
            { label: "Carbs",     value: plan.totalCarbs,    unit: "g",    color: "#F59E0B" },
            { label: "Fats",      value: plan.totalFats,     unit: "g",    color: "#3B82F6" },
          ].map(s => (
            <div key={s.label} className="stat-card" style={{ padding: '1rem 0.5rem' }}>
              <div className="stat-value" style={{ color: s.color, fontSize: '1.4rem' }}>{s.value}<span style={{ fontSize: "0.75rem", fontWeight: 500 }}>{s.unit}</span></div>
              <div className="stat-label" style={{ fontSize: '0.7rem' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Meal slots */}
      <div className="glass-panel" style={{ padding: "1.5rem" }}>
        <h3 className="mb-4">Full Day Meal Plan</h3>
        <div className="flex flex-col gap-3">
          {slots.map(slot => (
            plan[slot] && <MealSlot key={slot} slotKey={slot} meal={plan[slot]} />
          ))}
        </div>
      </div>
    </div>
  );
}
