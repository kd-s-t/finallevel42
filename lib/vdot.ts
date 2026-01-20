// VDOT calculation based on Jack Daniels' Running Formula

export interface TrainingPaces {
  easyMin: string; // min/km
  easyMax: string; // min/km
  marathon: string; // min/km
  threshold: string; // min/km
  interval: string; // min/km
  repetition: string; // min/km
}

// Standard race distances in meters
export const RACE_DISTANCES = {
  1500: 1500,
  1600: 1609.34, // 1 mile
  3000: 3000,
  3200: 3218.69, // 2 miles
  5000: 5000,
  10000: 10000,
  21097: 21097.5, // Half marathon
  42195: 42195, // Marathon
} as const;

export type RaceDistance = keyof typeof RACE_DISTANCES;

/**
 * Calculate VDOT from race performance
 * Based on Daniels/Gilbert formula
 */
export function calculateVDOT(distanceMeters: number, timeSeconds: number): number {
  if (distanceMeters <= 0 || timeSeconds <= 0) return 0;

  const t = timeSeconds / 60; // time in minutes
  const v = distanceMeters / t; // velocity in meters/minute

  // Oxygen cost for the given velocity
  // VO2 = -4.60 + 0.182258 * v + 0.000104 * v^2
  const vo2 = -4.60 + 0.182258 * v + 0.000104 * Math.pow(v, 2);

  // Percentage of max VO2 intensity for the given duration
  // PctMax = 0.8 + 0.1894393 * e^(-0.012778 * t) + 0.2989558 * e^(-0.1932605 * t)
  const pctMax =
    0.8 +
    0.1894393 * Math.exp(-0.012778 * t) +
    0.2989558 * Math.exp(-0.1932605 * t);

  const vdot = vo2 / pctMax;
  return Math.round(vdot * 10) / 10; // Round to 1 decimal place
}

/**
 * Calculate pace (seconds per km) from VDOT and intensity percentage
 */
function calculatePaceFromVDOT(vdot: number, intensityPercent: number): number {
  // Reverse the VO2 formula to find velocity
  // We need to solve: targetVO2 = -4.60 + 0.182258 * v + 0.000104 * v^2
  // Where targetVO2 = vdot * intensityPercent
  
  const targetVO2 = vdot * intensityPercent;
  
  // Using quadratic formula to solve for v
  // 0.000104 * v^2 + 0.182258 * v - (4.60 + targetVO2) = 0
  const a = 0.000104;
  const b = 0.182258;
  const c = -(4.60 + targetVO2);
  
  const discriminant = b * b - 4 * a * c;
  const v = (-b + Math.sqrt(discriminant)) / (2 * a); // velocity in meters/minute
  
  // Convert to seconds per km
  // v meters/min = v/60 m/s = (v/60) * 3.6 km/h = v * 0.06 km/h
  // pace (sec/km) = 3600 / (v * 0.06) = 60000 / v
  return 60000 / v;
}

/**
 * Format seconds per km to min:sec/km
 */
function formatPace(secondsPerKm: number): string {
  const minutes = Math.floor(secondsPerKm / 60);
  const seconds = Math.round(secondsPerKm % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

/**
 * Get training paces from VDOT
 */
export function getTrainingPaces(vdot: number): TrainingPaces {
  // Training intensities based on Daniels' Running Formula
  const easyMin = calculatePaceFromVDOT(vdot, 0.59); // 59% - lower end of easy
  const easyMax = calculatePaceFromVDOT(vdot, 0.74); // 74% - upper end of easy
  const marathon = calculatePaceFromVDOT(vdot, 0.75); // 75-80% for marathon
  const threshold = calculatePaceFromVDOT(vdot, 0.88); // 88% for threshold
  const interval = calculatePaceFromVDOT(vdot, 0.95); // 95% for interval
  const repetition = calculatePaceFromVDOT(vdot, 1.05); // 105% for repetition

  return {
    easyMin: formatPace(easyMin),
    easyMax: formatPace(easyMax),
    marathon: formatPace(marathon),
    threshold: formatPace(threshold),
    interval: formatPace(interval),
    repetition: formatPace(repetition),
  };
}

/**
 * Convert time input (HH:MM:SS or MM:SS) to seconds
 */
export function parseTimeInput(timeStr: string): number {
  const parts = timeStr.split(':').map(Number);
  
  if (parts.length === 3) {
    // HH:MM:SS
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  } else if (parts.length === 2) {
    // MM:SS
    return parts[0] * 60 + parts[1];
  } else if (parts.length === 1) {
    // Just seconds
    return parts[0];
  }
  
  return 0;
}

/**
 * Format seconds to MM:SS or HH:MM:SS
 */
export function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.round(seconds % 60);
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}
