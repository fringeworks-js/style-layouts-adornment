import {
  clsSticker,
  clsStickerSizingNames,
  varStickerSpacing,
} from '../_constants';
import applySizing from '../_internal/applySizing';
import applySpacing from '../_internal/applySpacing';
import type { LayoutStyle } from '../types';
import type { StickerOptions } from './types';

/**
 * stickerのコンテナ
 *
 * - stickerItemを適用していない子要素を本体として扱う
 * - sizingX / sizingY を指定しない場合、本体にはスタイルを適用しない
 * - 装飾はコンテナ(keepの軸では本体の領域)を基準に絶対配置し、レイアウト上の場所を確保しない
 * - sizingX / sizingY を指定した場合は、本体とコンテナの大きさを指定の方法で決める
 * - gap / inset は全ての装飾のデフォルト値になる（未指定の場合は0）
 */
const sticker = (options: StickerOptions = {}): LayoutStyle => {
  const { sizingX, sizingY } = options;
  const result: LayoutStyle = {
    className: clsSticker,
    style: {},
  };

  // 大きさの決め方
  applySizing(result, clsStickerSizingNames, sizingX, sizingY);

  // 間隔・距離（全ての装飾のデフォルト値）
  applySpacing(result, varStickerSpacing, options);

  return result;
};
export default sticker;
