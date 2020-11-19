import { StyleSheet } from 'react-native';

const container = {
  borderColor: 'tomato',
  borderWidth: 1,
  borderRadius: 5,
  marginBottom: 10,
  padding: 10,
};
const buttonContainer = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
};
const text = { marginRight: 10, fontSize: 20, color: '#1c2b59' };

styles = StyleSheet.create({ container, buttonContainer, text });

export default styles;
