import { test as base } from '@playwright/test';

/**
 * Custom fixture that injects a visible cursor into the page.
 * Shows a red circle following the mouse, with a click animation effect.
 */
export const test = base.extend({
  page: async ({ page }, use) => {
    // Use addInitScript — runs before every page load automatically, no timing issues
    await page.addInitScript(() => {
      // Run after DOM is ready
      const injectCursor = () => {
        if (document.getElementById('pw-cursor')) return;

        const cursor = document.createElement('div');
        cursor.id = 'pw-cursor';
        Object.assign(cursor.style, {
          width: '20px',
          height: '20px',
          border: '3px solid #FF0000',
          borderRadius: '50%',
          position: 'fixed',
          top: '0',
          left: '0',
          zIndex: '999999',
          pointerEvents: 'none',
          transition: 'transform 0.1s ease',
          background: 'rgba(255, 0, 0, 0.2)',
          boxShadow: '0 0 8px rgba(255, 0, 0, 0.5)',
          transform: 'translate(-50%, -50%)',
        });
        document.body.appendChild(cursor);

        const ripple = document.createElement('div');
        ripple.id = 'pw-ripple';
        Object.assign(ripple.style, {
          width: '40px',
          height: '40px',
          border: '2px solid #FF0000',
          borderRadius: '50%',
          position: 'fixed',
          top: '0',
          left: '0',
          zIndex: '999998',
          pointerEvents: 'none',
          transform: 'translate(-50%, -50%) scale(0)',
          opacity: '0',
        });
        document.body.appendChild(ripple);

        const label = document.createElement('div');
        label.id = 'pw-label';
        Object.assign(label.style, {
          position: 'fixed',
          top: '10px',
          right: '10px',
          zIndex: '999999',
          background: 'rgba(0,0,0,0.8)',
          color: '#00FF88',
          padding: '8px 16px',
          borderRadius: '8px',
          fontFamily: 'monospace',
          fontSize: '13px',
          pointerEvents: 'none',
        });
        label.textContent = '🔴 Playwright Running...';
        document.body.appendChild(label);

        document.addEventListener('mousemove', (e) => {
          cursor.style.left = e.clientX + 'px';
          cursor.style.top = e.clientY + 'px';
        });

        document.addEventListener('mousedown', (e) => {
          ripple.style.left = e.clientX + 'px';
          ripple.style.top = e.clientY + 'px';
          ripple.style.transition = 'none';
          ripple.style.transform = 'translate(-50%, -50%) scale(0)';
          ripple.style.opacity = '1';
          requestAnimationFrame(() => {
            ripple.style.transition = 'transform 0.4s ease, opacity 0.4s ease';
            ripple.style.transform = 'translate(-50%, -50%) scale(2)';
            ripple.style.opacity = '0';
          });
          cursor.style.transform = 'translate(-50%, -50%) scale(0.7)';
          setTimeout(() => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
          }, 150);
        });
      };

      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectCursor);
      } else {
        injectCursor();
      }
    });

    await use(page);
  },
});

export { expect } from '@playwright/test';
