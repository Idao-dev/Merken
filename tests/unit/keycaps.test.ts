import { describe, expect, it } from "vitest";
import { keycapPresentation } from "../../src/app/keycaps";

describe("keycap presentation", () => {
  it("uses targeted symbols for functional keys", () => {
    expect(keycapPresentation("Tab")).toMatchObject({ label: "↹", accessibleLabel: "Tab", isSymbol: true, className: "key-tab" });
    expect(keycapPresentation("Shift")).toMatchObject({ label: "⇧", accessibleLabel: "Shift", isSymbol: true });
    expect(keycapPresentation("Enter")).toMatchObject({ label: "⏎", accessibleLabel: "Enter", isSymbol: true });
    expect(keycapPresentation("Backspace")).toMatchObject({ label: "⌫", accessibleLabel: "Backspace", isSymbol: true });
    expect(keycapPresentation("Delete")).toMatchObject({ label: "⌦", accessibleLabel: "Delete", isSymbol: true });
    expect(keycapPresentation("Space")).toMatchObject({ label: "␣", accessibleLabel: "Space", isSymbol: true, className: "key-space" });
    expect(keycapPresentation("Home")).toMatchObject({ label: "⇱", accessibleLabel: "Home", isSymbol: true });
    expect(keycapPresentation("End")).toMatchObject({ label: "⇲", accessibleLabel: "End", isSymbol: true });
    expect(keycapPresentation("Left")).toMatchObject({ label: "←", accessibleLabel: "Left", isSymbol: true });
    expect(keycapPresentation("Arrows")).toMatchObject({ label: "↑↓←→", accessibleLabel: "Arrows", isSymbol: true });
    expect(keycapPresentation("LeftClick")).toMatchObject({
      label: "Left click",
      accessibleLabel: "Left click",
      isSymbol: true,
      className: "key-mouse key-mouse-left"
    });
    expect(keycapPresentation("RightClick")).toMatchObject({
      label: "Right click",
      accessibleLabel: "Right click",
      isSymbol: true,
      className: "key-mouse key-mouse-right"
    });
    expect(keycapPresentation("Wheel")).toMatchObject({
      label: "Wheel",
      accessibleLabel: "Mouse wheel",
      isSymbol: true,
      className: "key-mouse key-mouse-wheel"
    });
    expect(keycapPresentation("Drag")).toMatchObject({
      label: "Drag",
      accessibleLabel: "Drag",
      isSymbol: true,
      className: "key-mouse key-mouse-drag"
    });
  });

  it("keeps Esc, Win and text modifiers as text", () => {
    expect(keycapPresentation("Esc")).toMatchObject({ label: "Esc", accessibleLabel: "Esc", isSymbol: false });
    expect(keycapPresentation("Win")).toMatchObject({ label: "Win", accessibleLabel: "Win", isSymbol: false });
    expect(keycapPresentation("Ctrl")).toMatchObject({ label: "Ctrl", accessibleLabel: "Ctrl", isSymbol: false });
    expect(keycapPresentation("Alt")).toMatchObject({ label: "Alt", accessibleLabel: "Alt", isSymbol: false });
    expect(keycapPresentation("F5")).toMatchObject({ label: "F5", accessibleLabel: "F5", isSymbol: false });
  });
});
