import type { AffixOptions } from '../affix/types';
import {
  GAP_OPTIONS_KEYS,
  INSET_OPTIONS_KEYS,
  SIZING_OPTIONS_KEYS,
} from './_internal/constants';
import createExtractLayoutOptions from './_internal/createExtractLayoutOptions';

export default createExtractLayoutOptions<AffixOptions>([
  ...SIZING_OPTIONS_KEYS,
  ...GAP_OPTIONS_KEYS,
  ...INSET_OPTIONS_KEYS,
]);
