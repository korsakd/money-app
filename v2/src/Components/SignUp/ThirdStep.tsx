import React, { useState } from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import UserImage from '../UserImage';
import NextButtonWithLoader from './NextButtonWithLoader';
import ImagePicker, { Image } from 'react-native-image-crop-picker';
import { useDispatch } from 'react-redux';
import { StackActions, useNavigation } from '@react-navigation/core';
import { finishRegistration } from '../../store/Thunks/loginThunks';
import UserInput from './UserInput';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { BLACK } from '../../Constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ErrorInfo from '../ErrorInfo';

type ThirdStepType = {
  width: number;
};

const ThirdStep = ({ width }: ThirdStepType) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const onFinishPress = async () => {
    if (!firstName || !lastName) {
      setError(!firstName ? 'Enter first name' : 'Enter last name');
      return;
    }
    try {
      setIsLoading(true);
      dispatch(finishRegistration(firstName, lastName, imageUri));
      setIsLoading(false);
      navigation.dispatch(StackActions.pop());
    } catch (error) {
      setIsLoading(false);
      console.log({ error });
    }
  };

  const onAddPhotoPress = () => {
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
      includeBase64: true,
    }).then((image: Image) => {
      setImageUri(`data:image/png;base64,${image.data}`);
    });
  };

  return (
    <KeyboardAwareScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps={'handled'}
      extraHeight={30}
      contentContainerStyle={[styles.mainContainer, { width }]}>
      <View style={styles.photoContainer}>
        <UserImage
          imageUri={imageUri}
          width={100}
          height={100}
          radius={50}
          firstName={'new'}
          lastName={'user'}
        />
        <Pressable style={styles.addButton} onPress={onAddPhotoPress}>
          <Icon name={'plus-thick'} size={20} color={'tomato'} />
        </Pressable>
      </View>
      <ErrorInfo error={error} />
      <View style={styles.inputWrap}>
        <UserInput
          title={'First name'}
          value={firstName}
          setValue={setFirstName}
          isRequiredField={true}
        />
        <UserInput
          title={'Last name'}
          value={lastName}
          setValue={setLastName}
          isRequiredField={true}
        />
      </View>
      <NextButtonWithLoader
        title={'Finish'}
        onPress={onFinishPress}
        isLoading={isLoading}
      />
    </KeyboardAwareScrollView>
  );
};

export default React.memo(ThirdStep);

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
    paddingTop: '20%',
  },
  photoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  addButton: {
    backgroundColor: BLACK,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    position: 'absolute',
    top: 0,
    right: 0,
  },
  inputWrap: {
    width: '100%',
    height: 140,
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  btn: {
    backgroundColor: 'tomato',
    width: '100%',
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 17 },
});
