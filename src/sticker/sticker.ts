import { clsSticker, clsStickerHug, varStickerSpacing } from '../_constants';
import applyGap from '../_internal/applyGap';
import applyInset from '../_internal/applyInset';
import mergeClassName from '../_internal/mergeClassName';
import type { LayoutStyle } from '../types';
import type { StickerOptions } from './types';

/**
 * stickerのコンテナ
 *
 * - stickerItemを適用していない子要素を本体として扱う
 * - 本体にはスタイルを適用しない
 * - 装飾はコンテナを基準に絶対配置し、レイアウト上の場所を確保しない
 * - hugを指定した場合はコンテナの幅を本体に合わせる
 * - gap / inset は全ての装飾のデフォルト値になる
 */
const sticker = (options: StickerOptions = {}): LayoutStyle => {
  const { hug, gap, gapX, gapY, inset, insetX, insetY } = options;
  const result: LayoutStyle = {
    className: mergeClassName(clsSticker, hug ? clsStickerHug : null),
    style: {},
  };

  // 本体と外側の装飾との間隔
  applyGap(result, varStickerSpacing, gap, gapX, gapY);

  // 本体の端から内側の装飾までの距離
  applyInset(result, varStickerSpacing, inset, insetX, insetY);

  return result;
};
export default sticker;
