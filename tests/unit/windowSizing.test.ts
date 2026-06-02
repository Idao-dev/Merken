import { describe, expect, it } from "vitest";
import {
  canStartWindowDrag,
  chooseShortcutFit,
  fitLogicalWindowSize,
  isPointerOnScrollbar,
  physicalToLogicalSize,
  shortcutWindowSizeForRenderedPanel
} from "../../src/app/windowSizing";

describe("window sizing helpers", () => {
  it("converts physical work area sizes to logical sizes by scale factor", () => {
    expect(physicalToLogicalSize({ width: 1920, height: 1080 }, 0.75)).toEqual({ width: 2560, height: 1440 });
    expect(physicalToLogicalSize({ width: 1920, height: 1080 }, 1)).toEqual({ width: 1920, height: 1080 });
    expect(physicalToLogicalSize({ width: 1920, height: 1080 }, 1.25)).toEqual({ width: 1536, height: 864 });
    expect(physicalToLogicalSize({ width: 1920, height: 1080 }, 1.5)).toEqual({ width: 1280, height: 720 });
    expect(physicalToLogicalSize({ width: 1920, height: 1080 }, 1.75).width).toBeCloseTo(1097.14, 2);
    expect(physicalToLogicalSize({ width: 1920, height: 1080 }, 1.75).height).toBeCloseTo(617.14, 2);
    expect(physicalToLogicalSize({ width: 1920, height: 1080 }, 2)).toEqual({ width: 960, height: 540 });
    expect(physicalToLogicalSize({ width: 1920, height: 1080 }, 5)).toEqual({ width: 384, height: 216 });
    expect(physicalToLogicalSize({ width: 1920, height: 1080 }, 0)).toEqual({ width: 1920, height: 1080 });
  });

  it("clamps logical window sizes to max size and work area margins", () => {
    expect(
      fitLogicalWindowSize(
        { width: 980, height: 680 },
        { width: 980, height: 680 },
        { size: { width: 1920, height: 1080 }, scaleFactor: 2 },
        18
      )
    ).toEqual({ width: 924, height: 504 });

    expect(
      fitLogicalWindowSize(
        { width: 560, height: 742 },
        { width: 620, height: 760 },
        { size: { width: 3840, height: 2160 }, scaleFactor: 1 },
        18
      )
    ).toEqual({ width: 560, height: 742 });
  });

  it("chooses dense three-column shortcuts when 1920x1080 at 200 percent leaves little height for long content", () => {
    const fit = chooseShortcutFit(
      { categoryShortcutCounts: [30, 20], noteCount: 1 },
      { size: { width: 1920, height: 1080 }, scaleFactor: 2 }
    );

    expect(fit.density).toBe("dense");
    expect(fit.columnCount).toBe(3);
    expect(fit.desiredSize.width).toBeLessThanOrEqual(924);
    expect(fit.desiredSize.height).toBeLessThanOrEqual(504);
  });

  it("can stay comfortable and use three columns on large high-DPI work areas", () => {
    const fit = chooseShortcutFit(
      { categoryShortcutCounts: [40, 30], noteCount: 1 },
      { size: { width: 3840, height: 2160 }, scaleFactor: 2 }
    );

    expect(fit.density).toBe("comfortable");
    expect(fit.columnCount).toBe(3);
    expect(fit.desiredSize).toEqual({ width: 900, height: 760 });
  });

  it("keeps two columns when the content already fits well", () => {
    const fit = chooseShortcutFit(
      { categoryShortcutCounts: [4, 4], noteCount: 0 },
      { size: { width: 3840, height: 2160 }, scaleFactor: 2 }
    );

    expect(fit.columnCount).toBe(2);
    expect(fit.density).toBe("comfortable");
  });

  it("forces one shortcut column on very narrow logical work areas", () => {
    const fit = chooseShortcutFit(
      { categoryShortcutCounts: [12, 8], noteCount: 1 },
      { size: { width: 800, height: 600 }, scaleFactor: 2 }
    );

    expect(fit.columnCount).toBe(1);
    expect(fit.density).toBe("dense");
  });

  it("falls back to the comfortable default when monitor information is unavailable", () => {
    const fit = chooseShortcutFit({ categoryShortcutCounts: [30, 20], noteCount: 1 }, null);

    expect(fit.columnCount).toBe(2);
    expect(fit.density).toBe("comfortable");
    expect(fit.desiredSize).toEqual({ width: 620, height: 760 });
  });

  it("shrinks shortcut window height to the rendered panel to avoid transparent click blockers", () => {
    expect(shortcutWindowSizeForRenderedPanel({ width: 620, height: 760 }, { width: 620, height: 360 })).toEqual({
      width: 620,
      height: 360
    });
    expect(shortcutWindowSizeForRenderedPanel({ width: 620, height: 760 }, { width: 620, height: 900 })).toEqual({
      width: 620,
      height: 760
    });
    expect(shortcutWindowSizeForRenderedPanel({ width: 620, height: 760 }, null)).toEqual({ width: 620, height: 760 });
  });

  it("detects pointer hits on vertical scrollbars", () => {
    const target = {
      clientHeight: 200,
      clientWidth: 284,
      clientX: 292,
      clientY: 80,
      rect: { bottom: 200, left: 0, right: 300, top: 0 },
      scrollHeight: 500,
      scrollWidth: 284
    };

    expect(isPointerOnScrollbar(target)).toBe(true);
    expect(isPointerOnScrollbar({ ...target, clientX: 120 })).toBe(false);
  });

  it("detects pointer hits in the right safety zone for overlay scrollbars", () => {
    const target = {
      clientHeight: 200,
      clientWidth: 300,
      clientX: 294,
      clientY: 80,
      rect: { bottom: 200, left: 0, right: 300, top: 0 },
      scrollHeight: 500,
      scrollWidth: 300
    };

    expect(isPointerOnScrollbar(target)).toBe(true);
    expect(isPointerOnScrollbar({ ...target, clientX: 280 })).toBe(false);
  });

  it("does not treat the right edge as a scrollbar when content does not overflow", () => {
    expect(
      isPointerOnScrollbar({
        clientHeight: 200,
        clientWidth: 300,
        clientX: 294,
        clientY: 80,
        rect: { bottom: 200, left: 0, right: 300, top: 0 },
        scrollHeight: 200,
        scrollWidth: 300
      })
    ).toBe(false);
  });

  it("detects pointer hits on horizontal scrollbars", () => {
    const target = {
      clientHeight: 184,
      clientWidth: 300,
      clientX: 120,
      clientY: 192,
      rect: { bottom: 200, left: 0, right: 300, top: 0 },
      scrollHeight: 184,
      scrollWidth: 500
    };

    expect(isPointerOnScrollbar(target)).toBe(true);
    expect(isPointerOnScrollbar({ ...target, clientY: 120 })).toBe(false);
  });

  it("does not start window drag from interactive controls or scrollbar targets", () => {
    expect(canStartWindowDrag({ button: 0, isInteractiveTarget: false, isScrollbarTarget: false })).toBe(true);
    expect(canStartWindowDrag({ button: 0, isInteractiveTarget: true, isScrollbarTarget: false })).toBe(false);
    expect(canStartWindowDrag({ button: 0, isInteractiveTarget: false, isScrollbarTarget: true })).toBe(false);
    expect(canStartWindowDrag({ button: 2, isInteractiveTarget: false, isScrollbarTarget: false })).toBe(false);
  });
});
