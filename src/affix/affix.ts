import { clsAffix, clsAffixSizingNames, varAffixSpacing } from '../_constants';
import applyGap from '../_internal/applyGap';
import applyInset from '../_internal/applyInset';
import applySizing from '../_internal/applySizing';
import type { LayoutStyle } from '../types';
import type { AffixOptions } from './types';

/**
 * affixのコンテナ
 *
 * - affixItemを適用していない子要素を本体として扱う
 * - sizingX / sizingY を指定しない場合、本体には配置(grid-area / align-self)以外のスタイルを適用しない
 * - sizingX / sizingY を指定した場合は、本体とコンテナの大きさを指定の方法で決める
 * - gap / inset は全ての装飾のデフォルト値になる
 */
const affix = (options: AffixOptions = {}): LayoutStyle => {
  const { sizingX, sizingY, gap, gapX, gapY, inset, insetX, insetY } = options;
  const result: LayoutStyle = {
    className: clsAffix,
    style: {},
  };

  // 大きさの決め方
  applySizing(result, clsAffixSizingNames, sizingX, sizingY);

  // 本体と外側の装飾との間隔
  applyGap(result, varAffixSpacing, gap, gapX, gapY);

  // 本体の端から内側の装飾までの距離
  applyInset(result, varAffixSpacing, inset, insetX, insetY);

  return result;
};
export default affix;
