import type { StickerOptions } from '../sticker/types';
import {
  GAP_OPTIONS_KEYS,
  HUG_OPTIONS_KEYS,
  INSET_OPTIONS_KEYS,
} from './_internal/constants';
import createExtractLayoutOptions from './_internal/createExtractLayoutOptions';

export default createExtractLayoutOptions<StickerOptions>([
  ...HUG_OPTIONS_KEYS,
  ...GAP_OPTIONS_KEYS,
  ...INSET_OPTIONS_KEYS,
]);
