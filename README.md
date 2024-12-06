# Explorador de Bebidas 🍸

Una aplicación web interactiva que ayuda a los usuarios a descubrir bebidas basadas en sus preferencias de sabor, utilizando un innovador sistema de mapeo en coordenadas X-Y.

## Lógica de Negocio

### Concepto Principal
El Explorador de Bebidas permite a los usuarios descubrir bebidas basándose en dos ejes principales:
- Eje X: Dulce (izquierda) ↔ Amargo (derecha)
- Eje Y: Potente (arriba) ↔ Ligero (abajo)

### Características Principales
1. **Mapa Interactivo**: Un pad XY que permite a los usuarios explorar bebidas moviendo un marcador.
2. **Categorías**: Tres tipos principales de bebidas:
   - 🍹 Cócteles
   - 🍺 Cervezas
   - 🍷 Vinos

3. **Sistema de Anclaje**: Los usuarios pueden marcar bebidas específicas en el mapa para referencia futura.
4. **Recomendaciones Dinámicas**: Las sugerencias se actualizan en tiempo real según la posición del marcador.

### Experiencia de Usuario
- Interfaz intuitiva con retroalimentación visual inmediata
- Diseño responsivo adaptado a dispositivos móviles y escritorio
- Sistema de etiquetas para acceso rápido a bebidas específicas
- Tooltips informativos para mejorar la navegación

## Implementación Técnica

### Arquitectura

```
src/
├── app.js                 # Punto de entrada de la aplicación
├── components/           # Componentes reutilizables
│   ├── tabs.js
│   └── tags.js
├── features/            # Características principales
│   ├── anchors.js
│   ├── drinks.js
│   ├── marker.js
│   └── tooltip.js
├── state/              # Gestión de estado
│   └── store.js
└── utils/             # Utilidades
    ├── colors.js
    ├── dom.js
    └── events.js
```

### Tecnologías Utilizadas
- JavaScript ES6+ (Vanilla)
- CSS3 con diseño responsivo
- HTML5
- Sistema de módulos ES6

### Patrones de Diseño
1. **Singleton**: Utilizado en el Store y TooltipManager
2. **Observer**: Implementado en el sistema de suscripciones del Store
3. **Factory**: Usado en la creación de elementos DOM
4. **Manager**: Patrón aplicado en la gestión de componentes

### Características Técnicas Destacadas

#### 1. Sistema de Estado
```javascript
class Store {
  constructor() {
    this.drinksData = {};
    this.currentCategory = '';
    this.subscribers = new Set();
  }
  // ...
}
```

#### 2. Sistema de Color Dinámico
- Cache de colores para optimización
- Interpolación de colores para transiciones suaves
- Cálculo de intensidad basado en la posición

#### 3. Gestión de Eventos
- Manejo unificado de eventos táctiles y mouse
- Sistema de prevención de scroll en móviles
- Gestión eficiente de eventos de arrastre

### Optimizaciones
1. **Rendimiento**
   - Cache de colores
   - Uso de requestAnimationFrame
   - Delegación de eventos
   - Lazy loading de componentes

2. **Memoria**
   - Limpieza de event listeners
   - Gestión eficiente de referencias
   - Reutilización de elementos DOM

3. **UX/UI**
   - Animaciones optimizadas
   - Feedback visual inmediato
   - Diseño responsivo eficiente

## Mantenimiento y Extensibilidad

### Agregar Nuevas Bebidas
El sistema está diseñado para ser data-driven. Para agregar nuevas bebidas:

1. Actualizar `drinks.json`:
```json
{
  "name": "Nueva Bebida",
  "description": "Descripción e ingredientes",
  "x": valor,  // Posición en eje dulce-amargo (-10 a 10)
  "y": valor   // Posición en eje potente-ligero (-10 a 10)
}
```

2. La UI se actualizará automáticamente sin necesidad de modificar código adicional.

### Agregar Nuevas Categorías
1. Añadir nueva categoría en `drinks.json`
2. El sistema de tabs y filtros se actualizará automáticamente

## Desarrollo Futuro
- Sistema de favoritos persistente
- Filtros avanzados por ingredientes
- Modo oscuro/claro
- Soporte para PWA
- Integración con API de recetas
- Sistema de recomendaciones basado en ML

## Licencia
© 2024 Explorador de Bebidas. Todos los derechos reservados.