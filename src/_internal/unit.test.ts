import unit from './unit';

describe('unit', () => {
  test('数値には単位を付ける(デフォルトはpx)', () => {
    expect(unit(4)).toBe('4px');
    expect(unit(-8)).toBe('-8px');
    expect(unit(0)).toBe('0px');
    expect(unit(50, '%')).toBe('50%');
  });

  test('文字列はそのまま返す', () => {
    expect(unit('1rem')).toBe('1rem');
  });
});
