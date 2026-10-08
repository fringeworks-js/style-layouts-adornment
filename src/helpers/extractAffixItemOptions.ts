import type { AffixItemOptions } from '../affix/types';
import {
  GAP_OPTIONS_KEYS,
  INSET_OPTIONS_KEYS,
  ITEM_OPTIONS_KEYS,
} from './_internal/constants';
import createExtractLayoutOptions from './_internal/createExtractLayoutOptions';

export default createExtractLayoutOptions<AffixItemOptions>([
  ...ITEM_OPTIONS_KEYS,
  ...GAP_OPTIONS_KEYS,
  ...INSET_OPTIONS_KEYS,
]);
