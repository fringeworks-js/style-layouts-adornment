import type { SpacingVars } from '../_constants';
import type { GapOptions, InsetOptions } from '../_types';
import type { LayoutStyle } from '../types';
import resolveValue from './resolveValue';
import unit from './unit';

/**
 * コンテナの間隔・距離の適用
 *
 * - 全ての装飾のデフォルト値として、未指定でも常に出力する（既定値は0）
 * - 既定値はCSSで宣言せず、TS側に置く（@fringeworks/style-layouts と同じ方針）
 * - コンテナと装飾を兼ねる要素では、この値が親のコンテナの値を隠す（CSSの制約。READMEに記載）
 * @param result
 * @param vars レイアウトの変数
 * @param options コンテナのオプション
 */
export default function applySpacing(
  result: LayoutStyle,
  vars: SpacingVars,
  options: GapOptions & InsetOptions,
): void {
  const { gap, gapX, gapY, inset, insetX, insetY } = options;
  result.style ??= {};
  // 本体と外側の装飾との間隔
  result.style[vars.gap.x] = unit(resolveValue(gapX, gap) ?? 0);
  result.style[vars.gap.y] = unit(resolveValue(gapY, gap) ?? 0);
  // 本体の端から内側の装飾までの距離
  result.style[vars.inset.x] = unit(resolveValue(insetX, inset) ?? 0);
  result.style[vars.inset.y] = unit(resolveValue(insetY, inset) ?? 0);
}
