/**
 * 本体に対する付属物の配置
 *
 * - top: 本体の上
 * - bottom: 本体の下
 * - left: 本体の左
 * - right: 本体の右
 * - inside: 本体の内側に重ねる
 */
export const Side = {
  top: 'top',
  bottom: 'bottom',
  left: 'left',
  right: 'right',
  inside: 'inside',
} as const;
export type Side = (typeof Side)[keyof typeof Side];

/**
 * 横位置
 *
 * - left: 左寄せ
 * - center: 中央寄せ
 * - right: 右寄せ
 */
export const AlignX = {
  left: 'left',
  center: 'center',
  right: 'right',
} as const;
export type AlignX = (typeof AlignX)[keyof typeof AlignX];

/**
 * 縦位置
 *
 * - top: 上寄せ
 * - middle: 中央寄せ
 * - bottom: 下寄せ
 */
export const AlignY = {
  top: 'top',
  middle: 'middle',
  bottom: 'bottom',
} as const;
export type AlignY = (typeof AlignY)[keyof typeof AlignY];
