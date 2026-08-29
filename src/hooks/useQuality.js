import { useState, useEffect } from 'react';

export function useQuality() {
  const [qualityTier, setQualityTier] = useState('high'); // 'low' | 'medium' | 'high'

  useEffect(() => {
    // Basic hardware concurrency & memory heuristic
    const cores = navigator.hardwareConcurrency || 4;
    const memory = navigator.deviceMemory || 8;

    if (cores < 4 || memory < 4) {
      setQualityTier('low');
    } else if (cores < 8 || memory < 8) {
      setQualityTier('medium');
    } else {
      setQualityTier('high');
    }
  }, []);

  return qualityTier;
}
