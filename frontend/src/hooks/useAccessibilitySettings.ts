import { createContext, useContext, useEffect, useState, ReactNode, createElement } from 'react';

type TextSize = 'normal' | 'large' | 'largest';
type ContrastMode = 'normal' | 'high';

interface AccessibilitySettings {
  textSize: TextSize;
  contrastMode: ContrastMode;
  setTextSize: (size: TextSize) => void;
  setContrastMode: (mode: ContrastMode) => void;
}

const AccessibilityContext = createContext<AccessibilitySettings | undefined>(undefined);

interface AccessibilityProviderProps {
  children: ReactNode;
}

export function AccessibilityProvider(props: AccessibilityProviderProps) {
  const [textSize, setTextSizeState] = useState<TextSize>(() => {
    const saved = localStorage.getItem('accessibility-text-size');
    return (saved as TextSize) || 'normal';
  });

  const [contrastMode, setContrastModeState] = useState<ContrastMode>(() => {
    const saved = localStorage.getItem('accessibility-contrast-mode');
    return (saved as ContrastMode) || 'normal';
  });

  const setTextSize = (size: TextSize) => {
    setTextSizeState(size);
    localStorage.setItem('accessibility-text-size', size);
  };

  const setContrastMode = (mode: ContrastMode) => {
    setContrastModeState(mode);
    localStorage.setItem('accessibility-contrast-mode', mode);
  };

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('text-normal', 'text-large', 'text-largest');
    root.classList.add(`text-${textSize}`);
  }, [textSize]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('contrast-normal', 'contrast-high');
    root.classList.add(`contrast-${contrastMode}`);
  }, [contrastMode]);

  const value: AccessibilitySettings = {
    textSize,
    contrastMode,
    setTextSize,
    setContrastMode,
  };

  return createElement(
    AccessibilityContext.Provider,
    { value },
    props.children
  );
}

export function useAccessibilitySettings(): AccessibilitySettings {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibilitySettings must be used within AccessibilityProvider');
  }
  return context;
}
