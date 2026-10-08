import type { ResizeLimits, Size } from '../_shared/resizable';
import {
  getHandleStyle,
  getWrapperStyle,
  RESIZE_HANDLE_TYPES,
  startResize,
} from '../_shared/resizable';
import assignStyle from './assignStyle';

export type ResizableOptions = ResizeLimits & {
  /**
   * 対象のエレメント
   */
  element?: HTMLElement;
  /** 初期幅 (px)。未指定の場合は element の現在の幅を使用 */
  initialWidth?: number;
  /** 初期高さ (px)。未指定の場合は element の現在の高さを使用 */
  initialHeight?: number;
  /** ハンドルの太さ (px)。デフォルト: 8 */
  handleSize?: number;
};

export type ResizableInstance = {
  /**
   * 対象のエレメント
   */
  element: HTMLElement;
  /** ラッパー要素。これをDOMに追加する */
  wrapper: HTMLElement;
  /** リサイズイベントリスナーを解除してDOMを元の状態に戻す */
  destroy: () => void;
};

/**
 * 指定した HTMLElement の右辺・下辺・右下コーナーをドラッグして
 * サイズ変更できるようにしたラッパー要素を返す。
 *
 * @example
 * const { wrapper } = createResizableElement({ element: myElement, initialWidth: 400 });
 * document.body.appendChild(wrapper);
 */
export default function createResizableElement(
  options: ResizableOptions = {},
): ResizableInstance {
  const {
    element = document.createElement('div'),
    handleSize = 8,
    ...limits
  } = options;

  // 初期サイズを決定
  const rect = element.getBoundingClientRect();
  let size: Size = {
    width: options.initialWidth ?? (rect.width || 200),
    height: options.initialHeight ?? (rect.height || 200),
  };

  // ─── ラッパー ────────────────────────────────────────────────
  const wrapper = document.createElement('div');
  assignStyle(wrapper, getWrapperStyle(size));

  // コンテンツが wrapper いっぱいに広がるようにする
  element.style.width = '100%';
  element.style.height = '100%';
  wrapper.appendChild(element);

  // ─── ハンドル ────────────────────────────────────────────────
  let stopResize: (() => void) | undefined;
  const onResize = (newSize: Size) => {
    size = newSize;
    assignStyle(wrapper, getWrapperStyle(size));
  };
  const handles = RESIZE_HANDLE_TYPES.map((type) => {
    const handle = document.createElement('div');
    assignStyle(handle, getHandleStyle(type, handleSize));
    const onMouseDown = (e: MouseEvent) => {
      stopResize = startResize(e, type, size, onResize, limits);
    };
    handle.addEventListener('mousedown', onMouseDown);
    wrapper.appendChild(handle);
    return { handle, onMouseDown };
  });

  // ─── destroy ─────────────────────────────────────────────────
  const destroy = (): void => {
    for (const { handle, onMouseDown } of handles) {
      handle.removeEventListener('mousedown', onMouseDown);
    }
    stopResize?.();

    // element を wrapper から取り出してスタイルをリセット
    element.style.width = '';
    element.style.height = '';
    element.style.boxSizing = '';
    wrapper.replaceWith(element);
  };

  return { element, wrapper, destroy };
}
