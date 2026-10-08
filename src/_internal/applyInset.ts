import type { SpacingVars } from '../_constants';
import type { LayoutStyle } from '../types';
import hasValue from './hasValue';
import unit from './unit';

/**
 * 本体の端から内側の装飾までの距離の適用
 * @param result
 * @param vars レイアウトの変数
 * @param inset
 * @param insetX
 * @param insetY
 */
export default function applyInset(
  result: LayoutStyle,
  vars: SpacingVars,
  inset: number | null | undefined,
  insetX: number | null | undefined,
  insetY: number | null | undefined,
): void {
  insetX = insetX ?? inset;
  if (hasValue(insetX)) {
    // 横方向の距離
    result.style ??= {};
    result.style[vars.inset.x] = unit(insetX);
  }
  insetY = insetY ?? inset;
  if (hasValue(insetY)) {
    // 縦方向の距離
    result.style ??= {};
    result.style[vars.inset.y] = unit(insetY);
  }
}
