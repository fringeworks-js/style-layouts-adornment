import createTestModel from '../_shared/createTestModel';
import type { LayoutName, TestStoryArgs } from '../_shared/types';
import assignStyle from './assignStyle';
import LAYOUTS from './layouts';

export default function createTestRenderer(name: LayoutName) {
  const layout = LAYOUTS[name];
  return (args: TestStoryArgs) => {
    const {
      options,
      wrapperStyle,
      containerStyle,
      mains,
      items,
      surroundings,
    } = createTestModel(args);
    const { className, style } = layout.container(options);

    const wrapper = document.createElement('div');
    assignStyle(wrapper, wrapperStyle);

    const container = document.createElement('div');
    if (className) container.className = className;
    assignStyle(container, { ...containerStyle, ...style });

    // 装飾
    for (const item of items) {
      const result = layout.item(item.options);
      const element = document.createElement('div');
      element.dataset.testid = item.testId;
      element.textContent = item.text;
      if (result.className) element.className = result.className;
      assignStyle(element, { ...item.style, ...result.style });
      container.appendChild(element);
    }

    // 本体
    for (const main of mains) {
      const element = document.createElement('div');
      element.dataset.testid = main.testId;
      assignStyle(element, main.style);
      container.appendChild(element);
    }

    // コンテナの前後の要素
    const [before, after] = surroundings.map(({ testId, style }) => {
      const element = document.createElement('div');
      element.dataset.testid = testId;
      assignStyle(element, style);
      return element;
    });
    if (before) wrapper.appendChild(before);
    wrapper.appendChild(container);
    if (after) wrapper.appendChild(after);

    return wrapper;
  };
}
