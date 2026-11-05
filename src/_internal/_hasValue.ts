/**
 * 有効な数値か
 *
 * - `NaN` / `Infinity` は無効として扱う（CSSの値にできないため）
 * - 型の上では受け付けない`null`などが実行時に渡された場合も無効として扱う
 * @param value
 * @returns
 */
export default function hasValue(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}
