'use client';

import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  // Don't show on login page
  if (pathname === '/login') return null;

  const navItems = [
    { path: '/', label: 'Training', icon: '🏃' },
    { path: '/fitness', label: 'Fitness Level', icon: '📊' },
    { path: '/people', label: 'People', icon: '👥' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#00E5FF]/20 bg-[#0A1A2F] sm:hidden">
      <div className="flex h-16 items-center justify-around">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => router.push(item.path)}
              className="relative flex flex-col items-center justify-center gap-1 flex-1 h-full touch-manipulation"
            >
              <span className="text-2xl">{item.icon}</span>
              <span
                className={`text-xs font-medium ${
                  isActive ? 'text-[#00E5FF]' : 'text-[#8FA3AD]'
                }`}
              >
                {item.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-[#00E5FF]"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>
      {/* Safe area padding for devices with notches */}
      <div className="h-4 bg-[#0A1A2F]" />
    </nav>
  );
}
