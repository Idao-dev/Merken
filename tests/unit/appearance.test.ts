import { describe, expect, it } from "vitest";
import { normalizePanelTransparency, panelAppearanceForTransparency } from "../../src/app/appearance";

describe("panel transparency", () => {
  it("migrates legacy transparency levels", () => {
    expect(normalizePanelTransparency("none")).toBe(0);
    expect(normalizePanelTransparency("light")).toBe(25);
    expect(normalizePanelTransparency("medium")).toBe(50);
    expect(normalizePanelTransparency("strong")).toBe(75);
    expect(normalizePanelTransparency("max")).toBe(100);
  });

  it("clamps and rounds numeric values to five-point steps", () => {
    expect(normalizePanelTransparency(undefined)).toBe(50);
    expect(normalizePanelTransparency(-20)).toBe(0);
    expect(normalizePanelTransparency(63)).toBe(65);
    expect(normalizePanelTransparency(140)).toBe(100);
    expect(normalizePanelTransparency(Number.NaN)).toBe(50);
    expect(normalizePanelTransparency("invalid")).toBe(50);
  });

  it("calculates continuous panel appearance values", () => {
    expect(panelAppearanceForTransparency(0)).toEqual({
      backgroundOpacity: 98,
      backdropBlur: 0,
      saturation: 1
    });
    expect(panelAppearanceForTransparency(50)).toEqual({
      backgroundOpacity: 63,
      backdropBlur: 9,
      saturation: 1.13
    });
    expect(panelAppearanceForTransparency(100)).toEqual({
      backgroundOpacity: 28,
      backdropBlur: 18,
      saturation: 1.25
    });
  });
});
