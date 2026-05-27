export interface KeycapPresentation {
  label: string;
  accessibleLabel: string;
  isSymbol: boolean;
  className: string;
}

const keycapSymbols: Record<string, string> = {
  Tab: "↹",
  Shift: "⇧",
  Enter: "⏎",
  Backspace: "⌫",
  Delete: "⌦",
  Space: "␣",
  Left: "←",
  Right: "→",
  Up: "↑",
  Down: "↓",
  Arrow: "↑↓←→",
  Arrows: "↑↓←→"
};

const keycapClasses: Record<string, string> = {
  Tab: "key-tab",
  Space: "key-space"
};

export function keycapPresentation(key: string): KeycapPresentation {
  const symbol = keycapSymbols[key];

  if (!symbol) {
    return {
      label: key,
      accessibleLabel: key,
      isSymbol: false,
      className: ""
    };
  }

  return {
    label: symbol,
    accessibleLabel: key,
    isSymbol: true,
    className: keycapClasses[key] ?? ""
  };
}
