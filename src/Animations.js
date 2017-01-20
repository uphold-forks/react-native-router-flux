import { NavigationSceneRendererProps } from 'react-native-experimental-navigation/NavigationTypeDefinition';

/**
 * Render the initial style when the initial layout isn't measured yet.
 */
function forInitial(props: NavigationSceneRendererProps): Object {
  const {
    navigationState,
    scene,
  } = props;

  const focused = navigationState.index === scene.index;
  const opacity = focused ? 1 : 0;
  // If not focused, move the scene to the far away.
  const translate = focused ? 0 : 1000000;
  return {
    opacity,
    transform: [
      { translateX: translate },
      { translateY: translate },
    ],
  };
}

function forHorizontal(props: NavigationSceneRendererProps): Object {
  const {
    layout,
    position,
    scene,
  } = props;

  if (!layout.isMeasured) {
    return forInitial(props);
  }

  const index = scene.index;
  const inputRange = [index - 1, index, index + 1];
  const width = layout.initWidth;

  const translateX = position.interpolate({
    inputRange,
    outputRange: [width, 0, 0],
  });

  return { transform: [{ translateX }] };
}

function forVertical(props: NavigationSceneRendererProps): Object {
  const {
    layout,
    position,
    scene,
  } = props;

  if (!layout.isMeasured) {
    return forInitial(props);
  }

  const index = scene.index;
  const inputRange = [index - 1, index, index + 1];
  const height = layout.initHeight;

  const translateY = position.interpolate({
    inputRange,
    outputRange: [height, 0, 0],
  });

  return { transform: [{ translateY }] };
}

module.exports = {
  forHorizontal,
  forVertical,
};
