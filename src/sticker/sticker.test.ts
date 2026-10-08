import extractStickerItemOptions from '../helpers/extractStickerItemOptions';
import extractStickerOptions from '../helpers/extractStickerOptions';
import sticker from './sticker';
import stickerItem from './stickerItem';

describe('sticker', () => {
  test('オプション未指定', () => {
    expect(sticker()).toEqual({ className: 'frg-layout-sticker', style: {} });
  });

  test('sizingX / sizingY', () => {
    expect(sticker({ sizingX: 'keep', sizingY: 'fill' }).className).toBe(
      'frg-layout-sticker frg-layout-sticker-sizingX-keep frg-layout-sticker-sizingY-fill',
    );
  });

  test('gap / inset は共通値を軸毎の値で上書きする', () => {
    expect(sticker({ gap: 4, gapY: 8, inset: -2, insetX: 0 })).toEqual({
      className: 'frg-layout-sticker',
      style: {
        '--frg-layout-sticker-gapX': '4px',
        '--frg-layout-sticker-gapY': '8px',
        '--frg-layout-sticker-insetX': '0px',
        '--frg-layout-sticker-insetY': '-2px',
      },
    });
  });
});

describe('stickerItem', () => {
  test('sideごとに使う揃え方のクラスのみ付与する', () => {
    expect(stickerItem({ side: 'top' }).className).toBe(
      'frg-layout-sticker-item frg-layout-sticker-side-top frg-layout-sticker-alignX-center',
    );
    expect(stickerItem({ side: 'left', alignY: 'top' }).className).toBe(
      'frg-layout-sticker-item frg-layout-sticker-side-left frg-layout-sticker-alignY-top',
    );
    expect(
      stickerItem({ side: 'inside', alignX: 'right', alignY: 'top' }).className,
    ).toBe(
      'frg-layout-sticker-item frg-layout-sticker-side-inside frg-layout-sticker-alignX-right frg-layout-sticker-alignY-top',
    );
  });

  test('外側はgap、内側はinsetでコンテナの値を上書きする', () => {
    expect(stickerItem({ side: 'bottom', gapY: 2 }).style).toEqual({
      '--frg-layout-sticker-gapY': '2px',
    });
    expect(stickerItem({ side: 'inside', inset: -8 }).style).toEqual({
      '--frg-layout-sticker-insetX': '-8px',
      '--frg-layout-sticker-insetY': '-8px',
    });
  });

  test('型: sideで使えない値は指定できない', () => {
    // @ts-expect-error top / bottom にalignYは指定できない
    stickerItem({ side: 'bottom', alignY: 'top' });
    // @ts-expect-error 内側にgapは指定できない
    stickerItem({ side: 'inside', gap: 4 });
  });
});

describe('helpers', () => {
  test('extractStickerOptions', () => {
    expect(extractStickerOptions({ gap: 4, sizingY: 'hug', id: 'a' })).toEqual([
      { gap: 4, sizingY: 'hug' },
      { id: 'a' },
    ]);
  });

  test('extractStickerItemOptions', () => {
    expect(
      extractStickerItemOptions({ side: 'top', alignX: 'left', id: 'a' }),
    ).toEqual([{ side: 'top', alignX: 'left' }, { id: 'a' }]);
  });
});
