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
    desc: 'Enter your period date — NutriPhase calculates your cycle phase and adjusts every meal accordingly.'
  },
  {
    icon: <Activity size={32} />, color: '#10B981',
    title: 'Goal-Driven Plans',
    desc: 'Weight loss, muscle gain, or maintenance — each plan is calorie-tuned to your goal.'
  },
  {
    icon: <Heart size={32} />, color: '#EF4444',
    title: 'Diet & Allergy Safe',
    desc: 'Veg, Non-Veg, Vegan options. Allergen filtering removes incompatible meals automatically.'
  },
];

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const saveUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();

        console.log("USER:", user);

        if (user) {
          const { data: existing } = await supabase
            .from('users')
            .select('*')
            .eq('email', user.email);

          if (!existing || existing.length === 0) {
            await supabase.from('users').insert([
              {
                email: user.email,
                name: user.user_metadata?.name || user.email.split('@')[0]
              }
            ]);

            console.log("✅ Real user saved");
          }
        }
      } catch (err) {
        console.error("🔥 ERROR:", err);
      }
    };

    saveUser();
  }, []);

  return (
    <div className="animate-fade-in-up" style={{ maxWidth: '860px', margin: '0 auto' }}>

      {/* Hero */}
      <div className="glass-panel text-center" style={{ padding: '4.5rem 3rem', marginBottom: '2rem' }}>
        <h1>
          <span className="gradient-text">Smart Nutrition,</span><br />
          Perfectly Timed.
        </h1>

        <p className="text-muted">
          NutriPhase recommends meals based on your time, cycle, goals, and diet.
        </p>

        <button
          className="btn btn-primary"
          onClick={() => navigate('/dashboard')}
        >
          Get Your Meal Plan <ArrowRight size={20} />
        </button>
      </div>

    </div>
  );
}