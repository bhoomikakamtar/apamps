import { useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';

const NOTIFICATION_SLOTS = [
  { label: 'Breakfast', time: '08:00', emoji: '🌅' },
  { label: 'Lunch',     time: '13:00', emoji: '🌞' },
  { label: 'Snack',     time: '17:00', emoji: '🌆' },
  { label: 'Dinner',    time: '20:00', emoji: '🌙' },
];

export default function NotificationManager() {
  const { user } = useAuth();

  const sendNotification = useCallback((slot) => {
    if (Notification.permission !== 'granted') return;

    new Notification(`NutriPhase: Time for ${slot.label}! ${slot.emoji}`, {
      body: `Check your personalized meal plan for ${slot.label.toLowerCase()}.`,
      icon: '/favicon.svg', // Ensure this exists in public folder
    });
  }, []);

  useEffect(() => {
    if (!user) return;

    const checkNotifications = () => {
      const isEnabled = localStorage.getItem('notificationsEnabled') === 'true';
      if (!isEnabled || Notification.permission !== 'granted') return;

      const now = new Date();
      const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

      const slot = NOTIFICATION_SLOTS.find(s => s.time === currentTime);
      
      // Prevent multiple notifications in the same minute
      const lastNotified = localStorage.getItem('lastNotificationTime');
      
      if (slot && lastNotified !== currentTime) {
        sendNotification(slot);
        localStorage.setItem('lastNotificationTime', currentTime);
      }
    };

    // Check every 30 seconds
    const interval = setInterval(checkNotifications, 30000);
    return () => clearInterval(interval);
  }, [user, sendNotification]);

  return null; // This component doesn't render anything
}
