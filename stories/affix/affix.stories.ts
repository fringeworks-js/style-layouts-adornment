import type { Meta, StoryObj } from '../_internal/adapter';
import createRenderer from '../_internal/createRenderer';
import { ARG_TYPES } from '../_shared/constants';
import type { StoryArgs } from '../_shared/types';

const meta = {
  title: 'affix',
  render: createRenderer('affix'),
  argTypes: ARG_TYPES.affix,
} satisfies Meta<StoryArgs>;

export default meta;
type Story = StoryObj<StoryArgs>;

// ===== 基本 =====

/**
 * プログレスバーにラベルを付ける
 */
export const Default: Story = {
  args: {
    main: 'bar',
    top: 'left',
    right: 'middle',
    insideX: 'center',
    gap: '4',
  },
};

/**
 * 全てのsideに配置する
 */
export const AllSides: Story = {
  args: {
    main: 'box',
    hug: true,
    top: 'center',
    bottom: 'center',
    left: 'middle',
    right: 'middle',
    insideX: 'center',
    insideY: 'middle',
    gap: '4',
  },
};

/**
 * 内側の付属物を負のinsetで本体からはみ出させる
 */
export const Badge: Story = {
  args: {
    main: 'box',
    hug: true,
    insideX: 'right',
    insideY: 'top',
    inset: '-8',
  },
};

// ===== 間隔 =====

/**
 * 付属物のない側には間隔ができない
 */
export const GapOnlyWithItem: Story = {
  args: {
    main: 'box',
    hug: true,
    right: 'middle',
    gap: '24',
  },
};

/**
 * 付属物ごとにgap / insetを上書きする
 */
export const ItemOverride: Story = {
  args: {
    main: 'box',
    hug: true,
    top: 'left',
    bottom: 'left',
    insideX: 'right',
    insideY: 'top',
    gap: '4',
    inset: '4',
    topGap: '16',
    insideInset: '16',
  },
};

// ===== 制限事項 =====

/**
 * 付属物が本体より大きい場合、本体は行の中央に配置される
 *
 * 外側の付属物の揃えや内側の付属物の位置は、本体ではなく行(列)が基準になるため、
 * middle以外では本体とずれる
 */
export const LargeItem: Story = {
  args: {
    main: 'bar',
    left: 'middle',
    right: 'top',
    insideX: 'center',
    itemSize: 'large',
    gap: '4',
  },
};

/**
 * 本体の高さが未指定の場合も、本体は伸びずに行の中央に配置される
 *
 * 伸ばしたい場合は本体に`align-self: stretch`を指定する
 */
export const LargeItemAutoMain: Story = {
  args: {
    main: 'auto',
    left: 'middle',
    right: 'top',
    insideX: 'center',
    itemSize: 'large',
    gap: '4',
  },
};

/**
 * 幅を固定した本体でhugを指定しない場合、本体は列の左端に置かれ、揃えの基準は列になる
 *
 * hugを指定すると列の幅が本体に合い、付属物が本体に揃う
 */
export const FixedSizeMain: Story = {
  args: {
    main: 'box',
    hug: false,
    top: 'center',
    insideX: 'right',
    insideY: 'top',
    gap: '4',
  },
};

/**
 * 幅を指定しない本体(プログレスバーなど)でhugを指定すると、本体の幅は上下の付属物の幅になる
 *
 * 上下に付属物がない場合は0になる
 */
export const HugWithoutMainWidth: Story = {
  args: {
    main: 'bar',
    hug: true,
    top: 'left',
    right: 'middle',
    gap: '4',
  },
};

/**
 * コンテナーを親いっぱいに広げた場合、余った高さは本体の行に入り、本体はその中央に配置される
 */
export const FillContainer: Story = {
  args: {
    main: 'auto',
    sizing: 'fill',
    top: 'left',
    bottom: 'right',
    left: 'top',
    insideX: 'center',
    gap: '4',
  },
};
