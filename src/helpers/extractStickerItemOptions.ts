import { createSplitByKeys } from '@fringeworks/utils/object/createSplitByKeys';
import type { StickerItemOptions } from '../sticker/types';

export default createSplitByKeys<StickerItemOptions>({
  side: true,
  alignX: true,
  alignY: true,
  gap: true,
  gapX: true,
  gapY: true,
  inset: true,
  insetX: true,
  insetY: true,
});
