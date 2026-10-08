import type { ContainerModel } from '../_shared/createContainerModel';
import assignStyle from './assignStyle';
import createResizableElement from './createResizableElement';
import type LAYOUTS from './layouts';

export default function createContainer(
  layout: (typeof LAYOUTS)[keyof typeof LAYOUTS],
  model: ContainerModel,
) {
  const {
    options,
    resizable,
    containerClassName,
    containerStyle,
    main,
    items,
    surroundings,
  } = model;
  const { className, style } = layout.container(options);

  const container = document.createElement('div');
  container.className = [className, containerClassName]
    .filter(Boolean)
    .join(' ');
  assignStyle(container, { ...containerStyle, ...style });

  // 装飾
  items.forEach(({ label, options, style }) => {
    const result = layout.item(options);
    const item = document.createElement('div');
    item.innerText = label;
    if (result.className) {
      item.className = result.className;
    }
    assignStyle(item, { ...style, ...result.style });
    container.appendChild(item);
  });

  // 本体
  const mainElement = document.createElement('div');
  mainElement.innerText = main.label;
  if (main.className) {
    mainElement.className = main.className;
  }
  assignStyle(mainElement, main.style);
  container.appendChild(mainElement);

  // リサイズ可能な領域
  const stage = document.createElement('div');
  const createSurrounding = () => {
    const element = document.createElement('p');
    if (surroundings) {
      element.innerText = surroundings.text;
      assignStyle(element, surroundings.style);
    }
    return element;
  };
  if (surroundings) {
    stage.appendChild(createSurrounding());
  }
  stage.appendChild(container);
  if (surroundings) {
    stage.appendChild(createSurrounding());
  }
  const { wrapper } = createResizableElement({
    element: stage,
    initialWidth: resizable.initialWidth,
    initialHeight: resizable.initialHeight,
  });
  assignStyle(wrapper, resizable.style);
  return wrapper;
}
