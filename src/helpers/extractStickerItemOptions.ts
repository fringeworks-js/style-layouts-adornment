import type { StickerItemOptions } from '../sticker/types';
import {
  GAP_OPTIONS_KEYS,
  INSET_OPTIONS_KEYS,
  ITEM_OPTIONS_KEYS,
} from './_internal/constants';
import createExtractLayoutOptions from './_internal/createExtractLayoutOptions';

export default createExtractLayoutOptions<StickerItemOptions>([
  ...ITEM_OPTIONS_KEYS,
  ...GAP_OPTIONS_KEYS,
  ...INSET_OPTIONS_KEYS,
]);
