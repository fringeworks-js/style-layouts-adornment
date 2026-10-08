import { clsAffix, clsAffixHug, varAffixSpacing } from '../_constants';
import applyGap from '../_internal/applyGap';
import applyInset from '../_internal/applyInset';
import mergeClassName from '../_internal/mergeClassName';
import type { LayoutStyle } from '../types';
import type { AffixOptions } from './types';

/**
 * affixのコンテナ
 *
 * - affixItemを適用していない子要素を本体として扱う
 * - 本体には配置(grid-area / align-self)以外のスタイルを適用しない
 * - hugを指定した場合はコンテナの幅を本体と装飾に合わせる
 * - gap / inset は全ての装飾のデフォルト値になる
 */
const affix = (options: AffixOptions = {}): LayoutStyle => {
  const { hug, gap, gapX, gapY, inset, insetX, insetY } = options;
  const result: LayoutStyle = {
    className: mergeClassName(clsAffix, hug ? clsAffixHug : null),
    style: {},
  };

  // 本体と外側の装飾との間隔
  applyGap(result, varAffixSpacing, gap, gapX, gapY);

  // 本体の端から内側の装飾までの距離
  applyInset(result, varAffixSpacing, inset, insetX, insetY);

  return result;
};
export default affix;
