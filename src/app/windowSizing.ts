export interface LogicalWindowSize {
  width: number;
  height: number;
}

export interface PhysicalWorkAreaSize {
  width: number;
  height: number;
}

export interface WindowWorkArea {
  size: PhysicalWorkAreaSize;
  scaleFactor: number;
}

export interface ScrollbarPointerTarget {
  clientHeight: number;
  clientWidth: number;
  clientX: number;
  clientY: number;
  rect: {
    bottom: number;
    left: number;
    right: number;
    top: number;
  };
  scrollHeight: number;
  scrollWidth: number;
}

export interface WindowDragPointerState {
  button: number;
  isInteractiveTarget: boolean;
  isScrollbarTarget: boolean;
}

export type ShortcutFitDensity = "comfortable" | "compact" | "dense";

export interface ShortcutFitContent {
  categoryShortcutCounts: number[];
  noteCount?: number;
}

export interface ShortcutFitState {
  density: ShortcutFitDensity;
  columnCount: 1 | 2 | 3;
  cellWidth: number;
  desiredSize: LogicalWindowSize;
}

export const windowWorkAreaMargin = 18;
export const scrollbarPointerSafetySize = 12;
export const settingsWindowPreferredSize: LogicalWindowSize = { width: 980, height: 680 };
export const shortcutFitDefaultState: ShortcutFitState = {
  density: "comfortable",
  columnCount: 2,
  cellWidth: 256,
  desiredSize: { width: 620, height: 760 }
};
const shortcutWindowTargetWidths: Record<ShortcutFitState["columnCount"], number> = {
  1: 430,
  2: 620,
  3: 900
};
const shortcutFitColumnGaps: Record<ShortcutFitDensity, number> = {
  comfortable: 20,
  compact: 16,
  dense: 12
};
const shortcutFitContentPaddingX: Record<ShortcutFitDensity, number> = {
  comfortable: 28,
  compact: 22,
  dense: 18
};
const shortcutFitRows: Record<ShortcutFitDensity, { row: number; header: number; sectionGap: number; note: number; paddingY: number }> = {
  comfortable: { row: 31, header: 22, sectionGap: 12, note: 34, paddingY: 22 },
  compact: { row: 27, header: 20, sectionGap: 9, note: 31, paddingY: 18 },
  dense: { row: 23, header: 18, sectionGap: 7, note: 28, paddingY: 14 }
};
const shortcutFitMinColumnWidths: Record<ShortcutFitDensity, number> = {
  comfortable: 256,
  compact: 230,
  dense: 205
};
const shortcutFitMinimumWindowWidths: Record<ShortcutFitState["columnCount"], number> = {
  1: 1,
  2: 560,
  3: 840
};

export function physicalToLogicalSize(size: PhysicalWorkAreaSize, scaleFactor: number): LogicalWindowSize {
  const normalizedScaleFactor = scaleFactor > 0 ? scaleFactor : 1;

  return {
    width: size.width / normalizedScaleFactor,
    height: size.height / normalizedScaleFactor
  };
}

export function logicalWorkAreaSize(workArea: WindowWorkArea | null | undefined, margin = windowWorkAreaMargin): LogicalWindowSize | null {
  if (!workArea) {
    return null;
  }

  const size = physicalToLogicalSize(workArea.size, workArea.scaleFactor);

  return {
    width: Math.max(1, size.width - margin * 2),
    height: Math.max(1, size.height - margin * 2)
  };
}

export function fitLogicalWindowSize(
  desiredSize: LogicalWindowSize,
  maxSize: LogicalWindowSize,
  workArea: WindowWorkArea | null | undefined,
  margin = windowWorkAreaMargin
): LogicalWindowSize {
  const availableSize = logicalWorkAreaSize(workArea, margin);
  const availableWidth = availableSize?.width ?? maxSize.width;
  const availableHeight = availableSize?.height ?? maxSize.height;

  return {
    width: Math.ceil(Math.max(1, Math.min(desiredSize.width, maxSize.width, availableWidth))),
    height: Math.ceil(Math.max(1, Math.min(desiredSize.height, maxSize.height, availableHeight)))
  };
}

export function chooseShortcutFit(content: ShortcutFitContent, workArea: WindowWorkArea | null | undefined): ShortcutFitState {
  if (!workArea) {
    return shortcutFitDefaultState;
  }

  const availableSize = logicalWorkAreaSize(workArea) ?? shortcutFitDefaultState.desiredSize;
  const availableHeight = availableSize.height;
  const density = shortcutFitDensityForAvailableSize(availableSize);
  const candidates = ([1, 2, 3] as const)
    .map((columnCount) => shortcutFitCandidate(content, availableSize, density, columnCount))
    .filter((candidate): candidate is ShortcutFitState & { estimatedHeight: number } => candidate !== null);
  const oneColumn = candidates.find((candidate) => candidate.columnCount === 1) ?? shortcutFitDefaultState;
  const twoColumns = candidates.find((candidate) => candidate.columnCount === 2);
  const threeColumns = candidates.find((candidate) => candidate.columnCount === 3);

  if (!twoColumns) {
    return stripShortcutFitEstimate(oneColumn);
  }

  if (
    threeColumns &&
    shouldUseThreeShortcutColumns(twoColumns.estimatedHeight, threeColumns.estimatedHeight, availableHeight, shortcutTotalCount(content))
  ) {
    return stripShortcutFitEstimate(threeColumns);
  }

  return stripShortcutFitEstimate(twoColumns);
}

