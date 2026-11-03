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
export const clsAffix = 'frgs-layout-affix';

/**
 * affix: 大きさの決め方(横方向): 本体をコンテナに合わせる
 */
export const clsAffixSizingXFill = 'frgs-layout-affix-sizingX-fill';

/**
 * affix: 大きさの決め方(横方向): 本体の大きさを保つ
 */
export const clsAffixSizingXKeep = 'frgs-layout-affix-sizingX-keep';

/**
 * affix: 大きさの決め方(横方向): コンテナを本体に合わせる
 */
export const clsAffixSizingXHug = 'frgs-layout-affix-sizingX-hug';

/**
 * affix: 大きさの決め方(縦方向): 本体をコンテナに合わせる
 */
export const clsAffixSizingYFill = 'frgs-layout-affix-sizingY-fill';

/**
 * affix: 大きさの決め方(縦方向): 本体の大きさを保つ
 */
export const clsAffixSizingYKeep = 'frgs-layout-affix-sizingY-keep';

/**
 * affix: 大きさの決め方(縦方向): コンテナを本体に合わせる
 */
export const clsAffixSizingYHug = 'frgs-layout-affix-sizingY-hug';

/**
 * affix: 装飾
 */
export const clsAffixItem = 'frgs-layout-affix-item';

/**
 * affix: 装飾の配置: 上
 */
export const clsAffixSideTop = 'frgs-layout-affix-side-top';

/**
 * affix: 装飾の配置: 下
 */
export const clsAffixSideBottom = 'frgs-layout-affix-side-bottom';

/**
 * affix: 装飾の配置: 左
 */
export const clsAffixSideLeft = 'frgs-layout-affix-side-left';

/**
 * affix: 装飾の配置: 右
 */
export const clsAffixSideRight = 'frgs-layout-affix-side-right';

/**
 * affix: 装飾の配置: 内側
 */
export const clsAffixSideInside = 'frgs-layout-affix-side-inside';

/**
 * affix: 横位置: 左
 */
export const clsAffixAlignXLeft = 'frgs-layout-affix-alignX-left';

/**
 * affix: 横位置: 中央
 */
export const clsAffixAlignXCenter = 'frgs-layout-affix-alignX-center';

/**
 * affix: 横位置: 右
 */
export const clsAffixAlignXRight = 'frgs-layout-affix-alignX-right';

/**
 * affix: 縦位置: 上
 */
export const clsAffixAlignYTop = 'frgs-layout-affix-alignY-top';

/**
 * affix: 縦位置: 中央
 */
export const clsAffixAlignYMiddle = 'frgs-layout-affix-alignY-middle';

/**
 * affix: 縦位置: 下
 */
export const clsAffixAlignYBottom = 'frgs-layout-affix-alignY-bottom';

/**
 * 変数\
 * affix: 間隔: 横方向
 */
export const varAffixGapX = '--frgs-layout-affix-gapX';

/**
 * 変数\
 * affix: 間隔: 縦方向
 */
export const varAffixGapY = '--frgs-layout-affix-gapY';

/**
 * 変数\
 * affix: 本体の端からの距離: 横方向
 */
export const varAffixInsetX = '--frgs-layout-affix-insetX';

/**
 * 変数\
 * affix: 本体の端からの距離: 縦方向
 */
export const varAffixInsetY = '--frgs-layout-affix-insetY';

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
export const clsSticker = 'frgs-layout-sticker';

/**
 * sticker: 大きさの決め方(横方向): 本体をコンテナに合わせる
 */
export const clsStickerSizingXFill = 'frgs-layout-sticker-sizingX-fill';

/**
 * sticker: 大きさの決め方(横方向): 本体の大きさを保つ
 */
export const clsStickerSizingXKeep = 'frgs-layout-sticker-sizingX-keep';

/**
 * sticker: 大きさの決め方(横方向): コンテナを本体に合わせる
 */
export const clsStickerSizingXHug = 'frgs-layout-sticker-sizingX-hug';

/**
 * sticker: 大きさの決め方(縦方向): 本体をコンテナに合わせる
 */
export const clsStickerSizingYFill = 'frgs-layout-sticker-sizingY-fill';

/**
 * sticker: 大きさの決め方(縦方向): 本体の大きさを保つ
 */
export const clsStickerSizingYKeep = 'frgs-layout-sticker-sizingY-keep';

/**
 * sticker: 大きさの決め方(縦方向): コンテナを本体に合わせる
 */
export const clsStickerSizingYHug = 'frgs-layout-sticker-sizingY-hug';

/**
 * sticker: 装飾
 */
export const clsStickerItem = 'frgs-layout-sticker-item';

/**
 * sticker: 装飾の配置: 上
 */
export const clsStickerSideTop = 'frgs-layout-sticker-side-top';

/**
 * sticker: 装飾の配置: 下
 */
export const clsStickerSideBottom = 'frgs-layout-sticker-side-bottom';

/**
 * sticker: 装飾の配置: 左
 */
export const clsStickerSideLeft = 'frgs-layout-sticker-side-left';

/**
 * sticker: 装飾の配置: 右
 */
export const clsStickerSideRight = 'frgs-layout-sticker-side-right';

/**
 * sticker: 装飾の配置: 内側
 */
export const clsStickerSideInside = 'frgs-layout-sticker-side-inside';

/**
 * sticker: 横位置: 左
 */
export const clsStickerAlignXLeft = 'frgs-layout-sticker-alignX-left';

/**
 * sticker: 横位置: 中央
 */
export const clsStickerAlignXCenter = 'frgs-layout-sticker-alignX-center';

/**
 * sticker: 横位置: 右
 */
export const clsStickerAlignXRight = 'frgs-layout-sticker-alignX-right';

/**
 * sticker: 縦位置: 上
 */
export const clsStickerAlignYTop = 'frgs-layout-sticker-alignY-top';

/**
 * sticker: 縦位置: 中央
 */
export const clsStickerAlignYMiddle = 'frgs-layout-sticker-alignY-middle';

/**
 * sticker: 縦位置: 下
 */
export const clsStickerAlignYBottom = 'frgs-layout-sticker-alignY-bottom';

/**
 * 変数\
 * sticker: 間隔: 横方向
 */
export const varStickerGapX = '--frgs-layout-sticker-gapX';

/**
 * 変数\
 * sticker: 間隔: 縦方向
 */
export const varStickerGapY = '--frgs-layout-sticker-gapY';

/**
 * 変数\
 * sticker: 本体の端からの距離: 横方向
 */
export const varStickerInsetX = '--frgs-layout-sticker-insetX';

/**
 * 変数\
 * sticker: 本体の端からの距離: 縦方向
 */
export const varStickerInsetY = '--frgs-layout-sticker-insetY';

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
