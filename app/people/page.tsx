'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import BottomNav from '@/components/BottomNav';

interface UserProgress {
  id: number;
  username: string;
  totalSessions: number;
  completedSessions: number;
  progressPercentage: number;
}

export default function PeoplePage() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ id: number; username: string } | null>(null);
  const [users, setUsers] = useState<UserProgress[]>([]);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
    loadUsers();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/me', {
        credentials: 'include',
        cache: 'no-store',
      });
      const data = await response.json();
      if (!data.user) {
        router.push('/login');
        return;
      }
      setUser(data.user);
    } catch (error) {
      router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  const loadUsers = async () => {
    try {
      const response = await fetch('/api/users/progress', {
        credentials: 'include',
        cache: 'no-store',
      });
      if (response.ok) {
        const data = await response.json();
        setUsers(data.users || []);
      }
    } catch (error) {
      console.error('Failed to load users:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0A1A2F]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-[#8FA3AD]"
        >
          Loading...
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A1A2F] pb-20 sm:pb-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mx-auto max-w-4xl px-4 py-8"
      >
        <h1 className="mb-6 text-2xl font-bold text-white">People</h1>
        
        {users.length === 0 ? (
          <div className="rounded-lg bg-[#0A1A2F] border border-[#00E5FF]/20 p-6">
            <p className="text-[#8FA3AD] text-center">No runners yet. Be the first!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {users.map((userProgress, index) => (
              <motion.div
                key={userProgress.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="rounded-lg bg-[#0A1A2F] border border-[#00E5FF]/20 p-4 sm:p-6"
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {userProgress.username}
                      {userProgress.id === user?.id && (
                        <span className="ml-2 text-sm text-[#00E5FF]">(You)</span>
                      )}
                    </h3>
                  </div>
                  <span className="text-sm font-medium text-[#00E5FF]">
                    {userProgress.progressPercentage}%
                  </span>
                </div>
                
                <div className="mb-2">
                  <div className="flex items-center justify-between text-sm text-[#8FA3AD] mb-1">
                    <span>
                      {userProgress.completedSessions} / {userProgress.totalSessions} sessions
                    </span>
                  </div>
                  <div className="w-full bg-[#8FA3AD]/20 rounded-full h-3 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${userProgress.progressPercentage}%` }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                      className="h-full bg-gradient-to-r from-[#00E5FF] to-[#00E5FF]/80 rounded-full"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
      <BottomNav />
    </div>
  );
}
