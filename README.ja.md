# @fringeworks/style-layouts-adornment

`@fringeworks/style-layouts-adornment` は、本体となる要素の周りや上にラベルやバッジなどの装飾をCSSで配置するレイアウトを集めた、誰かにとっては便利なライブラリです。\
オプションに応じたクラス名とCSS変数をオブジェクトとして返します。フレームワーク非依存でSSRにも対応しています。

**[English README is available here](./README.md)**

## 特徴

- プログレスバーのラベルやアバターのバッジなど、本体に装飾を添えるレイアウトをクラスとCSS変数だけで実現
- 本体にはスタイルをほとんど当てない（配置に必要な指定のみ、詳細度0）
- フレームワーク非依存（あらゆるJS環境で動作）
- SSR対応（クラス名とインラインスタイルオブジェクトを返すだけ）
- TypeScriptによる完全な型サポート

`@fringeworks/style-layouts` シリーズのライブラリですが、`@fringeworks/style-layouts` とは独立して使用できます。

## インストール

```bash
npm install @fringeworks/style-layouts-adornment
# または
pnpm add @fringeworks/style-layouts-adornment
```

## 使い方

各レイアウトは、コンテナ用の関数と装飾用の関数（`<レイアウト名>Item`）の組で提供します。どちらも `{ className, style }` オブジェクトを返すので、コンテナと装飾の要素にそれぞれ適用してください。装飾用の関数を適用していない子要素が本体になります。

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

### CSSの読み込み

レイアウト関数はCSSをインポートしないため、SSRやReact Server Componentsでもそのまま使用できます。CSSは別途インポートしてください。

```ts
// 全レイアウトをまとめてインポート
import '@fringeworks/style-layouts-adornment/styles.css';

// 必要なレイアウトのみインポート
import '@fringeworks/style-layouts-adornment/affix.css';
```

CSSを自動的に読み込みたい場合は `with-css` 配下のモジュールを使用してください。CSSのインポートを扱えるバンドラーが必要です。

```ts
import {
  affix,
  affixItem,
} from '@fringeworks/style-layouts-adornment/with-css';
```

## 本体と装飾

