import hasValue from './hasValue';

/**
 * 候補の中で最初の有効な数値を返す
 *
 * - 軸ごとの値・共通の値の順に渡し、指定された値を優先する
 * - 有効な数値が無い場合は`undefined`
 * @param values 候補（優先する順）
 * @returns
 */
export default function resolveValue(
  ...values: (number | undefined)[]
): number | undefined {
  return values.find(hasValue);
}
