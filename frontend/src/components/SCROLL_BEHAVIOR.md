# Scroll Behavior Implementation

This document describes the scroll behavior implementation for the Home Bonzenga application.

## Components

### 1. ScrollManager
**Location**: `src/components/ScrollManager.tsx`

A flexible component that automatically scrolls to the top when routes change.

**Props**:
- `behavior`: 'smooth' | 'instant' (default: 'smooth')
- `delay`: number in milliseconds (default: 100)
- `enabled`: boolean (default: true)

**Usage**:
```tsx
<ScrollManager behavior="smooth" delay={100} />
```

### 2. ScrollToTop
**Location**: `src/components/ScrollToTop.tsx`

Simple component that scrolls to top with smooth behavior and a small delay.

### 3. ScrollToTopInstant
**Location**: `src/components/ScrollToTopInstant.tsx`

Component that instantly scrolls to top without animation.

## Hooks

### useScrollToTop
**Location**: `src/hooks/useScrollToTop.ts`

Custom hook providing scroll utilities:

```tsx
const { scrollToTop, scrollToElement, scrollToSection } = useScrollToTop();

// Scroll to top
scrollToTop({ behavior: 'smooth', delay: 100 });

// Scroll to element by ID
scrollToElement('my-element', { behavior: 'smooth' });

// Scroll to section by selector
scrollToSection('#services', { behavior: 'smooth' });
```

## Implementation

The scroll behavior is implemented globally in `App.tsx`:

```tsx
<BrowserRouter>
  <ScrollManager behavior="smooth" delay={100} />
  <AuthProvider>
    {/* Routes */}
  </AuthProvider>
</BrowserRouter>
```

## Features

1. **Automatic Route Scrolling**: Automatically scrolls to top when navigating between routes
2. **Smooth Animation**: Uses smooth scrolling for better UX
3. **Configurable**: Can be configured for different behaviors (smooth/instant)
4. **Delay Support**: Small delay ensures page has rendered before scrolling
5. **Section Scrolling**: Existing section scrolling on landing page is preserved

## Browser Support

- Modern browsers support smooth scrolling
- Falls back to instant scrolling on older browsers
- Works with all major browsers (Chrome, Firefox, Safari, Edge)

## Performance

- Minimal performance impact
- Uses native browser APIs
- Cleanup timers to prevent memory leaks
- Lightweight implementation
