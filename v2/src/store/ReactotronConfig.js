import Reactotron, { trackGlobalErrors } from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

console.tron = Reactotron.logImportant;

const reactotron = Reactotron.setAsyncStorageHandler(AsyncStorage)
  .configure({ name: 'MoneyApp' })
  .useReactNative()
  .use(trackGlobalErrors({}))
  .use(reactotronRedux())
  .connect();

export default reactotron;