- 装飾用の関数を適用していない子要素が本体になります
- [`sizingX` / `sizingY`](#大きさの決め方) を指定しない場合、本体に当てるスタイルは、レイアウトごとの配置に必要な最小限のものだけです。どれも詳細度0なので、本体に指定したスタイルが常に優先されます
- 本体は要素である必要があります。コンテナの直下に置いたテキストは本体として扱われません
- 装飾の位置は `side` で指定し、本体に対する揃え方を `alignX` / `alignY` で指定します

```
                 top
          ┌──────────────┐
    left  │    inside    │  right
          └──────────────┘
                bottom
```

## 大きさの決め方

`sizingX`（横方向）と `sizingY`（縦方向）で、本体とコンテナの大きさの決め方を指定します。どのレイアウトでも同じ値を使い、縦と横で別々に指定できます。

| 値       | コンテナの大きさ                           | 本体の大きさ                                                         |
| -------- | ------------------------------------------ | -------------------------------------------------------------------- |
| 未指定   | 横は親要素に合わせ、縦は中身に合わせる     | 本体に触れない（幅を指定しない本体は横に広がり、それ以外はそのまま） |
| `'fill'` | 横は親要素に合わせ、縦は中身に合わせる     | コンテナに合わせて伸び縮みする                                       |
| `'keep'` | 横は親要素に合わせ、縦は中身に合わせる     | 本体の大きさのまま、コンテナの中央に置く                             |
| `'hug'`  | 本体（affix では本体と装飾）に合わせて縮む | 本体の大きさのまま                                                   |

```ts
// プログレスバー: 幅はコンテナに合わせ、高さはバーのまま
affix({ sizingX: 'fill', sizingY: 'keep' });

// アバターのバッジ: コンテナをアバターに合わせ、装飾をアバターに揃える
sticker({ sizingX: 'hug', sizingY: 'hug' });

// カード: 本体をコンテナいっぱいに広げる
affix({ sizingX: 'fill', sizingY: 'fill' });
```

- `'fill'` / `'keep'` / `'hug'` を指定した場合は、本体の大きさや配置のスタイル（`width` / `height` / `justify-self` / `align-self` など）を通常の詳細度で上書きします。本体にインラインスタイル（`style` 属性）で指定した大きさは上書きできません
- `'fill'` で縦方向を合わせるには、コンテナの高さが決まっている必要があります（高さの指定や、親の flex / grid による伸長など）。決まっていない場合、本体は中身の高さになります
- `'keep'` で本体がコンテナより大きい場合、本体は右と下にはみ出します
- `'keep'` / `'hug'` では本体の大きさを保つため、幅（高さ）を指定しない本体は中身の大きさになります。プログレスバーのように中身のない本体では0になります
- **コンテナの大きさの指定と `'hug'`:** コンテナにクラスなどのCSSで指定した `width` / `height` は、`'hug'` で上書きされます。インラインスタイル（`style` 属性）で指定した場合はそちらが優先され、`'hug'` は効きません

## レイアウト種別

| レイアウト | 上下左右の装飾の場所         | 向いている用途                                             |
| ---------- | ---------------------------- | ---------------------------------------------------------- |
| `affix`    | レイアウト上の場所を確保する | プログレスバーのラベルなど、周りの要素と重ねたくない装飾   |
| `sticker`  | 場所を確保せず、上に貼る     | 通知バッジなど、装飾の有無でレイアウトを動かしたくない装飾 |

### `affix`

本体の上下左右や内側に装飾を配置します。上下左右の装飾はレイアウト上の場所を確保するため、周りの要素と重なりません。

```ts
import { affix, affixItem } from '@fringeworks/style-layouts-adornment';

const container = affix({ gap: 4 });
const title = affixItem({ side: 'top', alignX: 'left' });
```

#### 配置

| `side`               | 配置               | `alignX`                 | `alignY`                 |
| -------------------- | ------------------ | ------------------------ | ------------------------ |
| `'top'` / `'bottom'` | 本体の上 / 下      | 本体の幅の中での横位置   | 指定不可（本体に接する） |
| `'left'` / `'right'` | 本体の左 / 右      | 指定不可（本体に接する） | 本体の高さの中での縦位置 |
| `'inside'`           | 本体の内側に重ねる | 本体の内側での横位置     | 本体の内側での縦位置     |

- `alignX` / `alignY` のデフォルトは、どの `side` でも中央（`'center'` / `'middle'`）です
- 内側の装飾は本体のサイズに影響しません
- 同じ `side` と揃え方の装飾は、重ねて配置されます

#### 間隔

| オプション                    | 対象           | 内容               |
| ----------------------------- | -------------- | ------------------ |
| `gap` / `gapX` / `gapY`       | 上下左右の装飾 | 本体との間隔       |
| `inset` / `insetX` / `insetY` | 内側の装飾     | 本体の端からの距離 |

- コンテナに指定した値は、全ての装飾のデフォルトになります。`affixItem()` に同じ名前で指定すると、その装飾だけ上書きできます
- 装飾のない側には間隔ができません
- `inset` には負の値を指定でき、本体の端からはみ出させることができます
- 中央寄せの軸では、`inset` は両端に同じ値が入るため、位置は変わりません

```ts
const container = affix({ gap: 4, inset: 4 });
const title = affixItem({ side: 'top', gap: 16 }); // この装飾だけ間隔16px
const badge = affixItem({
  side: 'inside',
  alignX: 'right',
  alignY: 'top',
  inset: -8,
}); // 右上にはみ出す
```

#### 本体に当てるスタイル

- `sizingX` / `sizingY` を指定しない場合は、配置のための `grid-area` と `align-self: center` のみです（詳細度0）。指定した場合は [大きさの決め方](#大きさの決め方) を参照してください
- 本体になる子要素が複数ある場合は、重ねて配置されます。重ねたくない場合は、それらを `div` などで囲んでください

#### 制限事項

- **装飾が本体より大きい場合:** 本体は行（列）の中央に配置されます。`'middle'` / `'center'` 以外の揃え方や内側の装飾の位置は、本体ではなく行（列）が基準になるため、本体とずれることがあります。`sizingX` / `sizingY` に `'fill'` を指定すると本体と行（列）が一致するため、この問題は起きません
- **本体の高さ:** `sizingY` を指定しない場合、本体は伸ばさずに行の中央に配置されるため、高さを指定しない本体も行の高さまでは伸びません。伸ばしたい場合は `sizingY: 'fill'` を指定してください
- **内側の装飾の重なり順:** 内側の装飾には `z-index: 1` を指定しています。本体の上に表示するためのもので、ページ上の他の要素との重なりに影響する場合は装飾に `z-index` を指定して調整してください

### `sticker`

本体の上下左右や内側に装飾を貼り付けます。装飾はレイアウト上の場所を確保しないため、装飾の有無や大きさによって本体の大きさや周りの要素の配置は変わりません。

```ts
import { sticker, stickerItem } from '@fringeworks/style-layouts-adornment';

const container = sticker({ sizingX: 'hug', sizingY: 'hug', inset: -8 });
const badge = stickerItem({ side: 'inside', alignX: 'right', alignY: 'top' });
```

#### 配置・間隔

`side` / `alignX` / `alignY` と `gap` / `inset` の考え方は [`affix`](#affix) と同じです。

- 上下左右の装飾は、本体の外側に重ねて表示されます。周りの要素と重なる場合があります
- 上下左右の装飾は、コンテナの幅で折り返さずに表示されます（`width: max-content`、詳細度0）
- 装飾が本体より大きい場合も、本体の大きさや位置は変わりません。中央寄せの装飾は本体の中央に揃います

#### 大きさの決め方

[大きさの決め方](#大きさの決め方) のとおりです。アバターのように幅を固定した本体では、`sizingX: 'hug'` / `sizingY: 'hug'` を指定してください。指定しない場合、コンテナは親要素の幅に広がり、装飾が本体から離れた位置に付きます。

#### 本体に当てるスタイル

- `sizingX` / `sizingY` を指定しない場合はありません。コンテナに `position: relative` を指定するだけです
- `'fill'` / `'keep'` を指定した場合は、コンテナを `display: grid` にし、本体に [大きさの決め方](#大きさの決め方) のスタイルを当てます

#### 制限事項

- **周りの要素との重なり:** 上下左右の装飾はレイアウト上の場所を確保しないため、周りの要素と重なることがあります。重ねたくない場合は、コンテナの周りに余白を設けてください
- **装飾の重なり順:** 装飾には `z-index: 1` を指定しています。ページ上の他の要素との重なりに影響する場合は、装飾に `z-index` を指定して調整してください
- **Chrome / Edge 103以前での中央寄せ:** `translate` プロパティに対応していないブラウザーでは、上下の装飾の `'center'` と左右の装飾の `'middle'` を別の方法で中央に揃えます。この場合、上下の装飾の幅（左右の装飾は高さ）を `auto` にすると、装飾が画面の幅（高さ）いっぱいに広がります。装飾の幅や高さを変える場合は、`auto` ではなく具体的な値を指定してください

## API

### `affix`

```ts
affix(options?: AffixOptions): LayoutStyle
```

`affix` レイアウトのコンテナのクラスとスタイルを返します。

| オプション | 型                       | 説明                                                      |
| ---------- | ------------------------ | --------------------------------------------------------- |
| `sizingX?` | [`Sizing`](#sizing-の値) | 横方向の大きさの決め方（未指定の場合は本体に触れない）    |
| `sizingY?` | [`Sizing`](#sizing-の値) | 縦方向の大きさの決め方（未指定の場合は本体に触れない）    |
| `gap?`     | `number`                 | 本体と上下左右の装飾との間隔 (px,横縦共通)                |
| `gapX?`    | `number`                 | 本体と左右の装飾との間隔 (px)                             |
| `gapY?`    | `number`                 | 本体と上下の装飾との間隔 (px)                             |
| `inset?`   | `number`                 | 本体の端から内側の装飾までの距離 (px,横縦共通,負の値も可) |
| `insetX?`  | `number`                 | 本体の左右の端から内側の装飾までの距離 (px)               |
| `insetY?`  | `number`                 | 本体の上下の端から内側の装飾までの距離 (px)               |

### `affixItem`

```ts
affixItem(options: AffixItemOptions): LayoutStyle
```

`affix` レイアウトの装飾のクラスとスタイルを返します。指定できるオプションは `side` によって異なります。

| オプション | 型                       | 説明                                                       | 指定できる `side`                           |
| ---------- | ------------------------ | ---------------------------------------------------------- | ------------------------------------------- |
| `side`     | [`Side`](#side-の値)     | 本体に対する配置                                           | すべて                                      |
| `alignX?`  | [`AlignX`](#alignx-の値) | 横位置 (デフォルト `'center'`)                             | `'top'` / `'bottom'` / `'inside'`           |
| `alignY?`  | [`AlignY`](#aligny-の値) | 縦位置 (デフォルト `'middle'`)                             | `'left'` / `'right'` / `'inside'`           |
| `gap?`     | `number`                 | 本体との間隔。コンテナの値を上書きする (px,横縦共通)       | `'top'` / `'bottom'` / `'left'` / `'right'` |
| `gapX?`    | `number`                 | 同上 (px,横方向)                                           | `'top'` / `'bottom'` / `'left'` / `'right'` |
| `gapY?`    | `number`                 | 同上 (px,縦方向)                                           | `'top'` / `'bottom'` / `'left'` / `'right'` |
| `inset?`   | `number`                 | 本体の端からの距離。コンテナの値を上書きする (px,横縦共通) | `'inside'`                                  |
| `insetX?`  | `number`                 | 同上 (px,横方向)                                           | `'inside'`                                  |
| `insetY?`  | `number`                 | 同上 (px,縦方向)                                           | `'inside'`                                  |

指定できない組み合わせ（`side: 'top'` に `alignY` を指定するなど）は型エラーになります。

### `sticker`

```ts
sticker(options?: StickerOptions): LayoutStyle
```

`sticker` レイアウトのコンテナのクラスとスタイルを返します。オプションは `affix()` と同じです。

### `stickerItem`

```ts
stickerItem(options: StickerItemOptions): LayoutStyle
```

`sticker` レイアウトの装飾のクラスとスタイルを返します。オプションは `affixItem()` と同じです。

### ヘルパー

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

オブジェクトを、各レイアウト関数のオプションとそれ以外のプロパティに分離します。コンポーネントのpropsからオプションを取り出す場合などに使用します。

### `Side` の値

| 値         | 配置               |
| ---------- | ------------------ |
| `'top'`    | 本体の上           |
| `'bottom'` | 本体の下           |
| `'left'`   | 本体の左           |
| `'right'`  | 本体の右           |
| `'inside'` | 本体の内側に重ねる |

### `AlignX` の値

| 値         | 横方向の位置 |
| ---------- | ------------ |
| `'left'`   | 左寄せ       |
| `'center'` | 中央寄せ     |
| `'right'`  | 右寄せ       |

### `AlignY` の値

| 値         | 縦方向の位置 |
| ---------- | ------------ |
| `'top'`    | 上寄せ       |
| `'middle'` | 中央寄せ     |
| `'bottom'` | 下寄せ       |

### `Sizing` の値

| 値       | 大きさの決め方                           |
| -------- | ---------------------------------------- |
| `'fill'` | 本体をコンテナに合わせる                 |
| `'keep'` | 本体の大きさを保ち、コンテナの中央に置く |
| `'hug'`  | コンテナを本体に合わせる                 |

`Side` / `AlignX` / `AlignY` / `Sizing` の定数は `@fringeworks/style-layouts-adornment/constants` からインポートできます。

### 型

| 型                            | 説明                                              |
| ----------------------------- | ------------------------------------------------- |
| `LayoutStyle`                 | レイアウト関数の戻り値                            |
| `AffixOptions`                | `affix()` のオプション                            |
| `AffixItemOptions`            | `affixItem()` のオプション（下記3つのユニオン）   |
| `AffixItemTopBottomOptions`   | `side` が `'top'` / `'bottom'` の場合のオプション |
| `AffixItemLeftRightOptions`   | `side` が `'left'` / `'right'` の場合のオプション |
| `AffixItemInsideOptions`      | `side` が `'inside'` の場合のオプション           |
| `StickerOptions`              | `sticker()` のオプション                          |
| `StickerItemOptions`          | `stickerItem()` のオプション（下記3つのユニオン） |
| `StickerItemTopBottomOptions` | `side` が `'top'` / `'bottom'` の場合のオプション |
| `StickerItemLeftRightOptions` | `side` が `'left'` / `'right'` の場合のオプション |
| `StickerItemInsideOptions`    | `side` が `'inside'` の場合のオプション           |
| `SizingOptions`               | `sizingX` / `sizingY` オプション                  |

```ts
type LayoutStyle = {
  className?: string;
  style?: {
    [key: `--${string}`]: string | undefined;
  };
};
```

## 動作環境（対応ブラウザー）

本ライブラリはモダンCSSの標準仕様を用いて設計されており、下記のメジャーなブラウザーのバージョンに対応しています。

| ブラウザー      | 対応バージョン        |
| --------------- | --------------------- |
| Google Chrome   | 88 (2021年1月) 以降   |
| Microsoft Edge  | 88 (2021年1月) 以降   |
| Mozilla Firefox | 94 (2021年11月) 以降  |
| Apple Safari    | 14.1 (2021年4月) 以降 |

## ライセンス

MIT
