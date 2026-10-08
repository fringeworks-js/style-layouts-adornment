import extractAffixItemOptions from '../helpers/extractAffixItemOptions';
import extractAffixOptions from '../helpers/extractAffixOptions';
import affix from './affix';
import affixItem from './affixItem';

describe('affix', () => {
  test('オプション未指定', () => {
    expect(affix()).toEqual({ className: 'frg-layout-affix', style: {} });
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

  test('hug', () => {
    expect(affix({ hug: true }).className).toBe(
      'frg-layout-affix frg-layout-affix-hug',
    );
    expect(affix({ hug: false }).className).toBe('frg-layout-affix');
  });

  test('nullは未指定として扱う', () => {
    expect(affix({ hug: null, gap: null, inset: null })).toEqual({
      className: 'frg-layout-affix',
      style: {},
    });
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
    expect(
      affixItem({ side: 'inside', alignX: 'right', alignY: null }),
    ).toEqual({
      className:
        'frg-layout-affix-item frg-layout-affix-side-inside frg-layout-affix-alignX-right frg-layout-affix-alignY-middle',
      style: {},
    });
  });

  test('外側はgap、内側はinsetでコンテナの値を上書きする', () => {
    expect(affixItem({ side: 'top', gap: 4 }).style).toEqual({
      '--frg-layout-affix-gapX': '4px',
      '--frg-layout-affix-gapY': '4px',
    });
    expect(affixItem({ side: 'inside', insetX: -4 }).style).toEqual({
      '--frg-layout-affix-insetX': '-4px',
    });
  });

  test('sideで使わない値は無視する', () => {
    const options = {
      side: 'top',
      alignY: 'bottom',
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
    // @ts-expect-error left / right にalignXは指定できない
    affixItem({ side: 'left', alignX: 'left' });
    // @ts-expect-error 外側にinsetは指定できない
    affixItem({ side: 'right', inset: 4 });
    // @ts-expect-error 内側にgapは指定できない
    affixItem({ side: 'inside', gap: 4 });
  });
});

describe('helpers', () => {
  test('extractAffixOptions', () => {
    expect(
      extractAffixOptions({ hug: true, gap: 4, inset: 2, id: 'a' }),
    ).toEqual([{ hug: true, gap: 4, inset: 2 }, { id: 'a' }]);
  });

  test('extractAffixItemOptions', () => {
    expect(
      extractAffixItemOptions({ side: 'inside', alignX: 'left', id: 'a' }),
    ).toEqual([{ side: 'inside', alignX: 'left' }, { id: 'a' }]);
  });
});