export function sameShortcutFitState(left: ShortcutFitState, right: ShortcutFitState): boolean {
  return (
    left.density === right.density &&
    left.columnCount === right.columnCount &&
    Math.abs(left.cellWidth - right.cellWidth) < 1 &&
    Math.abs(left.desiredSize.width - right.desiredSize.width) < 1 &&
    Math.abs(left.desiredSize.height - right.desiredSize.height) < 1
  );
}

export function shortcutWindowSizeForRenderedPanel(
  desiredSize: LogicalWindowSize,
  renderedPanelSize: LogicalWindowSize | null | undefined
): LogicalWindowSize {
  if (!renderedPanelSize) {
    return desiredSize;
  }

  return {
    width: desiredSize.width,
    height: Math.ceil(Math.max(1, Math.min(desiredSize.height, renderedPanelSize.height)))
  };
}

function shortcutFitDensityForAvailableSize(availableSize: LogicalWindowSize): ShortcutFitDensity {
  if (availableSize.height < 620 || availableSize.width < 760) {
    return "dense";
  }

  if (availableSize.height < 760 || availableSize.width < 980) {
    return "compact";
  }

  return "comfortable";
}

function shortcutFitCandidate(
  content: ShortcutFitContent,
  availableSize: LogicalWindowSize,
  density: ShortcutFitDensity,
  columnCount: ShortcutFitState["columnCount"]
): (ShortcutFitState & { estimatedHeight: number }) | null {
  if (availableSize.width < shortcutFitMinimumWindowWidths[columnCount]) {
    return null;
  }

  const desiredWidth = Math.min(shortcutWindowTargetWidths[columnCount], availableSize.width);
  const desiredHeight = Math.min(760, availableSize.height);
  const cellWidth = shortcutCellWidth(desiredWidth, columnCount, density);

  if (cellWidth < shortcutFitMinColumnWidths[density] && columnCount > 1) {
    return null;
  }

  return {
    density,
    columnCount,
    cellWidth,
    desiredSize: {
      width: Math.ceil(desiredWidth),
      height: Math.ceil(Math.max(1, desiredHeight))
    },
    estimatedHeight: estimateShortcutFitContentHeight(content, columnCount, density)
  };
}

function shortcutCellWidth(windowWidth: number, columnCount: ShortcutFitState["columnCount"], density: ShortcutFitDensity): number {
  const panelMarginX = 18;
  const panelWidth = Math.max(1, windowWidth - panelMarginX);
  const contentWidth = Math.max(1, panelWidth - shortcutFitContentPaddingX[density]);
  const gaps = shortcutFitColumnGaps[density] * (columnCount - 1);

  return Math.floor(Math.max(1, (contentWidth - gaps) / columnCount));
}

function estimateShortcutFitContentHeight(
  content: ShortcutFitContent,
  columnCount: ShortcutFitState["columnCount"],
  density: ShortcutFitDensity
): number {
  const row = shortcutFitRows[density];
  const categoriesHeight = content.categoryShortcutCounts.reduce((height, shortcutCount) => {
    if (shortcutCount <= 0) {
      return height;
    }

    return height + row.header + Math.ceil(shortcutCount / columnCount) * row.row + row.sectionGap;
  }, 0);
  const noteHeight = Math.max(0, content.noteCount ?? 0) * row.note;

  return row.paddingY + categoriesHeight + noteHeight;
}

function shouldUseThreeShortcutColumns(twoColumnHeight: number, threeColumnHeight: number, availableHeight: number, shortcutCount: number): boolean {
  if (shortcutCount < 16) {
    return false;
  }

  if (twoColumnHeight <= availableHeight * 0.82) {
    return false;
  }

  return threeColumnHeight <= twoColumnHeight * 0.86 || (twoColumnHeight > availableHeight && threeColumnHeight < twoColumnHeight);
}

function shortcutTotalCount(content: ShortcutFitContent): number {
  return content.categoryShortcutCounts.reduce((total, count) => total + count, 0);
}

function stripShortcutFitEstimate(state: ShortcutFitState & { estimatedHeight?: number }): ShortcutFitState {
  return {
    density: state.density,
    columnCount: state.columnCount,
    cellWidth: state.cellWidth,
    desiredSize: state.desiredSize
  };
}

export function isPointerOnScrollbar(target: ScrollbarPointerTarget): boolean {
  const hasVerticalOverflow = target.scrollHeight > target.clientHeight;
  const hasHorizontalOverflow = target.scrollWidth > target.clientWidth;
  const verticalScrollbarStart = Math.min(target.rect.left + target.clientWidth, target.rect.right - scrollbarPointerSafetySize);
  const horizontalScrollbarStart = Math.min(target.rect.top + target.clientHeight, target.rect.bottom - scrollbarPointerSafetySize);
  const verticalScrollbar = hasVerticalOverflow && target.clientX >= verticalScrollbarStart;
  const horizontalScrollbar = hasHorizontalOverflow && target.clientY >= horizontalScrollbarStart;

  return (
    (verticalScrollbar && target.clientX <= target.rect.right && target.clientY >= target.rect.top && target.clientY <= target.rect.bottom) ||
    (horizontalScrollbar && target.clientY <= target.rect.bottom && target.clientX >= target.rect.left && target.clientX <= target.rect.right)
  );
}

export function canStartWindowDrag(state: WindowDragPointerState): boolean {
  return state.button === 0 && !state.isInteractiveTarget && !state.isScrollbarTarget;
}
