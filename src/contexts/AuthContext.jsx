import { createContext, useContext, useEffect, useState } from 'react';
import { supabase, hasSupabaseConfig } from '../supabaseClient';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user,    setUser]    = useState(null);   // null = not loaded yet
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!hasSupabaseConfig) {
      // Demo mode: check localStorage
      const demoUser = localStorage.getItem('demoUser');
      setUser(demoUser ? JSON.parse(demoUser) : null);
      setLoading(false);
      return;
    }

    // Real Supabase session
    supabase.auth.getSession()
      .then(({ data: { session } }) => {
        setUser(session?.user ?? null);
      })
      .catch(err => {
        console.error("Auth Session Error:", err);
      })
      .finally(() => {
        setLoading(false);
      });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email, password, name) => {
    if (!hasSupabaseConfig) {
      const u = { id: Date.now().toString(), email, name, demo: true };
      localStorage.setItem('demoUser', JSON.stringify(u));
      setUser(u);
      return { error: null };
    }
    const { error } = await supabase.auth.signUp({
      email, password,
      options: { data: { name } }
    });
    return { error };
  };

  const signIn = async (email, password) => {
    if (!hasSupabaseConfig) {
      // Demo mode: accept any credentials
      const u = { id: 'demo', email, name: email.split('@')[0], demo: true };
      localStorage.setItem('demoUser', JSON.stringify(u));
      setUser(u);
      return { error: null };
    }
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  };

  const signOut = async () => {
    if (!hasSupabaseConfig) {
      localStorage.removeItem('demoUser');
      setUser(null);
      return;
    }
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
