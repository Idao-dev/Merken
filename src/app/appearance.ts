export interface PanelAppearance {
  backgroundOpacity: number;
  backdropBlur: number;
  saturation: number;
}

const legacyTransparencyValues: Record<string, number> = {
  none: 0,
  light: 25,
  medium: 50,
  strong: 75,
  max: 100
};

export function normalizePanelTransparency(value: unknown, fallback = 50): number {
  const legacyValue = typeof value === "string" ? legacyTransparencyValues[value] : undefined;
  const numericValue = legacyValue ?? (typeof value === "number" && Number.isFinite(value) ? value : fallback);
  const clampedValue = Math.min(100, Math.max(0, numericValue));

  return Math.round(clampedValue / 5) * 5;
}

export function panelAppearanceForTransparency(value: unknown): PanelAppearance {
  const transparency = normalizePanelTransparency(value) / 100;

  return {
    backgroundOpacity: round(98 - 70 * transparency),
    backdropBlur: round(18 * transparency),
    saturation: round(1 + 0.25 * transparency)
  };
}

function round(value: number): number {
  return Math.round(value * 100) / 100;
}
