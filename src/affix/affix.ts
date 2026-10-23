import { clsAffix, clsAffixSizingNames, varAffixSpacing } from '../_constants';
import applySizing from '../_internal/applySizing';
import applySpacing from '../_internal/applySpacing';
import type { LayoutStyle } from '../types';
import type { AffixOptions } from './types';

/**
 * affixのコンテナ
 *
 * - affixItemを適用していない子要素を本体として扱う
 * - sizingX / sizingY を指定しない場合、本体には配置(grid-area / align-self)以外のスタイルを適用しない
 * - sizingX / sizingY を指定した場合は、本体とコンテナの大きさを指定の方法で決める
 * - gap / inset は全ての装飾のデフォルト値になる（未指定の場合は0）
 */
const affix = (options: AffixOptions = {}): LayoutStyle => {
  const { sizingX, sizingY } = options;
  const result: LayoutStyle = {
    className: clsAffix,
    style: {},
  };

  // 大きさの決め方
  applySizing(result, clsAffixSizingNames, sizingX, sizingY);

  // 間隔・距離（全ての装飾のデフォルト値）
  applySpacing(result, varAffixSpacing, options);

  return result;
};
export default affix;
