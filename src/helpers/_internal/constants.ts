import type {
  GapOptions,
  HugOptions,
  InsetOptions,
  ItemInsideOptions,
} from '../../_types';

export const HUG_OPTIONS_KEYS: (keyof HugOptions)[] = ['hug'] as const;
export const GAP_OPTIONS_KEYS: (keyof GapOptions)[] = [
  'gap',
  'gapX',
  'gapY',
] as const;
export const INSET_OPTIONS_KEYS: (keyof InsetOptions)[] = [
  'inset',
  'insetX',
  'insetY',
] as const;
export const ITEM_OPTIONS_KEYS: (keyof ItemInsideOptions)[] = [
  'side',
  'alignX',
  'alignY',
] as const;
