import { CONTAINER_STYLE } from './constants';
import './debug.css';
import toAttributesObj from './toAttributesObj';
import type { DebugArgs, StoryArgs, StyleObj } from './types';

/**
 * 表示確認用のコンテナーの描画内容
 *
 * DOMやReactに依存しない値のみで構成する
 */
export type ContainerModel = {
  /**
   * レイアウトのオプション
   */
  options: Record<string, unknown>;

  /**
   * リサイズ可能なラッパーの設定
   */
  resizable: {
    initialWidth: number;
    initialHeight: number;
    style: StyleObj;
  };

  /**
   * コンテナーのクラス（レイアウトのクラスは含まない。表示確認用）
   */
  containerClassName: string;

  /**
   * コンテナーのスタイル（レイアウトのスタイルは含まない）
   */
  containerStyle: StyleObj;

  /**
   * 本体
   */
  main: {
    label: string;
    style: StyleObj;
  };

  /**
   * コンテナの前後に表示する文章（表示しない場合はnull）
   */
  surroundings: {
    text: string;
    style: StyleObj;
  } | null;

  /**
   * 装飾
   *
   * 本体より前に描画する（DOM順に関わらず内側の装飾が本体の上に表示されることを確認するため）
   */
  items: {
    label: string;
    options: Record<string, unknown>;
    style: StyleObj;
  }[];
};

const SIZING_STYLES: Record<NonNullable<DebugArgs['sizing']>, StyleObj> = {
  auto: {},
  fill: { width: '100%', height: '100%' },
};

const MAIN_STYLES: Record<NonNullable<DebugArgs['main']>, StyleObj> = {
  bar: {
    height: '8px',
    borderRadius: '4px',
    background: 'linear-gradient(to right, #6c9cab 45%, #d5e1e5 45%)',
  },
  box: {
    width: '120px',
    height: '80px',
    borderRadius: '4px',
    backgroundColor: '#a9c6cf',
  },
  auto: {
    borderRadius: '4px',
    backgroundColor: '#a9c6cf',
  },
};

const ITEM_TRANSFORM_STYLES: Record<
  NonNullable<StoryArgs['itemTransform']>,
  StyleObj
> = {
  none: {},
  scale: { transform: 'scale(1.5)' },
  rotate: { transform: 'rotate(-15deg)' },
  pulse: {},
};

const ITEM_FONT_SIZES: Record<NonNullable<DebugArgs['itemSize']>, string> = {
  small: '12px',
  large: '28px',
};

/**
 * storyのargsから表示確認用のコンテナーの描画内容を作る
 * @param args storyのargs
 * @returns
 */
export default function createContainerModel(args: StoryArgs): ContainerModel {
  const {
    containerWidth,
    containerHeight,
    sizing = 'auto',
    display = 'default',
    main = 'bar',
    itemSize = 'small',
    surroundings = false,
    centering = 'translate',
    itemTransform = 'none',
    stageOverflow = 'visible',
    top = 'none',
    bottom = 'none',
    left = 'none',
    right = 'none',
    insideX = 'none',
    insideY = 'middle',
    topGap,
    insideInset,
    ...params
  } = args;
  const {
    containerWidth: width = CONTAINER_STYLE.width,
    containerHeight: height = CONTAINER_STYLE.height,
    topGap: topGapValue,
    insideInset: insideInsetValue,
  } = toAttributesObj({ containerWidth, containerHeight, topGap, insideInset });

  const itemStyle: StyleObj = {
    padding: '0 4px',
    borderRadius: '2px',
    backgroundColor: 'rgba(237, 138, 15, 0.8)',
    color: 'rgba(0, 0, 0, 0.7)',
    fontSize: ITEM_FONT_SIZES[itemSize],
    lineHeight: '1.5',
    fontFamily: 'sans-serif',
    whiteSpace: 'nowrap',
    ...ITEM_TRANSFORM_STYLES[itemTransform],
  };
  const items: ContainerModel['items'] = [];
  if (insideX !== 'none') {
    items.push({
      label: 'inside',
      options: {
        side: 'inside',
        alignX: insideX,
        alignY: insideY,
        inset: insideInsetValue,
      },
      style: itemStyle,
    });
  }
  if (top !== 'none') {
    items.push({
      label: 'top',
      options: { side: 'top', alignX: top, gap: topGapValue },
      style: itemStyle,
    });
  }
  if (bottom !== 'none') {
    items.push({
      label: 'bottom',
      options: { side: 'bottom', alignX: bottom },
      style: itemStyle,
    });
  }
  if (left !== 'none') {
    items.push({
      label: 'left',
      options: { side: 'left', alignY: left },
      style: itemStyle,
    });
  }
  if (right !== 'none') {
    items.push({
      label: 'right',
      options: { side: 'right', alignY: right },
      style: itemStyle,
    });
  }

  return {
    options: toAttributesObj(params),
    resizable: {
      initialWidth: width,
      initialHeight: height,
      style: {
        padding: '32px',
        overflow: stageOverflow,
        border: '1px solid rgba(0, 0, 0, 0.2)',
      },
    },
    containerClassName: [
      centering !== 'translate' ? `story-centering-${centering}` : '',
      itemTransform === 'pulse' ? 'story-transform-pulse' : '',
    ]
      .filter(Boolean)
      .join(' '),
    containerStyle: {
      ...SIZING_STYLES[sizing],
      ...(display !== 'default' ? { display } : {}),
      boxSizing: 'border-box',
      outline: '1px solid rgba(0, 0, 0, 0.1)',
      backgroundColor: '#f9fbfc',
    },
    main: {
      label: main === 'bar' ? '' : 'main',
      style: {
        ...MAIN_STYLES[main],
        color: 'rgba(0, 0, 0, 0.4)',
        fontSize: '16px',
        fontFamily: 'sans-serif',
      },
    },
    items,
    surroundings: surroundings
      ? {
          text: 'The quick brown fox jumps over the lazy dog.',
          style: {
            margin: '4px 0',
            color: 'rgba(0, 0, 0, 0.5)',
            fontSize: '14px',
            fontFamily: 'sans-serif',
          },
        }
      : null,
  };
}
