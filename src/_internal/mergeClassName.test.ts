import mergeClassName from './mergeClassName';

describe('mergeClassName', () => {
  test('空でないクラス名を空白で連結する', () => {
    expect(mergeClassName('a', null, 'b', undefined, '', 'c')).toBe('a b c');
  });

  test('クラス名が無い場合は空文字列', () => {
    expect(mergeClassName()).toBe('');
    expect(mergeClassName(null, undefined)).toBe('');
  });
});
