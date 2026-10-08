import type { SpacingVars } from '../_constants';
import type { LayoutStyle } from '../types';
import hasValue from './hasValue';
import unit from './unit';

/**
 * 本体と外側の装飾との間隔の適用
 * @param result
 * @param vars レイアウトの変数
 * @param gap
 * @param gapX
 * @param gapY
 */
export default function applyGap(
  result: LayoutStyle,
  vars: SpacingVars,
  gap: number | null | undefined,
  gapX: number | null | undefined,
  gapY: number | null | undefined,
): void {
  gapX = gapX ?? gap;
  if (hasValue(gapX)) {
    // 横方向の間隔
    result.style ??= {};
    result.style[vars.gap.x] = unit(gapX);
  }
  gapY = gapY ?? gap;
  if (hasValue(gapY)) {
    // 縦方向の間隔
    result.style ??= {};
    result.style[vars.gap.y] = unit(gapY);
  }
}
