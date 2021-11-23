import React from 'react';
import { View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedProps,
} from 'react-native-reanimated';
import Svg, { Defs, ClipPath, Circle, Rect, G, Path } from 'react-native-svg';

const AnimatedPath = Animated.createAnimatedComponent(Path);

type ProgressLineType = {
  width: number;
  step: Animated.SharedValue<number>;
};

const ProgressLine = ({ width, step }: ProgressLineType) => {
  const SIZE = width - 40;
  const RECT_WIDTH = (SIZE - 80) / 2;

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: interpolate(
      step.value,
      [1, 2, 3],
      [SIZE - 20, SIZE - 40 - RECT_WIDTH, 0],
    ),
  }));
  return (
    <View>
      <Svg
        width={`${width}`}
        height="20"
        viewBox={`0 0 ${SIZE} 20`}
        fill="none">
        <Defs>
          <ClipPath id="test">
            <Circle cx={'20'} cy="10" r="10" fill="#C4C4C4" />
            <Circle cx={`${SIZE / 2}`} cy="10" r="10" fill="#C4C4C4" />
            <Circle cx={`${SIZE - 20}`} cy="10" r="10" fill="#C4C4C4" />
            <Rect
              x="30"
              y="9"
              width={`${RECT_WIDTH}`}
              height="2"
              fill="#C4C4C4"
            />
            <Rect
              x={`${50 + RECT_WIDTH}`}
              y="9"
              width={`${RECT_WIDTH}`}
              height="2"
              fill="#C4C4C4"
            />
          </ClipPath>
        </Defs>
        <G clipPath={'url(#test)'}>
          <Circle cx={'20'} cy="10" r="10" fill="#C4C4C4" />
          <Circle cx={`${SIZE / 2}`} cy="10" r="10" fill="#C4C4C4" />
          <Circle cx={`${SIZE - 20}`} cy="10" r="10" fill="#C4C4C4" />
          <Rect
            x="30"
            y="9"
            width={`${RECT_WIDTH}`}
            height="2"
            fill="#C4C4C4"
          />
          <Rect
            x={`${50 + RECT_WIDTH}`}
            y="9"
            width={`${RECT_WIDTH}`}
            height="2"
            fill="#C4C4C4"
          />
          <AnimatedPath
            d={`M0 10H${SIZE}`}
            stroke="tomato"
            strokeWidth="20"
            x="10"
            strokeDasharray={SIZE}
            animatedProps={animatedProps}
          />
        </G>
      </Svg>
    </View>
  );
};

export default ProgressLine;
