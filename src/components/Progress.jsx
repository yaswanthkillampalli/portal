import React, { useEffect, useRef, useState } from 'react';
import '../styles/Progress.css';

const easeOutQuad = (t) => t * (2 - t);

const Progress = ({
  value,              // Progress percentage (0 to 100)
  displayValue = null, // Value to show as number (e.g. credits)
  suffix = '%',
  duration = 1000
}) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;

  const circleRef = useRef(null);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [currentDisplay, setCurrentDisplay] = useState(0);
  const animationRef = useRef(null);

  useEffect(() => {
    if (!circleRef.current) return;

    cancelAnimationFrame(animationRef.current);
    const startTime = performance.now();

    const targetDisplay = displayValue !== null ? Number(displayValue) : value;

    const animate = (time) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutQuad(progress);

      const animatedProgress = value * eased;
      const animatedDisplay = targetDisplay * eased;

      const offset = circumference - (animatedProgress / 100) * circumference;
      circleRef.current.style.strokeDashoffset = offset;

      setCurrentProgress(animatedProgress);
      setCurrentDisplay(animatedDisplay);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setCurrentProgress(value);
        setCurrentDisplay(targetDisplay);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationRef.current);
  }, [value, displayValue, duration]);

  // Format number cleanly
  const formattedText =
    displayValue !== null
      ? `${Math.round(currentDisplay)}`
      : `${Math.round(currentProgress)}${suffix}`;

  return (
    <div className="progress-container">
      <svg width="100%" height="100%" viewBox="0 0 100 100">
        <defs>
          <linearGradient id="gradient" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ebe134" />
            <stop offset="100%" stopColor="#34dceb" />
          </linearGradient>
        </defs>

        {/* Background Circle */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke="#eee"
          strokeWidth="10"
          fill="none"
        />

        {/* Foreground Circle */}
        <circle
          ref={circleRef}
          cx="50"
          cy="50"
          r={radius}
          stroke="url(#gradient)"
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
        />
      </svg>

      <div className="progress-text">
        {formattedText}{displayValue !== null ?'' : ''}
      </div>
    </div>
  );
};

export default Progress;
