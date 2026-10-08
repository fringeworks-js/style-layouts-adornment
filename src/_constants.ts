import type { AlignX, AlignY, Side, Sizing } from './constants';

/**
 * 装飾のクラス
 */
export type ItemClassNames = {
  item: string;
  side: Record<Side, string>;
  alignX: Record<AlignX, string>;
  alignY: Record<AlignY, string>;
};

/**
 * 大きさの決め方のクラス
 */
export type SizingClassNames = {
  x: Record<Sizing, string>;
  y: Record<Sizing, string>;
};

/**
 * 間隔・距離の変数
 */
export type SpacingVars = {
  gap: { x: `--${string}`; y: `--${string}` };
  inset: { x: `--${string}`; y: `--${string}` };
};

// ===== affix =====

/**
 * レイアウト種別: affix
 */
export const clsAffix = 'frg-layout-affix';

/**
 * affix: 大きさの決め方(横方向): 本体をコンテナに合わせる
 */
export const clsAffixSizingXFill = 'frg-layout-affix-sizingX-fill';

/**
 * affix: 大きさの決め方(横方向): 本体の大きさを保つ
 */
export const clsAffixSizingXKeep = 'frg-layout-affix-sizingX-keep';

/**
 * affix: 大きさの決め方(横方向): コンテナを本体に合わせる
 */
export const clsAffixSizingXHug = 'frg-layout-affix-sizingX-hug';

/**
 * affix: 大きさの決め方(縦方向): 本体をコンテナに合わせる
 */
export const clsAffixSizingYFill = 'frg-layout-affix-sizingY-fill';

/**
 * affix: 大きさの決め方(縦方向): 本体の大きさを保つ
 */
export const clsAffixSizingYKeep = 'frg-layout-affix-sizingY-keep';

/**
 * affix: 大きさの決め方(縦方向): コンテナを本体に合わせる
 */
export const clsAffixSizingYHug = 'frg-layout-affix-sizingY-hug';

/**
 * affix: 装飾
 */
export const clsAffixItem = 'frg-layout-affix-item';

/**
 * affix: 装飾の配置: 上
 */
export const clsAffixSideTop = 'frg-layout-affix-side-top';

/**
 * affix: 装飾の配置: 下
 */
export const clsAffixSideBottom = 'frg-layout-affix-side-bottom';

/**
 * affix: 装飾の配置: 左
 */
export const clsAffixSideLeft = 'frg-layout-affix-side-left';

/**
 * affix: 装飾の配置: 右
 */
export const clsAffixSideRight = 'frg-layout-affix-side-right';

/**
 * affix: 装飾の配置: 内側
 */
export const clsAffixSideInside = 'frg-layout-affix-side-inside';

/**
 * affix: 横位置: 左
 */
export const clsAffixAlignXLeft = 'frg-layout-affix-alignX-left';

/**
 * affix: 横位置: 中央
 */
export const clsAffixAlignXCenter = 'frg-layout-affix-alignX-center';

/**
 * affix: 横位置: 右
 */
export const clsAffixAlignXRight = 'frg-layout-affix-alignX-right';

/**
 * affix: 縦位置: 上
 */
export const clsAffixAlignYTop = 'frg-layout-affix-alignY-top';

/**
 * affix: 縦位置: 中央
 */
export const clsAffixAlignYMiddle = 'frg-layout-affix-alignY-middle';

/**
 * affix: 縦位置: 下
 */
export const clsAffixAlignYBottom = 'frg-layout-affix-alignY-bottom';

/**
 * 変数\
 * affix: 間隔: 横方向
 */
export const varAffixGapX = '--frg-layout-affix-gapX';

/**
 * 変数\
 * affix: 間隔: 縦方向
 */
export const varAffixGapY = '--frg-layout-affix-gapY';

/**
 * 変数\
 * affix: 本体の端からの距離: 横方向
 */
export const varAffixInsetX = '--frg-layout-affix-insetX';

/**
 * 変数\
 * affix: 本体の端からの距離: 縦方向
 */
export const varAffixInsetY = '--frg-layout-affix-insetY';

/**
 * affix: 大きさの決め方のクラス
 */
export const clsAffixSizingNames: SizingClassNames = {
  x: {
    fill: clsAffixSizingXFill,
    keep: clsAffixSizingXKeep,
    hug: clsAffixSizingXHug,
  },
  y: {
    fill: clsAffixSizingYFill,
    keep: clsAffixSizingYKeep,
    hug: clsAffixSizingYHug,
  },
};

/**
 * affix: 装飾のクラス
 */
export const clsAffixItemNames: ItemClassNames = {
  item: clsAffixItem,
  side: {
    top: clsAffixSideTop,
    bottom: clsAffixSideBottom,
    left: clsAffixSideLeft,
    right: clsAffixSideRight,
    inside: clsAffixSideInside,
  },
  alignX: {
    left: clsAffixAlignXLeft,
    center: clsAffixAlignXCenter,
    right: clsAffixAlignXRight,
  },
  alignY: {
    top: clsAffixAlignYTop,
    middle: clsAffixAlignYMiddle,
    bottom: clsAffixAlignYBottom,
  },
};

