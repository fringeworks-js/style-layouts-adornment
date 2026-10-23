import resolveValue from './resolveValue';

describe('resolveValue', () => {
  test('最初の有効な数値を返す', () => {
    expect(resolveValue(8, 4)).toBe(8);
    expect(resolveValue(undefined, 4)).toBe(4);
    expect(resolveValue(0, 4)).toBe(0);
  });

  test('有効な数値が無い場合はundefined', () => {
    expect(resolveValue(undefined, undefined)).toBeUndefined();
    expect(resolveValue(NaN, Infinity)).toBeUndefined();
    expect(resolveValue()).toBeUndefined();
  });

  test('有限の数値でない値は飛ばす', () => {
    expect(resolveValue(NaN, 4)).toBe(4);
  });
});
