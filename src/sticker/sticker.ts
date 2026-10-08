import {
  clsSticker,
  clsStickerSizingNames,
  varStickerSpacing,
} from '../_constants';
import applyGap from '../_internal/applyGap';
import applyInset from '../_internal/applyInset';
import applySizing from '../_internal/applySizing';
import type { LayoutStyle } from '../types';
import type { StickerOptions } from './types';

/**
 * stickerのコンテナ
 *
 * - stickerItemを適用していない子要素を本体として扱う
 * - sizingX / sizingY を指定しない場合、本体にはスタイルを適用しない
 * - 装飾はコンテナを基準に絶対配置し、レイアウト上の場所を確保しない
 * - sizingX / sizingY を指定した場合は、本体とコンテナの大きさを指定の方法で決める
 * - gap / inset は全ての装飾のデフォルト値になる
 */
const sticker = (options: StickerOptions = {}): LayoutStyle => {
  const { sizingX, sizingY, gap, gapX, gapY, inset, insetX, insetY } = options;
  const result: LayoutStyle = {
    className: clsSticker,
    style: {},
  };

  // 大きさの決め方
  applySizing(result, clsStickerSizingNames, sizingX, sizingY);

  // 本体と外側の装飾との間隔
  applyGap(result, varStickerSpacing, gap, gapX, gapY);

  // 本体の端から内側の装飾までの距離
  applyInset(result, varStickerSpacing, inset, insetX, insetY);

  return result;
};
export default sticker;
