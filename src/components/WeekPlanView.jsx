import { useState } from 'react';
import { Flame, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

const SLOT_META = {
  breakfast:     { label: "Breakfast",     emoji: "🌅" },
  mid_morning:   { label: "Mid-Morning",   emoji: "☕" },
  lunch:         { label: "Lunch",         emoji: "🌞" },
  evening_snack: { label: "Evening",       emoji: "🌆" },
  dinner:        { label: "Dinner",        emoji: "🌙" },
};

function DayColumn({ dayPlan, isActive }) {
  return (
    <div
      style={{
        background: isActive ? "rgba(16,185,129,0.08)" : "rgba(255,255,255,0.03)",
        border: `1px solid ${isActive ? "rgba(16,185,129,0.4)" : "var(--color-border)"}`,
        borderRadius: "var(--radius-lg)",
        padding: "1rem",
        minWidth: 0,
      }}
    >
      <div className="text-center mb-3">
        <div style={{ fontWeight: 700, fontSize: "0.9rem", color: isActive ? "var(--color-primary)" : "var(--color-text)" }}>
          {dayPlan.day}
        </div>
        <div className="badge badge-green" style={{ fontSize: "0.7rem", marginTop: "0.25rem" }}>
          <Flame size={10} /> {dayPlan.totalCalories} kcal
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {Object.entries(SLOT_META).map(([slot, meta]) => {
          const meal = dayPlan[slot];
          if (!meal) return null;
          return (
            <div
              key={slot}
              title={meal.name}
              style={{
                background: "rgba(255,255,255,0.04)",
                borderRadius: "var(--radius-sm)",
                padding: "0.5rem 0.6rem",
                cursor: "default",
              }}
            >
              <div className="text-xs text-faint" style={{ marginBottom: "2px" }}>
                {meta.emoji} {meta.label}
              </div>
              <div style={{ fontWeight: 600, fontSize: "0.8rem", color: "var(--color-text)", lineHeight: 1.3 }}>
                {meal.icon} {meal.name}
              </div>
              <div className="text-xs text-faint">{meal.calories} kcal</div>
            </div>
          );
        })}
      </div>

      {/* Mini totals */}
      <div style={{ marginTop: "0.75rem", paddingTop: "0.75rem", borderTop: "1px solid var(--color-border)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.25rem", textAlign: "center" }}>
          {[
            { label: "P", value: dayPlan.totalProtein, color: "#EF4444" },
            { label: "C", value: dayPlan.totalCarbs,   color: "#F59E0B" },
            { label: "F", value: dayPlan.totalFats,    color: "#3B82F6" },
          ].map(m => (
            <div key={m.label}>
              <div style={{ fontWeight: 700, fontSize: "0.85rem", color: m.color }}>{m.value}g</div>
              <div className="text-xs text-faint">{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function WeekPlanView({ plan }) {
  const today = new Date().getDay(); // 0=Sun,1=Mon,...
  // Sunday = index 6 in our array (Mon=0, ... Sun=6)
  const todayIdx = today === 0 ? 6 : today - 1;

  // Mobile pagination: show 1 day at a time on small screens
  const [activeMobileDay, setActiveMobileDay] = useState(todayIdx);

  return (
    <div className="animate-scale-in">
      <div className="glass-panel mb-6" style={{ padding: "1.5rem" }}>
        <h3 className="flex items-center gap-2 mb-1">
          <Calendar size={20} style={{ color: "var(--color-primary)" }} /> 7-Day Meal Plan
        </h3>
        <p className="text-sm text-muted mb-4">Click any meal slot to see its full details. Today is highlighted.</p>

        {/* Desktop: grid of 7 columns */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: "0.6rem", overflowX: "auto" }}>
          {plan.map((dayPlan, i) => (
            <DayColumn key={dayPlan.day} dayPlan={dayPlan} isActive={i === todayIdx} />
          ))}
        </div>

        {/* Mobile navigator */}
        <div style={{ display: "none" }} id="week-mobile-nav">
          <div className="flex items-center justify-between mt-4">
            <button
              className="btn btn-ghost"
              style={{ padding: "0.5rem" }}
              onClick={() => setActiveMobileDay(d => Math.max(0, d - 1))}
              disabled={activeMobileDay === 0}
            ><ChevronLeft size={20} /></button>
            <span style={{ fontWeight: 600 }}>{plan[activeMobileDay]?.day}</span>
            <button
              className="btn btn-ghost"
              style={{ padding: "0.5rem" }}
              onClick={() => setActiveMobileDay(d => Math.min(6, d + 1))}
              disabled={activeMobileDay === 6}
            ><ChevronRight size={20} /></button>
          </div>
          <div className="mt-4">
            <DayColumn dayPlan={plan[activeMobileDay]} isActive />
          </div>
        </div>
      </div>

      {/* Weekly totals summary */}
      <div className="glass-panel" style={{ padding: "1.5rem" }}>
        <h4 className="mb-4">Weekly Nutritional Summary</h4>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "0.75rem" }}>
          {[
            { label: "Avg. Calories", value: Math.round(plan.reduce((s,d) => s + d.totalCalories,0) / 7), unit: "kcal/day", color: "var(--color-primary)" },
            { label: "Avg. Protein",  value: Math.round(plan.reduce((s,d) => s + d.totalProtein, 0) / 7), unit: "g/day",   color: "#EF4444" },
            { label: "Avg. Carbs",    value: Math.round(plan.reduce((s,d) => s + d.totalCarbs,   0) / 7), unit: "g/day",   color: "#F59E0B" },
            { label: "Avg. Fats",     value: Math.round(plan.reduce((s,d) => s + d.totalFats,    0) / 7), unit: "g/day",   color: "#3B82F6" },
          ].map(s => (
            <div key={s.label} className="stat-card">
              <div className="stat-value" style={{ color: s.color, fontSize: "1.3rem" }}>{s.value}</div>
              <div className="stat-label">{s.label}</div>
              <div className="text-xs text-faint">{s.unit}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
