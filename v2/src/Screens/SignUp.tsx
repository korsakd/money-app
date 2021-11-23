import { RouteProp, useRoute } from '@react-navigation/core';
import React, { useCallback, useEffect, useRef } from 'react';
import { FlatList, useWindowDimensions, View } from 'react-native';
import { useSharedValue, withTiming } from 'react-native-reanimated';
import FirstStep from '../Components/SignUp/FirstStep';
import ProgressLine from '../Components/SignUp/ProgressLine';
import SecondStep from '../Components/SignUp/SecondStep';
import ThirdStep from '../Components/SignUp/ThirdStep';
import { MainStackParamList } from '../Navigation';

const SignUp = () => {
  const steps = [1, 2, 3];
  const { width } = useWindowDimensions();
  const flatListRef = useRef<FlatList | null>(null);
  const step = useSharedValue(1);
  const {
    params: { emailVerification },
  } = useRoute<RouteProp<MainStackParamList, 'SignUp'>>();
  const nextStep = (number: number) => {
    step.value = withTiming(number, { duration: 500 });
  };

  useEffect(() => {
    if (emailVerification) {
      nextStep(2);
      if (flatListRef.current) {
        flatListRef.current.scrollToIndex({
          index: 1,
          animated: false,
        });
      }
    }
  }, [emailVerification]);

  const renderItem = ({ item }: { item: number }) => {
    if (item === 1) {
      return (
        <FirstStep
          width={width}
          flatListRef={flatListRef}
          nextStep={nextStep}
        />
      );
    } else if (item === 2) {
      return (
        <SecondStep
          width={width}
          flatListRef={flatListRef}
          nextStep={nextStep}
        />
      );
    }
    return <ThirdStep width={width} />;
  };

  const getItemLayout = useCallback(
    (_: any, index: any) => ({
      index,
      length: width,
      offset: index * width,
    }),
    [width],
  );

  return (
    <>
      <View style={{ marginTop: 70 }}>
        <ProgressLine width={width} step={step} />
      </View>
      <FlatList
        ref={ref => (flatListRef.current = ref)}
        keyboardShouldPersistTaps={'handled'}
        data={steps}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        scrollEnabled={false}
        bounces={false}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => `${item}`}
        initialNumToRender={1}
        maxToRenderPerBatch={1}
        getItemLayout={getItemLayout}
      />
    </>
  );
};

export default SignUp;
