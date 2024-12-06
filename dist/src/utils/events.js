// Event handling utilities
export function addDragEvents(element, handlers) {
  let isDragging = false;

  element.addEventListener('mousedown', (e) => {
    e.preventDefault();
    isDragging = true;
    handlers.onStart(e);
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    handlers.onMove(e);
  });

  document.addEventListener('mouseup', () => {
    if (!isDragging) return;
    isDragging = false;
    handlers.onEnd?.();
  });

  // Touch events
  element.addEventListener('touchstart', (e) => {
    e.preventDefault();
    isDragging = true;
    const touch = e.touches[0];
    handlers.onStart(touch);
  }, { passive: false });

  element.addEventListener('touchmove', (e) => {
    e.preventDefault();
    if (!isDragging) return;
    const touch = e.touches[0];
    handlers.onMove(touch);
  }, { passive: false });

  element.addEventListener('touchend', (e) => {
    e.preventDefault();
    isDragging = false;
    handlers.onEnd?.();
  });

  return {
    cleanup: () => {
      element.removeEventListener('mousedown', handlers.onStart);
      document.removeEventListener('mousemove', handlers.onMove);
      document.removeEventListener('mouseup', handlers.onEnd);
      element.removeEventListener('touchstart', handlers.onStart);
      element.removeEventListener('touchmove', handlers.onMove);
      element.removeEventListener('touchend', handlers.onEnd);
    }
  };
}