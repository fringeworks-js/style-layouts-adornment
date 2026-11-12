import type { StyleResult } from '@fringeworks/style-utils';

/**
 * レイアウトのクラスとスタイル
 */
export type LayoutStyle = StyleResult;

// CSS 変数のオブジェクトの型（戻り値の `style`）。
// 利用者が `@fringeworks/style-utils` を入れずに使えるよう、ここから export する
export type { CSSCustomProperties } from '@fringeworks/style-utils';
