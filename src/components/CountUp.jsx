import React, { useEffect, useRef, useState } from 'react';
import '../styles/CountUp.css';

// Easing function: easeOutQuad
const easeOutQuad = (t) => t * (2 - t);

const CountUp = ({ target = 100, duration = 1000, prefix = '', suffix = '' }) => {
  const [current, setCurrent] = useState(0);
  const frame = useRef(null);

  useEffect(() => {
    const startTime = performance.now();
    const isDecimal = !Number.isInteger(target);
    const decimalPlaces = isDecimal ? 2 : 0;

    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1); // from 0 to 1
      const easedProgress = easeOutQuad(progress);

      const rawValue = easedProgress * target;
      const value = Math.max(0, rawValue);

      const formattedValue = isDecimal
        ? parseFloat(value.toFixed(decimalPlaces))
        : Math.floor(value);

      setCurrent(formattedValue);

      if (progress < 1) {
        frame.current = requestAnimationFrame(animate);
      } else {
        setCurrent(target); // snap to target at the end
      }
    };

    frame.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame.current);
  }, [target, duration]);

  return (
    <div className="countup-text">
      {prefix}{current}{suffix}
    </div>
  );
};

export default CountUp;
