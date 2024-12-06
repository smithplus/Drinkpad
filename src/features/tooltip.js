class TooltipManager {
  constructor() {
    this.tooltip = null;
    this.touchDevice = 'ontouchstart' in window;
  }

  init() {
    if (this.tooltip) return;
    
    this.tooltip = document.createElement('div');
    this.tooltip.classList.add('tooltip');
    document.body.appendChild(this.tooltip);
    
    // Initialize position off-screen
    this.hide();

    // Add scroll listener to update tooltip position
    window.addEventListener('scroll', () => {
      if (this.lastEvent && this.lastText) {
        this.show(this.lastEvent, this.lastText);
      }
    });
  }

  show(event, text) {
    if (!this.tooltip || !event || !text) return;
    
    // Store last event and text for scroll updates
    this.lastEvent = event;
    this.lastText = text;
    
    const padding = 10;
    this.tooltip.textContent = text;
    
    // Get tooltip and anchor dimensions
    const tooltipRect = this.tooltip.getBoundingClientRect();
    const anchorRect = event.target.getBoundingClientRect();
    
    // Calculate position relative to anchor
    let left = anchorRect.left + (anchorRect.width / 2) - (tooltipRect.width / 2);
    let top = anchorRect.top - tooltipRect.height - padding;
    
    // Ensure tooltip stays within viewport bounds
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Adjust horizontal position if needed
    if (left < padding) {
      left = padding;
    } else if (left + tooltipRect.width > viewportWidth - padding) {
      left = viewportWidth - tooltipRect.width - padding;
    }
    
    // If tooltip would go above viewport, position it below the anchor
    if (top < padding) {
      top = anchorRect.bottom + padding;
    }
    
    // If tooltip would go below viewport, position it above the anchor
    if (top + tooltipRect.height > viewportHeight - padding) {
      top = anchorRect.top - tooltipRect.height - padding;
    }
    
    // Set position including scroll offset
    this.tooltip.style.left = `${left}px`;
    this.tooltip.style.top = `${top}px`;
    this.tooltip.style.opacity = '1';
  }

  hide() {
    if (!this.tooltip) return;
    this.tooltip.style.opacity = '0';
    this.lastEvent = null;
    this.lastText = null;
  }
}

// Export a singleton instance
export const tooltipManager = new TooltipManager();