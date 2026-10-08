# @fringeworks/style-layouts-adornment

`@fringeworks/style-layouts-adornment` is a library some will find handy, offering CSS layouts for placing labels, badges, and other adornments around or over a main element.
It returns class names and CSS custom properties as an object based on the given options. Framework-agnostic and SSR-compatible.

**[日本語のREADMEはこちら](./README.ja.md)**

## Features

- Attach labels to a progress bar, badges to an avatar, and similar layouts using only class names and CSS custom properties
- Leaves the main element almost untouched (only what placement requires, with zero specificity)
- Framework-agnostic (works with any JS environment)
- SSR-compatible (returns plain class names and inline style objects)
- Fully typed with TypeScript

This library is part of the `@fringeworks/style-layouts` series, but it can be used independently of `@fringeworks/style-layouts`.

## Installation

```bash
npm install @fringeworks/style-layouts-adornment
# or
pnpm add @fringeworks/style-layouts-adornment
```

## Usage

Each layout comes as a pair of functions: one for the container and one for adornments (`<layout name>Item`). Both return a `{ className, style }` object; apply them to the container and adornment elements respectively. Any child element without the adornment function applied becomes the main element.

```ts
import { affix, affixItem } from '@fringeworks/style-layouts-adornment';

const container = affix({ gap: 4 });
const title = affixItem({ side: 'top', alignX: 'left' });
const count = affixItem({ side: 'right' });
const percent = affixItem({ side: 'inside' });
```

```html
<div
  class="frg-layout-affix"
  style="--frg-layout-affix-gapX: 4px; --frg-layout-affix-gapY: 4px"
>
  <div class="progress-bar"></div>
  <span
    class="frg-layout-affix-item frg-layout-affix-side-top frg-layout-affix-alignX-left"
  >
    Uploading...
  </span>
  <span
    class="frg-layout-affix-item frg-layout-affix-side-right frg-layout-affix-alignY-middle"
  >
    3 / 10
  </span>
  <span
    class="frg-layout-affix-item frg-layout-affix-side-inside frg-layout-affix-alignX-center frg-layout-affix-alignY-middle"
  >
    45%
  </span>
</div>
```

### CSS

Layout functions do not import CSS, so they work as-is in SSR and React Server Components. Import the CSS separately.

```ts
// Import all layouts at once
import '@fringeworks/style-layouts-adornment/styles.css';

// Import only the layouts you need
import '@fringeworks/style-layouts-adornment/affix.css';
```

To load CSS automatically, use the modules under `with-css`. This requires a bundler that handles CSS imports.

```ts
import {
  affix,
  affixItem,
} from '@fringeworks/style-layouts-adornment/with-css';
```

## Main Element and Adornments

- Any child element without the adornment function applied becomes the main element
- Only the minimum styles each layout needs for placement are applied to the main element. All of them have zero specificity, so styles you set on the main element always take precedence
- The main element must be an element. Text placed directly inside the container is not treated as the main element
- Specify where an adornment goes with `side`, and how it aligns to the main element with `alignX` / `alignY`

```
                 top
          ┌──────────────┐
    left  │    inside    │  right
          └──────────────┘
                bottom
```

## Layout Types

| Layout    | Adornments above, below, left, right | Suited for                                                                         |
| --------- | ------------------------------------ | ---------------------------------------------------------------------------------- |
| `affix`   | Take up space in the layout          | Adornments that must not overlap surrounding elements, such as progress bar labels |
| `sticker` | Stuck on top without taking up space | Adornments that should not shift the layout, such as notification badges           |

### `affix`

Places adornments above, below, left, right of, or inside the main element. Adornments above, below, left, and right take up space in the layout, so they do not overlap surrounding elements.

```ts
import { affix, affixItem } from '@fringeworks/style-layouts-adornment';

const container = affix({ gap: 4 });
const title = affixItem({ side: 'top', alignX: 'left' });
```

#### Placement

| `side`               | Placement                        | `alignX`                               | `alignY`                               |
| -------------------- | -------------------------------- | -------------------------------------- | -------------------------------------- |
| `'top'` / `'bottom'` | Above / below the main element   | Horizontal position within its width   | Not allowed (touches the main element) |
| `'left'` / `'right'` | Left / right of the main element | Not allowed (touches the main element) | Vertical position within its height    |
| `'inside'`           | Overlaid inside the main element | Horizontal position inside it          | Vertical position inside it            |

- `alignX` / `alignY` default to the center (`'center'` / `'middle'`) for every `side`
- Adornments inside do not affect the size of the main element
- Adornments with the same `side` and alignment are stacked on top of each other

#### Spacing

| Option                        | Applies to                           | Meaning                               |
| ----------------------------- | ------------------------------------ | ------------------------------------- |
| `gap` / `gapX` / `gapY`       | Adornments above, below, left, right | Spacing from the main element         |
| `inset` / `insetX` / `insetY` | Adornments inside                    | Distance from the main element's edge |

- Values set on the container are the defaults for all adornments. Passing the same option to `affixItem()` overrides it for that adornment only
- No spacing is added on sides without adornments
- `inset` accepts negative values to let an adornment stick out past the main element's edge
- On a centered axis, `inset` is applied equally to both edges, so the position does not change

