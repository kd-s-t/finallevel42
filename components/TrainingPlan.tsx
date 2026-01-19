'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

interface TrainingSession {
  week_number: number;
  week_range: string;
  day_name: string;
  date: string;
  time: string;
  session_type: string;
  details: string;
  completed: number;
  completed_at: string | null;
}

interface WeekGroup {
  weekNumber: number;
  weekRange: string;
  sessions: TrainingSession[];
}

export default function TrainingPlan() {
  const [sessions, setSessions] = useState<TrainingSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ id: number; username: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
    loadSessions();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/me');
      const data = await response.json();
      if (!data.user) {
        router.push('/login');
        return;
      }
      setUser(data.user);
    } catch (error) {
      router.push('/login');
    }
  };

  const loadSessions = async () => {
    try {
      const response = await fetch('/api/training');
      if (response.status === 401) {
        router.push('/login');
        return;
      }
      const data = await response.json();
      setSessions(data.sessions);
    } catch (error) {
      console.error('Failed to load sessions:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSession = async (weekNumber: number, dayName: string, completed: number) => {
    const newCompleted = completed ? 0 : 1;
    
    try {
      const response = await fetch('/api/training', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          weekNumber,
          dayName,
          completed: newCompleted,
        }),
      });

      if (response.ok) {
        setSessions((prev) =>
          prev.map((s) =>
            s.week_number === weekNumber && s.day_name === dayName
              ? { ...s, completed: newCompleted, completed_at: newCompleted ? new Date().toISOString() : null }
              : s
          )
        );
      }
    } catch (error) {
      console.error('Failed to update session:', error);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
    router.refresh();
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-base text-gray-600 sm:text-lg"
        >
          <motion.span
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Loading...
          </motion.span>
        </motion.div>
      </div>
    );
  }

  // Group sessions by week
  const weekGroups: WeekGroup[] = [];
  const weekMap = new Map<number, { weekRange: string; sessions: TrainingSession[] }>();

  sessions.forEach((session) => {
    if (!weekMap.has(session.week_number)) {
      weekMap.set(session.week_number, {
        weekRange: session.week_range,
        sessions: [],
      });
    }
    weekMap.get(session.week_number)!.sessions.push(session);
  });

  weekMap.forEach((value, weekNumber) => {
    weekGroups.push({
      weekNumber,
      weekRange: value.weekRange,
      sessions: value.sessions,
    });
  });

  weekGroups.sort((a, b) => a.weekNumber - b.weekNumber);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const weekVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
  };

  const sessionVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-4 sm:py-8"
    >
      <div className="mx-auto max-w-4xl px-3 sm:px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-4 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <h1 className="text-2xl font-bold text-gray-800 sm:text-4xl">42km Trainer</h1>
            {user && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mt-1 text-xs text-gray-600 sm:text-sm"
              >
                Welcome, {user.username}
              </motion.p>
            )}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="w-full rounded-md bg-red-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-700 active:bg-red-800 sm:w-auto touch-manipulation"
          >
            Logout
          </motion.button>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {weekGroups.map((week, weekIndex) => (
            <motion.div
              key={week.weekNumber}
              variants={weekVariants}
              className="mb-6 rounded-lg bg-white p-4 shadow-md sm:mb-8 sm:p-6"
            >
              <h2 className="mb-3 text-lg font-semibold text-gray-800 sm:mb-4 sm:text-2xl">
                WEEK {week.weekNumber} <span className="text-base sm:text-xl">({week.weekRange})</span>
              </h2>
              <div className="space-y-2 sm:space-y-3">
                {week.sessions.map((session, sessionIndex) => (
                  <motion.div
                    key={`${session.week_number}-${session.day_name}`}
                    variants={sessionVariants}
                    whileHover={{ scale: 1.02 }}
                    className={`flex items-start gap-3 rounded-lg border p-3 sm:gap-4 sm:p-4 ${
                      session.completed
                        ? 'border-green-300 bg-green-50'
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    <motion.div
                      whileTap={{ scale: 0.9 }}
                      className="flex-shrink-0"
                    >
                      <input
                        type="checkbox"
                        checked={!!session.completed}
                        onChange={() => toggleSession(session.week_number, session.day_name, session.completed)}
                        className="mt-0.5 h-6 w-6 cursor-pointer rounded border-gray-300 text-indigo-600 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-1 sm:h-5 sm:w-5 touch-manipulation"
                      />
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
                        <span className="font-semibold text-gray-800 text-sm sm:text-base">
                          {session.day_name} {session.date}
                        </span>
                        {session.time !== '—' && (
                          <span className="text-xs text-gray-600 sm:text-sm">Time: {session.time}</span>
                        )}
                      </div>
                      <div className="mt-1">
                        <span className="font-medium text-indigo-600 text-sm sm:text-base">
                          {session.session_type}
                        </span>
                      </div>
                      <div className="mt-1 whitespace-pre-line text-xs text-gray-700 sm:text-sm">
                        {session.details}
                      </div>
                      <AnimatePresence>
                        {session.completed && session.completed_at && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-2 text-xs text-green-600"
                          >
                            Completed on {new Date(session.completed_at).toLocaleDateString()}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
