import type { ItemClassNames, SpacingVars } from '../_constants';
import type { ItemOptions } from '../_types';
import type { AlignX, AlignY, Side } from '../constants';
import type { LayoutStyle } from '../types';
import mergeClassName from './mergeClassName';
import resolveValue from './resolveValue';
import unit from './unit';

/**
 * 全てのsideのオプションを展開した型
 */
type ItemFlatOptions = {
  side: Side;
  alignX?: AlignX;
  alignY?: AlignY;
  gap?: number;
  gapX?: number;
  gapY?: number;
  inset?: number;
  insetX?: number;
  insetY?: number;
};

/**
 * 装飾のクラスとスタイルを作る
 *
 * - top / bottom: alignX・縦方向の間隔のみ適用する
 * - left / right: alignY・横方向の間隔のみ適用する
 * - inside: alignX / alignY・距離を適用する
 * - 間隔・距離は指定した場合のみ出力し、コンテナの値を上書きする
 * @param classNames レイアウトの装飾のクラス
 * @param vars レイアウトの変数
 * @param options 装飾のオプション
 */
export default function createItemStyle(
  classNames: ItemClassNames,
  vars: SpacingVars,
  options: ItemOptions,
): LayoutStyle {
  const { side, alignX, alignY, gap, gapX, gapY, inset, insetX, insetY } =
    options as ItemFlatOptions;
  const isOutsideX = side === 'left' || side === 'right';
  const isOutsideY = side === 'top' || side === 'bottom';

  const className = mergeClassName(
    classNames.item,
    classNames.side[side],
    // 左右に配置する場合は横位置が決まっているため不要
    !isOutsideX ? classNames.alignX[alignX ?? 'center'] : null,
    // 上下に配置する場合は縦位置が決まっているため不要
    !isOutsideY ? classNames.alignY[alignY ?? 'middle'] : null,
  );

  const style: NonNullable<LayoutStyle['style']> = {};
  const setVar = (name: `--${string}`, value: number | undefined) => {
    if (value !== undefined) {
      style[name] = unit(value);
    }
  };
  if (isOutsideY) {
    // 本体と上下の装飾との間隔
    setVar(vars.gap.y, resolveValue(gapY, gap));
  } else if (isOutsideX) {
    // 本体と左右の装飾との間隔
    setVar(vars.gap.x, resolveValue(gapX, gap));
  } else {
    // 本体の端から内側の装飾までの距離
    setVar(vars.inset.x, resolveValue(insetX, inset));
    setVar(vars.inset.y, resolveValue(insetY, inset));
  }

  return { className, style };
}