```ts
const container = affix({ gap: 4, inset: 4 });
const title = affixItem({ side: 'top', gap: 16 }); // 16px spacing for this adornment only
const badge = affixItem({
  side: 'inside',
  alignX: 'right',
  alignY: 'top',
  inset: -8,
}); // sticks out at the top right
```

#### Container Width

By default, the container expands to the width of its parent. A main element without a set width, such as a progress bar, expands with the container.

With a fixed-width main element, such as an avatar, empty space appears around it, and adornments align to that area instead of the main element. In this case, set `hug: true` to shrink the container to fit the main element and its adornments.

```ts
const container = affix({ hug: true });
const badge = affixItem({ side: 'inside', alignX: 'right', alignY: 'top' });
```

> **Note:** If you set `hug` with a main element that has no set width, the main element becomes as wide as the adornments above and below it (or 0 if there are none).

#### Styles Applied to the Main Element

- Only `grid-area` and `align-self: center` for placement (zero specificity)
- If multiple child elements become the main element, they are stacked on top of each other. Wrap them in a `div` or similar if you don't want them to overlap

#### Limitations

- **Adornments larger than the main element:** The main element is centered in its row (column). Alignments other than `'middle'` / `'center'` and the position of adornments inside are based on the row (column), not the main element, so they may not line up with the main element
- **Height of the main element:** The main element is centered in its row instead of stretched, so even a main element without a set height does not grow to the row's height. Set `align-self: stretch` on the main element to stretch it
- **Stacking order of adornments inside:** Adornments inside have `z-index: 1` so that they appear above the main element. If this affects how they overlap other elements on the page, set `z-index` on the adornment to adjust it

### `sticker`

Sticks adornments above, below, left, right of, or inside the main element. Adornments do not take up space in the layout, so their presence or size does not change the size of the main element or the placement of surrounding elements.

```ts
import { sticker, stickerItem } from '@fringeworks/style-layouts-adornment';

const container = sticker({ hug: true, inset: -8 });
const badge = stickerItem({ side: 'inside', alignX: 'right', alignY: 'top' });
```

#### Placement and Spacing

