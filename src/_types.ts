import type { AlignX, AlignY, Sizing } from './constants';

/**
 * 本体とコンテナの大きさの決め方
 */
export type SizingOptions = {
  /**
   * 横方向の大きさの決め方
   * 未指定の場合は本体に触れない（幅のない本体はコンテナに広がり、幅のある本体はそのまま）
   */
  sizingX?: Sizing | null;

  /**
   * 縦方向の大きさの決め方
   * 未指定の場合は本体に触れない（本体の高さのまま中央に置く）
   */
  sizingY?: Sizing | null;
};

/**
 * 本体と外側の装飾との間隔
 */
export type GapOptions = {
  /**
   * 間隔
   */
  gap?: number | null;

  /**
   * 横方向の間隔
   */
  gapX?: number | null;

  /**
   * 縦方向の間隔
   */
  gapY?: number | null;
};

/**
 * 本体の端から内側の装飾までの距離
 */
export type InsetOptions = {
  /**
   * 距離
   */
  inset?: number | null;

  /**
   * 横方向の距離
   */
  insetX?: number | null;

  /**
   * 縦方向の距離
   */
  insetY?: number | null;
};

/**
 * 本体の上下に配置する装飾のオプション
 */
export type ItemTopBottomOptions = GapOptions & {
  /**
   * 本体に対する配置
   */
  side: 'top' | 'bottom';

  /**
   * 本体の幅の中での横位置
   * デフォルトは`center`
   */
  alignX?: AlignX | null;
};

/**
 * 本体の左右に配置する装飾のオプション
 */
export type ItemLeftRightOptions = GapOptions & {
  /**
   * 本体に対する配置
   */
  side: 'left' | 'right';

  /**
   * 本体の高さの中での縦位置
   * デフォルトは`middle`
   */
  alignY?: AlignY | null;
};

/**
 * 本体の内側に重ねる装飾のオプション
 */
export type ItemInsideOptions = InsetOptions & {
  /**
   * 本体に対する配置
   */
  side: 'inside';

  /**
   * 本体の内側での横位置
   * デフォルトは`center`
   */
  alignX?: AlignX | null;

  /**
   * 本体の内側での縦位置
   * デフォルトは`middle`
   */
  alignY?: AlignY | null;
};

/**
 * 装飾のオプション
 */
export type ItemOptions =
  | ItemTopBottomOptions
  | ItemLeftRightOptions
  | ItemInsideOptions;