/**
 * affix: 間隔・距離の変数
 */
export const varAffixSpacing: SpacingVars = {
  gap: { x: varAffixGapX, y: varAffixGapY },
  inset: { x: varAffixInsetX, y: varAffixInsetY },
};

// ===== sticker =====

/**
 * レイアウト種別: sticker
 */
export const clsSticker = 'frg-layout-sticker';

/**
 * sticker: 大きさの決め方(横方向): 本体をコンテナに合わせる
 */
export const clsStickerSizingXFill = 'frg-layout-sticker-sizingX-fill';

/**
 * sticker: 大きさの決め方(横方向): 本体の大きさを保つ
 */
export const clsStickerSizingXKeep = 'frg-layout-sticker-sizingX-keep';

/**
 * sticker: 大きさの決め方(横方向): コンテナを本体に合わせる
 */
export const clsStickerSizingXHug = 'frg-layout-sticker-sizingX-hug';

/**
 * sticker: 大きさの決め方(縦方向): 本体をコンテナに合わせる
 */
export const clsStickerSizingYFill = 'frg-layout-sticker-sizingY-fill';

/**
 * sticker: 大きさの決め方(縦方向): 本体の大きさを保つ
 */
export const clsStickerSizingYKeep = 'frg-layout-sticker-sizingY-keep';

/**
 * sticker: 大きさの決め方(縦方向): コンテナを本体に合わせる
 */
export const clsStickerSizingYHug = 'frg-layout-sticker-sizingY-hug';

/**
 * sticker: 装飾
 */
export const clsStickerItem = 'frg-layout-sticker-item';

/**
 * sticker: 装飾の配置: 上
 */
export const clsStickerSideTop = 'frg-layout-sticker-side-top';

/**
 * sticker: 装飾の配置: 下
 */
export const clsStickerSideBottom = 'frg-layout-sticker-side-bottom';

/**
 * sticker: 装飾の配置: 左
 */
export const clsStickerSideLeft = 'frg-layout-sticker-side-left';

/**
 * sticker: 装飾の配置: 右
 */
export const clsStickerSideRight = 'frg-layout-sticker-side-right';

/**
 * sticker: 装飾の配置: 内側
 */
export const clsStickerSideInside = 'frg-layout-sticker-side-inside';

/**
 * sticker: 横位置: 左
 */
export const clsStickerAlignXLeft = 'frg-layout-sticker-alignX-left';

/**
 * sticker: 横位置: 中央
 */
export const clsStickerAlignXCenter = 'frg-layout-sticker-alignX-center';

/**
 * sticker: 横位置: 右
 */
export const clsStickerAlignXRight = 'frg-layout-sticker-alignX-right';

/**
 * sticker: 縦位置: 上
 */
export const clsStickerAlignYTop = 'frg-layout-sticker-alignY-top';

/**
 * sticker: 縦位置: 中央
 */
export const clsStickerAlignYMiddle = 'frg-layout-sticker-alignY-middle';

/**
 * sticker: 縦位置: 下
 */
export const clsStickerAlignYBottom = 'frg-layout-sticker-alignY-bottom';

/**
 * 変数\
 * sticker: 間隔: 横方向
 */
export const varStickerGapX = '--frg-layout-sticker-gapX';

/**
 * 変数\
 * sticker: 間隔: 縦方向
 */
export const varStickerGapY = '--frg-layout-sticker-gapY';

/**
 * 変数\
 * sticker: 本体の端からの距離: 横方向
 */
export const varStickerInsetX = '--frg-layout-sticker-insetX';

/**
 * 変数\
 * sticker: 本体の端からの距離: 縦方向
 */
export const varStickerInsetY = '--frg-layout-sticker-insetY';

/**
 * sticker: 大きさの決め方のクラス
 */
export const clsStickerSizingNames: SizingClassNames = {
  x: {
    fill: clsStickerSizingXFill,
    keep: clsStickerSizingXKeep,
    hug: clsStickerSizingXHug,
  },
  y: {
    fill: clsStickerSizingYFill,
    keep: clsStickerSizingYKeep,
    hug: clsStickerSizingYHug,
  },
};

/**
 * sticker: 装飾のクラス
 */
export const clsStickerItemNames: ItemClassNames = {
  item: clsStickerItem,
  side: {
    top: clsStickerSideTop,
    bottom: clsStickerSideBottom,
    left: clsStickerSideLeft,
    right: clsStickerSideRight,
    inside: clsStickerSideInside,
  },
  alignX: {
    left: clsStickerAlignXLeft,
    center: clsStickerAlignXCenter,
    right: clsStickerAlignXRight,
  },
  alignY: {
    top: clsStickerAlignYTop,
    middle: clsStickerAlignYMiddle,
    bottom: clsStickerAlignYBottom,
  },
};

/**
 * sticker: 間隔・距離の変数
 */
export const varStickerSpacing: SpacingVars = {
  gap: { x: varStickerGapX, y: varStickerGapY },
  inset: { x: varStickerInsetX, y: varStickerInsetY },
};
