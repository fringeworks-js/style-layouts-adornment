/* eslint-disable @typescript-eslint/no-explicit-any */
import type { LayoutStyle } from '../../src/types';
import affix, { affixItem } from '../../src/with-css/affix';
import sticker, { stickerItem } from '../../src/with-css/sticker';
import type { LayoutName } from '../_shared/types';

/**
 * storyで表示するレイアウト
 *
 * オプションはargsから組み立てるため、型はここで緩める
 */
const LAYOUTS: Record<
  LayoutName,
  {
    container: (options: any) => LayoutStyle;
    item: (options: any) => LayoutStyle;
  }
> = {
  affix: { container: affix, item: affixItem },
  sticker: { container: sticker, item: stickerItem },
};
export default LAYOUTS;
