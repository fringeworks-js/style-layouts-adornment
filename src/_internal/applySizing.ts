import type { SizingClassNames } from '../_constants';
import type { Sizing } from '../constants';
import type { LayoutStyle } from '../types';
import mergeClassName from './mergeClassName';

/**
 * 大きさの決め方の適用
 * @param result
 * @param classNames レイアウトの大きさの決め方のクラス
 * @param sizingX
 * @param sizingY
 */
export default function applySizing(
  result: LayoutStyle,
  classNames: SizingClassNames,
  sizingX: Sizing | null | undefined,
  sizingY: Sizing | null | undefined,
): void {
  result.className = mergeClassName(
    result.className,
    sizingX ? classNames.x[sizingX] : null,
    sizingY ? classNames.y[sizingY] : null,
  );
}
