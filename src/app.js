import { AXIS_COLORS } from './utils/colors.js';
import { getElement } from './utils/dom.js';
import { addDragEvents } from './utils/events.js';
import { store } from './state/store.js';
import { TabsManager } from './components/tabs.js';
import { TagsManager } from './components/tags.js';
import { MarkerManager } from './features/marker.js';
import { clearAnchors } from './features/anchors.js';
import { tooltipManager } from './features/tooltip.js';

export async function initializeApp() {
  try {
    // Initialize tooltip singleton
    tooltipManager.init();

    const elements = {
      marker: getElement('marker'),
      drinkName: getElement('drink-name'),
      drinkDescription: getElement('drink-description'),
      tabsContainer: getElement('tabs'),
      tagsContainer: getElement('tags-container'),
      xyPad: getElement('xy-pad')
    };

    const markerManager = new MarkerManager(
      elements.marker,
      elements.xyPad,
      elements.drinkName,
      elements.drinkDescription
    );

    const tagsManager = new TagsManager(elements.tagsContainer, elements.xyPad);

    const tabsManager = new TabsManager(elements.tabsContainer, (category) => {
      clearAnchors(elements.xyPad);
      tagsManager.update();
      markerManager.centerMarker();
    });

    // Initialize axis colors
    const axisElements = {
      left: document.querySelector('.x-left'),
      right: document.querySelector('.x-right'),
      top: document.querySelector('.y-top'),
      bottom: document.querySelector('.y-bottom')
    };

    Object.entries(axisElements).forEach(([position, element]) => {
      if (element) {
        element.style.color = AXIS_COLORS[position];
      }
    });

    // Initialize drag events with improved touch handling
    addDragEvents(elements.xyPad, {
      onStart: (e) => {
        const x = e.clientX ?? e.touches?.[0]?.clientX;
        const y = e.clientY ?? e.touches?.[0]?.clientY;
        if (x !== undefined && y !== undefined) {
          markerManager.handlePosition(x, y);
        }
      },
      onMove: (e) => {
        const x = e.clientX ?? e.touches?.[0]?.clientX;
        const y = e.clientY ?? e.touches?.[0]?.clientY;
        if (x !== undefined && y !== undefined) {
          markerManager.handlePosition(x, y);
        }
      }
    });

    // Load data and initialize UI
    await store.loadData();
    tabsManager.generate();
    tagsManager.update();

  } catch (error) {
    console.error('Failed to initialize application:', error);
  }
}