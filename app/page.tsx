'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export default function Home() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [noPos, setNoPos] = useState({ top: 50, left: 60 });
  const [noScale, setNoScale] = useState(1);
  const [yesScale, setYesScale] = useState(1);

  useEffect(() => setMounted(true), []);

  const handleNoHover = useCallback(() => {
    setNoPos({
      top: randomBetween(12, 82),
      left: randomBetween(12, 82)
    });

    setNoScale((prev) => Math.max(prev * 0.9, 0.45));
    setYesScale((prev) => Math.min(prev + 0.12, 1.5));
  }, []);

  const yesButtonStyles = useMemo(
    () => ({ transform: `translate(-50%, -50%) scale(${yesScale.toFixed(2)})` }),
    [yesScale]
  );

  const noButtonStyles = useMemo(
    () => ({
      top: `${noPos.top}%`,
      left: `${noPos.left}%`,
      transform: `translate(-50%, -50%) scale(${noScale.toFixed(2)})`
    }),
    [noPos, noScale]
  );

  if (!mounted) return null;

  return (
    <div className="main-shell sparkles">
      <h1 className="headline">Will you be my valentine?</h1>

      <div className="buttons-area">
        <button
          aria-label="Yes"
          onClick={() => router.push('/yes')}
          style={{
            position: 'absolute',
            top: '50%',
            left: '40%',
            zIndex: 2,
            background: 'linear-gradient(135deg, #ff4f86, #ff7f50)',
            color: '#fff',
            fontSize: '20px',
            minWidth: '160px',
            ...yesButtonStyles
          }}
        >
          Yes 💖
        </button>

        <button
          aria-label="No"
          onMouseEnter={handleNoHover}
          style={{
            position: 'absolute',
            ...noButtonStyles,
            background: '#fff',
            color: '#1f102b',
            border: '2px solid rgba(31,16,43,0.1)',
            minWidth: '160px'
          }}
        >
          No 🙈
        </button>
      </div>
    </div>
  );
}
