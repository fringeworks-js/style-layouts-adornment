import type { ItemClassNames, SpacingVars } from '../_constants';
import type { GapOptions, InsetOptions, ItemOptions } from '../_types';
import type { AlignX, AlignY, Side } from '../constants';
import type { LayoutStyle } from '../types';
import applyGap from './applyGap';
import applyInset from './applyInset';
import mergeClassName from './mergeClassName';

/**
 * 全てのsideのオプションを展開した型
 */
type ItemFlatOptions = GapOptions &
  InsetOptions & {
    side: Side;
    alignX?: AlignX | null;
    alignY?: AlignY | null;
  };

/**
 * 装飾のクラスとスタイルを作る
 *
 * - top / bottom: alignXのみ適用する
 * - left / right: alignYのみ適用する
 * - inside: alignX / alignYを適用する
 * - 外側はgap、内側はinsetでコンテナの値を上書きする
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

  const result: LayoutStyle = {
    className: mergeClassName(
      classNames.item,
      classNames.side[side],
      // 左右に配置する場合は横位置が決まっているため不要
      !isOutsideX ? classNames.alignX[alignX ?? 'center'] : null,
      // 上下に配置する場合は縦位置が決まっているため不要
      !isOutsideY ? classNames.alignY[alignY ?? 'middle'] : null,
    ),
    style: {},
  };

  if (side === 'inside') {
    // 本体の端から内側の装飾までの距離
    applyInset(result, vars, inset, insetX, insetY);
  } else {
    // 本体と外側の装飾との間隔
    applyGap(result, vars, gap, gapX, gapY);
  }

  return result;
}
