'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          password,
          action: isRegister ? 'register' : 'login',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Authentication failed');
        setLoading(false);
        return;
      }

      router.push('/');
      router.refresh();
    } catch (err) {
      setError('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex min-h-screen items-center justify-center bg-[#0A1A2F] px-4 py-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="w-full max-w-md rounded-lg bg-[#0A1A2F] border border-[#00E5FF]/20 p-6 shadow-xl sm:p-8"
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6 flex flex-col items-center"
        >
          <Image
            src="/logo.png"
            alt="FinalLevel 42"
            width={200}
            height={100}
            priority
            className="mb-4"
          />
        </motion.div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <label htmlFor="username" className="block text-sm font-medium text-[#8FA3AD] mb-1">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
              className="w-full rounded-md border border-[#8FA3AD]/30 bg-[#0A1A2F] text-white px-3 py-3 text-base focus:border-[#00E5FF] focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 touch-manipulation"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label htmlFor="password" className="block text-sm font-medium text-[#8FA3AD] mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete={isRegister ? 'new-password' : 'current-password'}
              className="w-full rounded-md border border-[#8FA3AD]/30 bg-[#0A1A2F] text-white px-3 py-3 text-base focus:border-[#00E5FF] focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 touch-manipulation"
            />
          </motion.div>
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                transition={{ duration: 0.3 }}
                className="rounded-md bg-red-900/30 border border-red-500/50 p-3 text-sm text-red-300 overflow-hidden"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-[#00E5FF] px-4 py-3 text-base font-medium text-[#0A1A2F] hover:bg-[#00E5FF]/80 active:bg-[#00E5FF]/70 focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:ring-offset-2 focus:ring-offset-[#0A1A2F] disabled:opacity-50 touch-manipulation"
          >
            {loading ? (
              <motion.span
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                Loading...
              </motion.span>
            ) : (
              isRegister ? 'Register' : 'Login'
            )}
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={() => {
              setIsRegister(!isRegister);
              setError('');
            }}
            className="w-full py-2 text-sm text-[#00E5FF] hover:text-[#00E5FF]/80 active:text-[#00E5FF]/70 touch-manipulation"
          >
            {isRegister ? 'Already have an account? Login' : "Don't have an account? Register"}
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
}
