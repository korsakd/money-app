import { Alert } from 'react-native';

export const confirmAlert = (
  title: string,
  message: string,
  func: () => void,
) => {
  Alert.alert(title, message, [
    {
      text: 'No',
      style: 'cancel',
    },
    {
      text: 'Yes',
      onPress: () => func(),
    },
  ]);
};
