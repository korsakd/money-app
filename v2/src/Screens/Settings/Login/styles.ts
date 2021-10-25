import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

const container: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
};
const textInputContainer: ViewStyle = {
  width: '80%',
  marginBottom: 10,
  justifyContent: 'space-between',
};
const buttonContainer: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
};
const button: ViewStyle = {
  borderColor: 'tomato',
  borderWidth: 1,
  width: '49%',
  alignItems: 'center',
  padding: 10,
  borderRadius: 5,
};
const buttonText: TextStyle = { fontWeight: 'bold' };

export default StyleSheet.create({
  container,
  textInputContainer,
  buttonContainer,
  button,
  buttonText,
});
