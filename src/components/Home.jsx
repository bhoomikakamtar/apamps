import { useNavigate } from 'react-router-dom';
import { ArrowRight, Clock, Heart, Activity, CalendarDays } from 'lucide-react';
import { useEffect } from 'react';
import { supabase } from '../supabaseClient';

const FEATURES = [
  {
    icon: <Clock size={32} />, color: '#6366F1',
    title: 'Time-Phase Aware',
    desc: 'Auto-detects morning, afternoon, evening & night to serve the right meal at the right time.'
  },
  {
    icon: <CalendarDays size={32} />, color: '#EC4899',
    title: 'Menstrual Phase Sync',
    desc: 'Enter your period date — NutriPhase adjusts meals accordingly.'
  },
  {
    icon: <Activity size={32} />, color: '#10B981',
    title: 'Goal-Driven Plans',
    desc: 'Weight loss, muscle gain, or maintenance — calorie-tuned plans.'
  },
  {
    icon: <Heart size={32} />, color: '#EF4444',
    title: 'Diet Safe',
    desc: 'Veg / Non-Veg / Vegan with allergen filtering.'
  },
];

export default function Home() {
  const navigate = useNavigate();

  // ✅ SAFE USER SAVE (RUN ONCE PER LOGIN SESSION)
  useEffect(() => {
    const saveUser = async () => {
      try {
        const {
          data: { user }
        } = await supabase.auth.getUser();

        if (!user) return;

        // check if user already exists safely
        const { data: existing } = await supabase
          .from('users')
          .select('email')
          .eq('email', user.email)
          .maybeSingle(); // safer than .single()

        if (!existing) {
          const { error } = await supabase.from('users').insert([
            {
              email: user.email,
              name:
                user.user_metadata?.name ||
                user.email.split('@')[0]
            }
          ]);

          if (error) {
            console.log("Insert error:", error.message);
          }
        }
      } catch (err) {
        console.log("Supabase error:", err.message);
      }
    };

    saveUser();
  }, []);

  return (
    <div className="animate-fade-in-up container" style={{ maxWidth: '900px' }}>

      {/* HERO */}
      <div className="glass-panel text-center" style={{ padding: 'clamp(2rem, 8vw, 4rem) 1.5rem', marginBottom: '2rem' }}>
        <h1>
          <span className="gradient-text">Smart Nutrition,</span><br />
          Perfectly Timed.
        </h1>

        <p className="text-muted" style={{ fontSize: 'clamp(1rem, 3vw, 1.15rem)', maxWidth: '500px', margin: '0.5rem auto 2rem' }}>
          Personalized meal plans based on your body & goals.
        </p>

        <button
          className="btn btn-primary"
          onClick={() => navigate('/dashboard')}
          style={{ padding: '0.85rem 2rem', fontSize: '1.05rem' }}
        >
          Get Your Meal Plan <ArrowRight size={20} />
        </button>
      </div>

      {/* FEATURES (RESPONSIVE GRID) */}
      <div className="responsive-grid">
        {FEATURES.map((f, i) => (
          <div
            key={i}
            className="glass-panel"
            style={{
              padding: '1.75rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem'
            }}
          >
            <div style={{ color: f.color, marginBottom: '0.25rem' }}>
              {f.icon}
            </div>
            <h4 style={{ margin: 0 }}>{f.title}</h4>
            <p className="text-sm text-muted" style={{ margin: 0, lineHeight: 1.5 }}>
              {f.desc}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
}