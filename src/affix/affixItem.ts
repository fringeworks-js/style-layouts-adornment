import { clsAffixItemNames, varAffixSpacing } from '../_constants';
import createItemStyle from '../_internal/createItemStyle';
import type { LayoutStyle } from '../types';
import type { AffixItemOptions } from './types';

/**
 * affixの装飾
 *
 * - top / bottom: 本体の上下に配置し、alignXで本体の幅の中での位置を決める
 * - left / right: 本体の左右に配置し、alignYで本体の高さの中での位置を決める
 * - inside: 本体の内側に重ね、alignX / alignYで位置を決める
 * - gap / inset を指定した場合はコンテナの値を上書きする
 */
const affixItem = (options: AffixItemOptions): LayoutStyle =>
  createItemStyle(clsAffixItemNames, varAffixSpacing, options);
export default affixItem;
