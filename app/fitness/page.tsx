'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import BottomNav from '@/components/BottomNav';
import { calculateVDOT, getTrainingPaces, RACE_DISTANCES, parseTimeInput, formatTime, type RaceDistance } from '@/lib/vdot';

export default function FitnessPage() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ id: number; username: string } | null>(null);
  const [savedVDOT, setSavedVDOT] = useState<number | null>(null);
  const [distance, setDistance] = useState<RaceDistance>('5000');
  const [timeInput, setTimeInput] = useState('');
  const [calculatedVDOT, setCalculatedVDOT] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    checkAuth();
    loadVDOT();
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

  const loadVDOT = async () => {
    try {
      const response = await fetch('/api/user/vdot', {
        credentials: 'include',
        cache: 'no-store',
      });
      if (response.ok) {
        const data = await response.json();
        if (data.vdot) {
          setSavedVDOT(data.vdot);
          setCalculatedVDOT(data.vdot);
        }
      }
    } catch (error) {
      console.error('Failed to load VDOT:', error);
    }
  };

  const handleCalculate = () => {
    setError('');
    
    if (!timeInput.trim()) {
      setError('Please enter a race time');
      return;
    }

    const timeSeconds = parseTimeInput(timeInput);
    if (timeSeconds <= 0) {
      setError('Please enter a valid time (format: MM:SS or HH:MM:SS)');
      return;
    }

    const distanceMeters = RACE_DISTANCES[distance];
    const vdot = calculateVDOT(distanceMeters, timeSeconds);
    
    if (vdot <= 0 || !isFinite(vdot)) {
      setError('Invalid calculation. Please check your inputs.');
      return;
    }

    setCalculatedVDOT(vdot);
  };

  const handleSave = async () => {
    if (!calculatedVDOT) return;

    setSaving(true);
    setError('');

    try {
      const response = await fetch('/api/user/vdot', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ vdot: calculatedVDOT }),
      });

      if (response.ok) {
        setSavedVDOT(calculatedVDOT);
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to save VDOT');
      }
    } catch (error) {
      setError('Failed to save VDOT');
    } finally {
      setSaving(false);
    }
  };

  const trainingPaces = calculatedVDOT ? getTrainingPaces(calculatedVDOT) : null;

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
        <h1 className="mb-6 text-2xl font-bold text-white">Fitness Level</h1>

        {/* Saved VDOT Display */}
        {savedVDOT && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 rounded-lg bg-[#00E5FF]/10 border border-[#00E5FF]/30 p-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#8FA3AD]">Your Current VDOT</p>
                <p className="text-3xl font-bold text-[#00E5FF]">{savedVDOT}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* VDOT Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 rounded-lg bg-[#0A1A2F] border border-[#00E5FF]/20 p-6"
        >
          <h2 className="mb-4 text-lg font-semibold text-white">Calculate VDOT</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#8FA3AD] mb-2">
                Race Distance
              </label>
              <select
                value={distance}
                onChange={(e) => setDistance(e.target.value as RaceDistance)}
                className="w-full rounded-md border border-[#8FA3AD]/30 bg-[#0A1A2F] text-white px-3 py-2 focus:border-[#00E5FF] focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50"
              >
                <option value="1500">1500m</option>
                <option value="1600">1 Mile</option>
                <option value="3000">3000m</option>
                <option value="3200">2 Miles</option>
                <option value="5000">5K</option>
                <option value="10000">10K</option>
                <option value="21097">Half Marathon</option>
                <option value="42195">Marathon</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#8FA3AD] mb-2">
                Race Time (MM:SS or HH:MM:SS)
              </label>
              <input
                type="text"
                value={timeInput}
                onChange={(e) => setTimeInput(e.target.value)}
                placeholder="e.g., 20:00 or 1:20:00"
                className="w-full rounded-md border border-[#8FA3AD]/30 bg-[#0A1A2F] text-white px-3 py-2 focus:border-[#00E5FF] focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50"
              />
            </div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="rounded-md bg-red-900/30 border border-red-500/50 p-3 text-sm text-red-300"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={handleCalculate}
              className="w-full rounded-md bg-[#00E5FF] px-4 py-2 font-medium text-[#0A1A2F] hover:bg-[#00E5FF]/80 focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 touch-manipulation"
            >
              Calculate VDOT
            </button>
          </div>
        </motion.div>

        {/* Calculated VDOT Result */}
        {calculatedVDOT && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 rounded-lg bg-[#0A1A2F] border border-[#00E5FF]/20 p-6"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Your VDOT</h2>
              <span className="text-3xl font-bold text-[#00E5FF]">{calculatedVDOT}</span>
            </div>

            {calculatedVDOT !== savedVDOT && (
              <button
                onClick={handleSave}
                disabled={saving}
                className="w-full rounded-md bg-[#00E5FF] px-4 py-2 font-medium text-[#0A1A2F] hover:bg-[#00E5FF]/80 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 touch-manipulation"
              >
                {saving ? 'Saving...' : 'Save to Profile'}
              </button>
            )}
          </motion.div>
        )}

        {/* Training Paces */}
        {trainingPaces && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-lg bg-[#0A1A2F] border border-[#00E5FF]/20 p-6"
          >
            <h2 className="mb-4 text-lg font-semibold text-white">Training Paces</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-[#8FA3AD]/20">
                <span className="text-[#8FA3AD]">Easy Run</span>
                <span className="text-white font-medium">
                  {trainingPaces.easyMin} - {trainingPaces.easyMax} /km
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-[#8FA3AD]/20">
                <span className="text-[#8FA3AD]">Marathon Pace</span>
                <span className="text-white font-medium">{trainingPaces.marathon} /km</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-[#8FA3AD]/20">
                <span className="text-[#8FA3AD]">Threshold (Tempo)</span>
                <span className="text-white font-medium">{trainingPaces.threshold} /km</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-[#8FA3AD]/20">
                <span className="text-[#8FA3AD]">Interval</span>
                <span className="text-white font-medium">{trainingPaces.interval} /km</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-[#8FA3AD]">Repetition</span>
                <span className="text-white font-medium">{trainingPaces.repetition} /km</span>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
      <BottomNav />
    </div>
  );
}
