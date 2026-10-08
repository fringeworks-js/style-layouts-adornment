import createContainerModel from '../_shared/createContainerModel';
import type { LayoutName, StoryArgs } from '../_shared/types';
import createContainer from './createContainer';
import LAYOUTS from './layouts';

export default function createRenderer(name: LayoutName) {
  const layout = LAYOUTS[name];
  return (args: StoryArgs) =>
    createContainer(layout, createContainerModel(args));
}
