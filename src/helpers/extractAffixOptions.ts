import { createSplitByKeys } from '@fringeworks/utils/object/createSplitByKeys';
import type { AffixOptions } from '../affix/types';

export default createSplitByKeys<AffixOptions>({
  sizingX: true,
  sizingY: true,
  gap: true,
  gapX: true,
  gapY: true,
  inset: true,
  insetX: true,
  insetY: true,
});
