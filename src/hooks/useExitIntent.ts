import { useState, useEffect } from 'react';

// Exit intent detection optimized for web: show at most once per 24 hours
export const useExitIntent = () => {
  const [showExitIntent, setShowExitIntent] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const STORAGE_KEY = 'mcp.exitIntent.shownAt';
    const TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

    const now = Date.now();
    const isFresh = (() => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return false;
        const ts = Number(raw);
        return Number.isFinite(ts) && now - ts < TTL_MS;
      } catch {
        return false;
      }
    })();
    if (isFresh) return;

    const markShown = () => {
      try { localStorage.setItem(STORAGE_KEY, String(Date.now())); } catch {}
    };

    const onMouseOut = (e: MouseEvent) => {
      const related = (e as any).relatedTarget || (e as any).toElement;
      if (!related && e.clientY <= 0) {
        setShowExitIntent(true);
        markShown();
        removeListeners();
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if ((e.metaKey || e.ctrlKey) && (key === 'l' || key === 'w')) {
        setShowExitIntent(true);
        markShown();
        removeListeners();
      }
    };

    const removeListeners = () => {
      document.removeEventListener('mouseout', onMouseOut);
      window.removeEventListener('keydown', onKeyDown);
    };

    document.addEventListener('mouseout', onMouseOut);
    window.addEventListener('keydown', onKeyDown);
    return removeListeners;
  }, []);

  const closeExitIntent = () => setShowExitIntent(false);

  return { showExitIntent, closeExitIntent };
};
