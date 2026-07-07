import { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * CustomCursor — GSAP-powered custom cursor with dot + ring + hover scaling.
 * Hidden on touch devices.
 */
export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Check for touch device
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      dot.style.display = 'none';
      ring.style.display = 'none';
      return;
    }

    const moveCursor = (e) => {
      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power2.out',
      });
      gsap.to(ring, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseEnter = () => {
      gsap.to(ring, { scale: 2, opacity: 0.5, duration: 0.3, borderColor: '#2563EB' });
      gsap.to(dot, { scale: 0.5, duration: 0.3 });
    };

    const handleMouseLeave = () => {
      gsap.to(ring, { scale: 1, opacity: 1, duration: 0.3, borderColor: 'rgba(255,255,255,0.5)' });
      gsap.to(dot, { scale: 1, duration: 0.3 });
    };

    window.addEventListener('mousemove', moveCursor);

    // Observe for interactive elements
    const interactiveSelector = 'a, button, input, textarea, select, [role="button"], [data-cursor-hover]';
    const addListeners = () => {
      document.querySelectorAll(interactiveSelector).forEach((el) => {
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });
    };

    addListeners();
    const observer = new MutationObserver(addListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Cursor Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none hidden md:block"
        style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #2563EB, #7C3AED)',
          transform: 'translate(-50%, -50%)',
        }}
      />
      {/* Cursor Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none hidden md:block"
        style={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          border: '1.5px solid rgba(255,255,255,0.5)',
          transform: 'translate(-50%, -50%)',
        }}
      />
    </>
  );
}
