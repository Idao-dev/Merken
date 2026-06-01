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
  Home: "⇱",
  End: "⇲",
  Left: "←",
  Right: "→",
  Up: "↑",
  Down: "↓",
  Arrow: "↑↓←→",
  Arrows: "↑↓←→",
  LeftClick: "Left click",
  RightClick: "Right click",
  Wheel: "Wheel",
  Drag: "Drag"
};

const keycapAccessibleLabels: Record<string, string> = {
  LeftClick: "Left click",
  RightClick: "Right click",
  Wheel: "Mouse wheel",
  Drag: "Drag"
};

const keycapClasses: Record<string, string> = {
  Tab: "key-tab",
  Space: "key-space",
  LeftClick: "key-mouse key-mouse-left",
  RightClick: "key-mouse key-mouse-right",
  Wheel: "key-mouse key-mouse-wheel",
  Drag: "key-mouse key-mouse-drag"
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
    accessibleLabel: keycapAccessibleLabels[key] ?? key,
    isSymbol: true,
    className: keycapClasses[key] ?? ""
  };
}
