import extractAffixItemOptions from '../helpers/extractAffixItemOptions';
import extractAffixOptions from '../helpers/extractAffixOptions';
import affix from './affix';
import affixItem from './affixItem';

/**
 * 間隔・距離が未指定の場合のスタイル
 */
const DEFAULT_SPACING = {
  '--frg-layout-affix-gapX': '0px',
  '--frg-layout-affix-gapY': '0px',
  '--frg-layout-affix-insetX': '0px',
  '--frg-layout-affix-insetY': '0px',
};

describe('affix', () => {
  test('オプション未指定: 間隔・距離は0を出力する', () => {
    expect(affix()).toEqual({
      className: 'frg-layout-affix',
      style: DEFAULT_SPACING,
    });
  });

  test('gap / inset は共通値を軸毎の値で上書きする', () => {
    expect(affix({ gap: 4, gapY: 8, inset: 2, insetX: 0 })).toEqual({
      className: 'frg-layout-affix',
      style: {
        '--frg-layout-affix-gapX': '4px',
        '--frg-layout-affix-gapY': '8px',
        '--frg-layout-affix-insetX': '0px',
        '--frg-layout-affix-insetY': '2px',
      },
    });
  });

  test('有限の数値でない値は未指定として扱う', () => {
    expect(affix({ gap: NaN, gapX: Infinity, inset: 4, insetY: NaN })).toEqual({
      className: 'frg-layout-affix',
      style: {
        '--frg-layout-affix-gapX': '0px',
        '--frg-layout-affix-gapY': '0px',
        '--frg-layout-affix-insetX': '4px',
        '--frg-layout-affix-insetY': '4px',
      },
    });
  });

  test('sizingX / sizingY', () => {
    expect(affix({ sizingX: 'fill', sizingY: 'hug' }).className).toBe(
      'frg-layout-affix frg-layout-affix-sizingX-fill frg-layout-affix-sizingY-hug',
    );
    expect(affix({ sizingY: 'keep' }).className).toBe(
      'frg-layout-affix frg-layout-affix-sizingY-keep',
    );
  });
});

describe('affixItem', () => {
  test('top / bottom はalignXのみ(デフォルトはcenter)', () => {
    expect(affixItem({ side: 'top' })).toEqual({
      className:
        'frg-layout-affix-item frg-layout-affix-side-top frg-layout-affix-alignX-center',
      style: {},
    });
    expect(affixItem({ side: 'bottom', alignX: 'left' })).toEqual({
      className:
        'frg-layout-affix-item frg-layout-affix-side-bottom frg-layout-affix-alignX-left',
      style: {},
    });
  });

  test('left / right はalignYのみ(デフォルトはmiddle)', () => {
    expect(affixItem({ side: 'left' })).toEqual({
      className:
        'frg-layout-affix-item frg-layout-affix-side-left frg-layout-affix-alignY-middle',
      style: {},
    });
    expect(affixItem({ side: 'right', alignY: 'bottom' })).toEqual({
      className:
        'frg-layout-affix-item frg-layout-affix-side-right frg-layout-affix-alignY-bottom',
      style: {},
    });
  });

  test('inside はalignX / alignY(デフォルトはcenter / middle)', () => {
    expect(affixItem({ side: 'inside' })).toEqual({
      className:
        'frg-layout-affix-item frg-layout-affix-side-inside frg-layout-affix-alignX-center frg-layout-affix-alignY-middle',
      style: {},
    });
    expect(affixItem({ side: 'inside', alignX: 'right' })).toEqual({
      className:
        'frg-layout-affix-item frg-layout-affix-side-inside frg-layout-affix-alignX-right frg-layout-affix-alignY-middle',
      style: {},
    });
  });

  test('上下の装飾は縦方向の間隔のみ上書きする', () => {
    expect(affixItem({ side: 'top', gap: 4 }).style).toEqual({
      '--frg-layout-affix-gapY': '4px',
    });
    expect(affixItem({ side: 'bottom', gap: 4, gapY: 8 }).style).toEqual({
      '--frg-layout-affix-gapY': '8px',
    });
  });

  test('左右の装飾は横方向の間隔のみ上書きする', () => {
    expect(affixItem({ side: 'left', gap: 4 }).style).toEqual({
      '--frg-layout-affix-gapX': '4px',
    });
    expect(affixItem({ side: 'right', gap: 4, gapX: 8 }).style).toEqual({
      '--frg-layout-affix-gapX': '8px',
    });
  });

  test('内側の装飾は距離を上書きする', () => {
    expect(affixItem({ side: 'inside', insetX: -4 }).style).toEqual({
      '--frg-layout-affix-insetX': '-4px',
    });
    expect(affixItem({ side: 'inside', inset: 2, insetY: 0 }).style).toEqual({
      '--frg-layout-affix-insetX': '2px',
      '--frg-layout-affix-insetY': '0px',
    });
  });

  test('sideで使わない値は無視する', () => {
    const options = {
      side: 'top',
      alignY: 'bottom',
      gapX: 4,
      inset: 4,
    } as unknown as Parameters<typeof affixItem>[0];
    expect(affixItem(options)).toEqual({
      className:
        'frg-layout-affix-item frg-layout-affix-side-top frg-layout-affix-alignX-center',
      style: {},
    });
  });

  test('型: sideで使えない値は指定できない', () => {
    // @ts-expect-error top / bottom にalignYは指定できない
    affixItem({ side: 'top', alignY: 'top' });
    // @ts-expect-error top / bottom にgapXは指定できない
    affixItem({ side: 'bottom', gapX: 4 });
    // @ts-expect-error left / right にalignXは指定できない
    affixItem({ side: 'left', alignX: 'left' });
    // @ts-expect-error left / right にgapYは指定できない
    affixItem({ side: 'right', gapY: 4 });
    // @ts-expect-error 外側にinsetは指定できない
    affixItem({ side: 'right', inset: 4 });
    // @ts-expect-error 内側にgapは指定できない
    affixItem({ side: 'inside', gap: 4 });
  });
});

describe('helpers', () => {
  test('extractAffixOptions', () => {
    expect(
      extractAffixOptions({ sizingX: 'hug', gap: 4, inset: 2, id: 'a' }),
    ).toEqual([{ sizingX: 'hug', gap: 4, inset: 2 }, { id: 'a' }]);
  });

  test('extractAffixItemOptions', () => {
    expect(
      extractAffixItemOptions({ side: 'inside', alignX: 'left', id: 'a' }),
    ).toEqual([{ side: 'inside', alignX: 'left' }, { id: 'a' }]);
  });
});
