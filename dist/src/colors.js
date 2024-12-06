// Cache de colores para mejorar el rendimiento
const colorCache = new Map();

// Colores para los ejes
export const AXIS_COLORS = {
  left: '#ff69ff',    // Rosa neón para dulce
  right: '#4d4dff',   // Azul neón para amargo
  top: '#ff3333',     // Rojo neón para potente
  bottom: '#33ff33'   // Verde neón para ligero
};

// Función para ajustar la intensidad del color con caché
function adjustColorIntensity(color, intensity) {
  const cacheKey = `${color}-${intensity}`;
  if (colorCache.has(cacheKey)) {
    return colorCache.get(cacheKey);
  }

  const r = parseInt(color.substring(1, 3), 16);
  const g = parseInt(color.substring(3, 5), 16);
  const b = parseInt(color.substring(5, 7), 16);
  
  const brightnessBoost = 1.5;
  const minBrightness = 0.6;
  
  const adjustedR = Math.min(255, Math.round(r * (minBrightness + (intensity * brightnessBoost))));
  const adjustedG = Math.min(255, Math.round(g * (minBrightness + (intensity * brightnessBoost))));
  const adjustedB = Math.min(255, Math.round(b * (minBrightness + (intensity * brightnessBoost))));
  
  const result = `#${adjustedR.toString(16).padStart(2, '0')}${adjustedG.toString(16).padStart(2, '0')}${adjustedB.toString(16).padStart(2, '0')}`;
  colorCache.set(cacheKey, result);
  return result;
}

// Función para interpolar entre dos colores con caché
function interpolateColor(color1, color2, factor) {
  const cacheKey = `${color1}-${color2}-${factor}`;
  if (colorCache.has(cacheKey)) {
    return colorCache.get(cacheKey);
  }

  const r1 = parseInt(color1.substring(1, 3), 16);
  const g1 = parseInt(color1.substring(3, 5), 16);
  const b1 = parseInt(color1.substring(5, 7), 16);
  
  const r2 = parseInt(color2.substring(1, 3), 16);
  const g2 = parseInt(color2.substring(3, 5), 16);
  const b2 = parseInt(color2.substring(5, 7), 16);
  
  const r = Math.round(r1 + (r2 - r1) * factor);
  const g = Math.round(g1 + (g2 - g1) * factor);
  const b = Math.round(b1 + (b2 - b1) * factor);
  
  const result = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  colorCache.set(cacheKey, result);
  return result;
}

// Función para calcular la intensidad basada en la distancia al borde
function calculateIntensity(position) {
  const distanceFromCenter = Math.abs(position);
  return Math.min(1, Math.pow(distanceFromCenter / 5, 1.5));
}

// Función para obtener el color del marcador según su posición
export function getMarkerColor(x, y) {
  const cacheKey = `marker-${x}-${y}`;
  if (colorCache.has(cacheKey)) {
    return colorCache.get(cacheKey);
  }

  const normalizedX = x / 10;
  const normalizedY = y / 10;
  
  const xIntensity = calculateIntensity(normalizedX);
  const yIntensity = calculateIntensity(normalizedY);
  
  const maxIntensity = Math.max(xIntensity, yIntensity);
  
  const xInfluence = Math.abs(normalizedX);
  const yInfluence = Math.abs(normalizedY);
  const totalInfluence = xInfluence + yInfluence;
  
  const xWeight = totalInfluence > 0 ? xInfluence / totalInfluence : 0.5;
  const yWeight = totalInfluence > 0 ? yInfluence / totalInfluence : 0.5;
  
  const xColor = normalizedX < 0 ? AXIS_COLORS.left : AXIS_COLORS.right;
  const yColor = normalizedY < 0 ? AXIS_COLORS.top : AXIS_COLORS.bottom;
  
  const blendedColor = interpolateColor(xColor, yColor, yWeight);
  const result = adjustColorIntensity(blendedColor, 0.4 + (maxIntensity * 0.6));
  
  colorCache.set(cacheKey, result);
  return result;
}