`side` / `alignX` / `alignY` and `gap` / `inset` work the same as in [`affix`](#affix).

- Adornments above, below, left, and right are overlaid outside the main element. They may overlap surrounding elements
- Adornments above, below, left, and right do not wrap at the container width (`width: max-content`, zero specificity)
- Even if an adornment is larger than the main element, the size and position of the main element do not change. Centered adornments line up with the center of the main element

#### Container Width

As with [`affix`](#affix), the container expands to the width of its parent by default, and shrinks to fit the main element with `hug: true`. Set `hug: true` for a fixed-width main element such as an avatar.

> **Note:** If you set `hug` with a main element that has no set width, the main element's width becomes 0.

#### Styles Applied to the Main Element

- None. Only `position: relative` is set on the container

#### Limitations

- **Overlapping surrounding elements:** Adornments above, below, left, and right do not take up space in the layout, so they may overlap surrounding elements. Add space around the container if you don't want them to overlap
- **Stacking order of adornments:** Adornments have `z-index: 1`. If this affects how they overlap other elements on the page, set `z-index` on the adornment to adjust it
- **Centering in Chrome / Edge 103 and earlier:** In browsers that do not support the `translate` property, `'center'` for adornments above and below and `'middle'` for adornments on the left and right are centered with a different technique. In that case, setting the width of an adornment above or below (or the height of one on the left or right) to `auto` makes it stretch across the width (height) of the screen. To change the width or height of an adornment, use a concrete value instead of `auto`

## API

### `affix`

```ts
affix(options?: AffixOptions): LayoutStyle
```

Returns the class names and styles for the container of the `affix` layout.

| Option    | Type      | Description                                                                                   |
| --------- | --------- | --------------------------------------------------------------------------------------------- |
| `hug?`    | `boolean` | Fit the container width to the main element and adornments (default `false`)                  |
| `gap?`    | `number`  | Spacing between the main element and adornments above, below, left, right (px, both axes)     |
| `gapX?`   | `number`  | Spacing between the main element and adornments on the left and right (px)                    |
| `gapY?`   | `number`  | Spacing between the main element and adornments above and below (px)                          |
| `inset?`  | `number`  | Distance from the main element's edges to adornments inside (px, both axes, negative allowed) |
| `insetX?` | `number`  | Distance from the main element's left and right edges to adornments inside (px)               |
| `insetY?` | `number`  | Distance from the main element's top and bottom edges to adornments inside (px)               |

### `affixItem`

```ts
affixItem(options: AffixItemOptions): LayoutStyle
```

Returns the class names and styles for an adornment of the `affix` layout. The available options depend on `side`.

| Option    | Type                       | Description                                                                          | Available `side`                            |
| --------- | -------------------------- | ------------------------------------------------------------------------------------ | ------------------------------------------- |
| `side`    | [`Side`](#side-values)     | Placement relative to the main element                                               | All                                         |
| `alignX?` | [`AlignX`](#alignx-values) | Horizontal position (default `'center'`)                                             | `'top'` / `'bottom'` / `'inside'`           |
| `alignY?` | [`AlignY`](#aligny-values) | Vertical position (default `'middle'`)                                               | `'left'` / `'right'` / `'inside'`           |
| `gap?`    | `number`                   | Spacing from the main element; overrides the container value (px, both axes)         | `'top'` / `'bottom'` / `'left'` / `'right'` |
| `gapX?`   | `number`                   | Same as above (px, horizontal)                                                       | `'top'` / `'bottom'` / `'left'` / `'right'` |
| `gapY?`   | `number`                   | Same as above (px, vertical)                                                         | `'top'` / `'bottom'` / `'left'` / `'right'` |
| `inset?`  | `number`                   | Distance from the main element's edge; overrides the container value (px, both axes) | `'inside'`                                  |
| `insetX?` | `number`                   | Same as above (px, horizontal)                                                       | `'inside'`                                  |
| `insetY?` | `number`                   | Same as above (px, vertical)                                                         | `'inside'`                                  |

Combinations that are not allowed (such as `alignY` with `side: 'top'`) are type errors.

### `sticker`

```ts
sticker(options?: StickerOptions): LayoutStyle
```

Returns the class names and styles for the container of the `sticker` layout. The options are the same as for `affix()`.

### `stickerItem`

```ts
stickerItem(options: StickerItemOptions): LayoutStyle
```

Returns the class names and styles for an adornment of the `sticker` layout. The options are the same as for `affixItem()`.

### Helpers

```ts
import extractAffixOptions from '@fringeworks/style-layouts-adornment/helpers/extractAffixOptions';
import extractAffixItemOptions from '@fringeworks/style-layouts-adornment/helpers/extractAffixItemOptions';
import extractStickerOptions from '@fringeworks/style-layouts-adornment/helpers/extractStickerOptions';
import extractStickerItemOptions from '@fringeworks/style-layouts-adornment/helpers/extractStickerItemOptions';

extractAffixOptions<T>(record: T): [AffixOptions, Omit<T, keyof AffixOptions>]
extractAffixItemOptions<T>(record: T): [AffixItemOptions, Omit<T, keyof AffixItemOptions>]
extractStickerOptions<T>(record: T): [StickerOptions, Omit<T, keyof StickerOptions>]
extractStickerItemOptions<T>(record: T): [StickerItemOptions, Omit<T, keyof StickerItemOptions>]
```

Splits an object into the options for each layout function and the remaining properties. Useful for picking options out of component props.

### `Side` Values

| Value      | Placement                        |
| ---------- | -------------------------------- |
| `'top'`    | Above the main element           |
| `'bottom'` | Below the main element           |
| `'left'`   | Left of the main element         |
| `'right'`  | Right of the main element        |
| `'inside'` | Overlaid inside the main element |

### `AlignX` Values

| Value      | Horizontal position |
| ---------- | ------------------- |
| `'left'`   | Left-aligned        |
| `'center'` | Centered            |
| `'right'`  | Right-aligned       |

### `AlignY` Values

| Value      | Vertical position |
| ---------- | ----------------- |
| `'top'`    | Top-aligned       |
| `'middle'` | Centered          |
| `'bottom'` | Bottom-aligned    |

The `Side` / `AlignX` / `AlignY` constants can be imported from `@fringeworks/style-layouts-adornment/constants`.

### Types

| Type                          | Description                                            |
| ----------------------------- | ------------------------------------------------------ |
| `LayoutStyle`                 | Return value of the layout functions                   |
| `AffixOptions`                | Options for `affix()`                                  |
| `AffixItemOptions`            | Options for `affixItem()` (union of the three below)   |
| `AffixItemTopBottomOptions`   | Options when `side` is `'top'` / `'bottom'`            |
| `AffixItemLeftRightOptions`   | Options when `side` is `'left'` / `'right'`            |
| `AffixItemInsideOptions`      | Options when `side` is `'inside'`                      |
| `StickerOptions`              | Options for `sticker()`                                |
| `StickerItemOptions`          | Options for `stickerItem()` (union of the three below) |
| `StickerItemTopBottomOptions` | Options when `side` is `'top'` / `'bottom'`            |
| `StickerItemLeftRightOptions` | Options when `side` is `'left'` / `'right'`            |
| `StickerItemInsideOptions`    | Options when `side` is `'inside'`                      |
| `HugOptions`                  | The `hug` option                                       |

```ts
type LayoutStyle = {
  className?: string;
  style?: {
    [key: `--${string}`]: string | undefined;
  };
};
```

## Browser Support

This library is built on modern CSS standards and supports the following major browser versions.

| Browser         | Supported Versions           |
| --------------- | ---------------------------- |
| Google Chrome   | 88 (January 2021) and later  |
| Microsoft Edge  | 88 (January 2021) and later  |
| Mozilla Firefox | 94 (November 2021) and later |
| Apple Safari    | 14.1 (April 2021) and later  |

## License

MIT
