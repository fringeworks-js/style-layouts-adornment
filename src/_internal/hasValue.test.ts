import hasValue from './hasValue';

describe('hasValue', () => {
  test('有限の数値は有効', () => {
    expect(hasValue(0)).toBe(true);
    expect(hasValue(-4)).toBe(true);
    expect(hasValue(1.5)).toBe(true);
  });

  test('NaN / Infinity は無効', () => {
    expect(hasValue(NaN)).toBe(false);
    expect(hasValue(Infinity)).toBe(false);
    expect(hasValue(-Infinity)).toBe(false);
  });

  test('数値以外は無効', () => {
    expect(hasValue(undefined)).toBe(false);
    expect(hasValue(null)).toBe(false);
    expect(hasValue('4')).toBe(false);
  });
});
