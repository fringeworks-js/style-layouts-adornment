import { createSplitByKeys } from '@fringeworks/utils/object/createSplitByKeys';
import type { StickerOptions } from '../sticker/types';

export default createSplitByKeys<StickerOptions>({
  sizingX: true,
  sizingY: true,
  gap: true,
  gapX: true,
  gapY: true,
  inset: true,
  insetX: true,
  insetY: true,
});
