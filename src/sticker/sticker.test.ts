import extractStickerItemOptions from '../helpers/extractStickerItemOptions';
import extractStickerOptions from '../helpers/extractStickerOptions';
import sticker from './sticker';
import stickerItem from './stickerItem';

describe('sticker', () => {
  test('オプション未指定: 間隔・距離は0を出力する', () => {
    expect(sticker()).toEqual({
      className: 'frgs-layout-sticker',
      style: {
        '--frgs-layout-sticker-gapX': '0px',
        '--frgs-layout-sticker-gapY': '0px',
        '--frgs-layout-sticker-insetX': '0px',
        '--frgs-layout-sticker-insetY': '0px',
      },
    });
  });

  test('sizingX / sizingY', () => {
    expect(sticker({ sizingX: 'keep', sizingY: 'fill' }).className).toBe(
      'frgs-layout-sticker frgs-layout-sticker-sizingX-keep frgs-layout-sticker-sizingY-fill',
    );
  });

  test('gap / inset は共通値を軸毎の値で上書きする', () => {
    expect(sticker({ gap: 4, gapY: 8, inset: -2, insetX: 0 })).toEqual({
      className: 'frgs-layout-sticker',
      style: {
        '--frgs-layout-sticker-gapX': '4px',
        '--frgs-layout-sticker-gapY': '8px',
        '--frgs-layout-sticker-insetX': '0px',
        '--frgs-layout-sticker-insetY': '-2px',
      },
    });
  });
});

describe('stickerItem', () => {
  test('sideごとに使う揃え方のクラスのみ付与する', () => {
    expect(stickerItem({ side: 'top' }).className).toBe(
      'frgs-layout-sticker-item frgs-layout-sticker-side-top frgs-layout-sticker-alignX-center',
    );
    expect(stickerItem({ side: 'left', alignY: 'top' }).className).toBe(
      'frgs-layout-sticker-item frgs-layout-sticker-side-left frgs-layout-sticker-alignY-top',
    );
    expect(stickerItem({ side: 'right' }).className).toBe(
      'frgs-layout-sticker-item frgs-layout-sticker-side-right frgs-layout-sticker-alignY-middle',
    );
    expect(
      stickerItem({ side: 'inside', alignX: 'right', alignY: 'top' }).className,
    ).toBe(
      'frgs-layout-sticker-item frgs-layout-sticker-side-inside frgs-layout-sticker-alignX-right frgs-layout-sticker-alignY-top',
    );
  });

  test('外側は面した軸の間隔、内側は距離でコンテナの値を上書きする', () => {
    expect(stickerItem({ side: 'bottom', gapY: 2 }).style).toEqual({
      '--frgs-layout-sticker-gapY': '2px',
    });
    expect(stickerItem({ side: 'right', gap: 2 }).style).toEqual({
      '--frgs-layout-sticker-gapX': '2px',
    });
    expect(stickerItem({ side: 'inside', inset: -8 }).style).toEqual({
      '--frgs-layout-sticker-insetX': '-8px',
      '--frgs-layout-sticker-insetY': '-8px',
    });
  });

  test('型: sideで使えない値は指定できない', () => {
    // @ts-expect-error top / bottom にalignYは指定できない
    stickerItem({ side: 'bottom', alignY: 'top' });
    // @ts-expect-error left / right にgapYは指定できない
    stickerItem({ side: 'left', gapY: 4 });
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
