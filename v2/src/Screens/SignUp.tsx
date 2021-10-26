import React, { useRef, useState } from 'react';
import { View, Text, FlatList, useWindowDimensions } from 'react-native';
import FirstStep from '../Components/SignUp/FirstStep';
import SecondStep from '../Components/SignUp/SecondStep';
import ThirdStep from '../Components/SignUp/ThirdStep';

const SignUp = () => {
  const steps = [1, 2, 3];
  const { width } = useWindowDimensions();
  const flatListRef = useRef<FlatList | null>(null);
  const [email, setEmail] = useState('');

  const renderItem = ({ item }: { item: number }) => {
    if (item === 1) {
      return (
        <FirstStep
          email={email}
          width={width}
          flatListRef={flatListRef}
          setEmail={setEmail}
        />
      );
    } else if (item === 2) {
      return (
        <SecondStep email={email} width={width} flatListRef={flatListRef} />
      );
    }
    return <ThirdStep width={width} flatListRef={flatListRef} />;
  };
  return (
    <FlatList
      initialScrollIndex={1}
      ref={ref => (flatListRef.current = ref)}
      data={steps}
      renderItem={renderItem}
      horizontal
      pagingEnabled
      scrollEnabled={false}
      bounces={false}
      showsHorizontalScrollIndicator={false}
      keyExtractor={item => `${item}`}
    />
  );
};

export default SignUp;
