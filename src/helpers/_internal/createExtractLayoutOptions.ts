/**
 * ユニオン型の全てのメンバーのキー
 */
type AllKeys<T> = T extends unknown ? keyof T : never;

/**
 * レコードからレイアウトのオプションとそれ以外のプロパティを分離する関数を作成する
 *
 * @param optionsKeys レイアウトのオプションのキー
 */
export default function createExtractLayoutOptions<
  TOptions extends Record<string, unknown>,
>(optionKeys: AllKeys<TOptions>[]) {
  const keySet = new Set(optionKeys as unknown as string[]);

  /**
   * レコードからレイアウトのオプションとそれ以外のプロパティを分離する
   *
   * @param record レイアウトのオプションとその他のプロパティを含むレコード
   * @returns `[layoutOptions, rest]` のタプル。`layoutOptions` はレイアウトに対応するプロパティ、`rest` はそれ以外のプロパティ
   */
  return <T extends Record<string, unknown>>(
    record: T,
  ): [TOptions, Omit<T, AllKeys<TOptions>>] => {
    const options: Record<string, unknown> = {};
    const rest: Record<string, unknown> = {};
    if (record) {
      for (const [k, v] of Object.entries(record)) {
        (keySet.has(k) ? options : rest)[k] = v;
      }
    }
    return [options as TOptions, rest as Omit<T, AllKeys<TOptions>>];
  };
}
