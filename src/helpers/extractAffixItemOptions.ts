import { createSplitByKeys } from '@fringeworks/utils/object/createSplitByKeys';
import type { AffixItemOptions } from '../affix/types';

export default createSplitByKeys<AffixItemOptions>({
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
