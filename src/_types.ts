import type { AlignX, AlignY, Sizing } from './constants';

/**
 * 本体とコンテナの大きさの決め方
 */
export type SizingOptions = {
  /**
   * 横方向の大きさの決め方
   * 未指定の場合は本体に触れない（幅のない本体はコンテナに広がり、幅のある本体はそのまま）
   */
  sizingX?: Sizing;

  /**
   * 縦方向の大きさの決め方
   * 未指定の場合は本体に触れない（本体の高さのまま中央に置く）
   */
  sizingY?: Sizing;
};

/**
 * 本体と外側の装飾との間隔
 */
export type GapOptions = {
  /**
   * 間隔
   * 未指定の場合は0（装飾ではコンテナの値）
   */
  gap?: number;

  /**
   * 横方向の間隔
   * 未指定の場合は`gap`
   */
  gapX?: number;

  /**
   * 縦方向の間隔
   * 未指定の場合は`gap`
   */
  gapY?: number;
};

/**
 * 本体の端から内側の装飾までの距離
 */
export type InsetOptions = {
  /**
   * 距離
   * 未指定の場合は0（装飾ではコンテナの値）
   */
  inset?: number;

  /**
   * 横方向の距離
   * 未指定の場合は`inset`
   */
  insetX?: number;

  /**
   * 縦方向の距離
   * 未指定の場合は`inset`
   */
  insetY?: number;
};

/**
 * 本体の上下に配置する装飾のオプション
 */
export type ItemTopBottomOptions = {
  /**
   * 本体に対する配置
   */
  side: 'top' | 'bottom';

  /**
   * 本体の幅の中での横位置
   * デフォルトは`center`
   */
  alignX?: AlignX;

  /**
   * 本体との間隔
   * 未指定の場合はコンテナの値
   */
  gap?: number;

  /**
   * 本体との間隔（`gap`と同じ。コンテナの`gapY`と同じ名前で上書きする場合に使う）
   */
  gapY?: number;
};

/**
 * 本体の左右に配置する装飾のオプション
 */
export type ItemLeftRightOptions = {
  /**
   * 本体に対する配置
   */
  side: 'left' | 'right';

  /**
   * 本体の高さの中での縦位置
   * デフォルトは`middle`
   */
  alignY?: AlignY;

  /**
   * 本体との間隔
   * 未指定の場合はコンテナの値
   */
  gap?: number;

  /**
   * 本体との間隔（`gap`と同じ。コンテナの`gapX`と同じ名前で上書きする場合に使う）
   */
  gapX?: number;
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
  alignX?: AlignX;

  /**
   * 本体の内側での縦位置
   * デフォルトは`middle`
   */
  alignY?: AlignY;
};

/**
 * 装飾のオプション
 */
export type ItemOptions =
  ItemTopBottomOptions | ItemLeftRightOptions | ItemInsideOptions;
