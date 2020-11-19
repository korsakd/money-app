import { StyleSheet } from 'react-native';

const container = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
};
const textInputContainer = {
  width: '80%',
  marginBottom: 10,
};
const buttonContainer = {
  flexDirection: 'row',
  justifyContent: 'space-between',
};
const button = {
  borderColor: 'tomato',
  borderWidth: 1,
  width: '49%',
  alignItems: 'center',
  padding: 10,
  borderRadius: 5,
};
const buttonText = { color: '#1c2b59', fontWeight: 'bold' };

styles = StyleSheet.create({
  container,
  textInputContainer,
  buttonContainer,
  button,
  buttonText,
});

export default styles;
