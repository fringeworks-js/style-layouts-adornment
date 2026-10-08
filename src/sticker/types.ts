import type {
  GapOptions,
  HugOptions,
  InsetOptions,
  ItemInsideOptions,
  ItemLeftRightOptions,
  ItemTopBottomOptions,
} from '../_types';

/**
 * stickerのオプション
 */
export type StickerOptions = HugOptions & GapOptions & InsetOptions;

/**
 * stickerで本体の上下に配置する装飾のオプション
 */
export type StickerItemTopBottomOptions = ItemTopBottomOptions;

/**
 * stickerで本体の左右に配置する装飾のオプション
 */
export type StickerItemLeftRightOptions = ItemLeftRightOptions;

/**
 * stickerで本体の内側に重ねる装飾のオプション
 */
export type StickerItemInsideOptions = ItemInsideOptions;

/**
 * stickerItemのオプション
 */
export type StickerItemOptions =
  | StickerItemTopBottomOptions
  | StickerItemLeftRightOptions
  | StickerItemInsideOptions;
