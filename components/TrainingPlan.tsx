'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

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
  const [collapsedWeeks, setCollapsedWeeks] = useState<Set<number>>(new Set());
  const [daysUntilRace, setDaysUntilRace] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
    loadSessions();
    calculateDaysUntilRace();
  }, []);

  const calculateDaysUntilRace = () => {
    const raceDate = new Date('2025-07-12');
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    raceDate.setHours(0, 0, 0, 0);
    const diffTime = raceDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDaysUntilRace(diffDays);
  };

  const toggleWeek = (weekNumber: number) => {
    setCollapsedWeeks((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(weekNumber)) {
        newSet.delete(weekNumber);
      } else {
        newSet.add(weekNumber);
      }
      return newSet;
    });
  };

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
      <div className="flex min-h-screen items-center justify-center px-4 bg-[#0A1A2F]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-base text-[#8FA3AD] sm:text-lg"
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

  // Calculate progress
  const totalSessions = sessions.length;
  const completedSessions = sessions.filter(s => s.completed).length;
  const progressPercentage = totalSessions > 0 ? Math.round((completedSessions / totalSessions) * 100) : 0;

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
      className="min-h-screen bg-[#0A1A2F] py-4 sm:py-8"
    >
      <div className="mx-auto max-w-4xl px-3 sm:px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-4 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-center gap-4">
            <Image
              src="/logo.png"
              alt="FinalLevel 42"
              width={120}
              height={60}
              priority
              className="hidden sm:block"
            />
            <Image
              src="/logo.png"
              alt="FinalLevel 42"
              width={80}
              height={40}
              priority
              className="sm:hidden"
            />
            <div>
              {user && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-xs text-[#8FA3AD] sm:text-sm"
                >
                  Welcome, {user.username}
                </motion.p>
              )}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-1 text-sm sm:text-base"
              >
                <span className="text-[#00E5FF] font-semibold">
                  {daysUntilRace > 0 
                    ? `${daysUntilRace} days until marathon` 
                    : daysUntilRace === 0 
                    ? 'RACE DAY! 🏃' 
                    : 'Race completed! 🎉'}
                </span>
              </motion.div>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="w-full rounded-md bg-[#00E5FF] px-4 py-2.5 text-sm font-medium text-[#0A1A2F] hover:bg-[#00E5FF]/80 active:bg-[#00E5FF]/70 sm:w-auto touch-manipulation"
          >
            Logout
          </motion.button>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-6 rounded-lg bg-[#0A1A2F] border border-[#00E5FF]/20 p-4 sm:p-6"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-base font-semibold text-white sm:text-lg">Training Progress</h3>
            <span className="text-sm font-medium text-[#00E5FF] sm:text-base">
              {completedSessions} / {totalSessions} sessions ({progressPercentage}%)
            </span>
          </div>
          <div className="w-full bg-[#8FA3AD]/20 rounded-full h-3 sm:h-4 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-[#00E5FF] to-[#00E5FF]/80 rounded-full"
            />
          </div>
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
              className="mb-6 rounded-lg bg-[#0A1A2F] border border-[#00E5FF]/20 p-4 shadow-md sm:mb-8 sm:p-6"
            >
              <button
                onClick={() => toggleWeek(week.weekNumber)}
                className="w-full flex items-center justify-between mb-3 text-left"
              >
                <div className="flex items-center gap-3">
                  <h2 className="text-lg font-semibold text-white sm:text-2xl">
                    WEEK {week.weekNumber} <span className="text-base sm:text-xl">({week.weekRange})</span>
                  </h2>
                  <span className="text-xs text-[#8FA3AD] sm:text-sm">
                    ({week.sessions.filter(s => s.completed).length}/{week.sessions.length})
                  </span>
                </div>
                <motion.svg
                  animate={{ rotate: collapsedWeeks.has(week.weekNumber) ? 0 : 180 }}
                  transition={{ duration: 0.3 }}
                  className="w-5 h-5 text-[#00E5FF] flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </motion.svg>
              </button>
              {!collapsedWeeks.has(week.weekNumber) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  style={{ overflow: 'visible' }}
                >
                  <div className="space-y-2 sm:space-y-3 pt-2">
                {week.sessions.map((session, sessionIndex) => (
                  <motion.div
                    key={`${session.week_number}-${session.day_name}`}
                    initial={false}
                    animate={{ opacity: 1 }}
                    whileHover={{ scale: 1.02 }}
                    className={`flex items-start gap-3 rounded-lg border p-3 sm:gap-4 sm:p-4 ${
                      session.completed
                        ? 'border-[#00E5FF] bg-[#00E5FF]/10'
                        : 'border-[#8FA3AD]/30 bg-[#0A1A2F]'
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
                        className="mt-0.5 h-6 w-6 cursor-pointer rounded border-[#8FA3AD]/30 text-[#00E5FF] focus:ring-2 focus:ring-[#00E5FF]/50 focus:ring-offset-2 focus:ring-offset-[#0A1A2F] sm:mt-1 sm:h-5 sm:w-5 touch-manipulation"
                      />
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
                        <span className="font-semibold text-white text-sm sm:text-base">
                          {session.day_name} {session.date}
                        </span>
                        {session.time !== '—' && (
                          <span className="text-xs text-[#8FA3AD] sm:text-sm">Time: {session.time}</span>
                        )}
                      </div>
                      <div className="mt-1">
                        <span className="font-medium text-[#00E5FF] text-sm sm:text-base">
                          {session.session_type}
                        </span>
                      </div>
                      <div className="mt-1 whitespace-pre-line text-xs text-[#8FA3AD] sm:text-sm">
                        {session.details}
                      </div>
                      <AnimatePresence>
                        {session.completed && session.completed_at && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-2 text-xs text-[#00E5FF]"
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
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
