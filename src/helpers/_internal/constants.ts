import type {
  GapOptions,
  InsetOptions,
  ItemInsideOptions,
  SizingOptions,
} from '../../_types';

export const SIZING_OPTIONS_KEYS: (keyof SizingOptions)[] = [
  'sizingX',
  'sizingY',
] as const;
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
