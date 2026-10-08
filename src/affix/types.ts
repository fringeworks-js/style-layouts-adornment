import type {
  GapOptions,
  HugOptions,
  InsetOptions,
  ItemInsideOptions,
  ItemLeftRightOptions,
  ItemTopBottomOptions,
} from '../_types';

export type { HugOptions } from '../_types';

/**
 * affixのオプション
 */
export type AffixOptions = HugOptions & GapOptions & InsetOptions;

/**
 * affixで本体の上下に配置する装飾のオプション
 */
export type AffixItemTopBottomOptions = ItemTopBottomOptions;

/**
 * affixで本体の左右に配置する装飾のオプション
 */
export type AffixItemLeftRightOptions = ItemLeftRightOptions;

/**
 * affixで本体の内側に重ねる装飾のオプション
 */
export type AffixItemInsideOptions = ItemInsideOptions;

/**
 * affixItemのオプション
 */
export type AffixItemOptions =
  | AffixItemTopBottomOptions
  | AffixItemLeftRightOptions
  | AffixItemInsideOptions;
