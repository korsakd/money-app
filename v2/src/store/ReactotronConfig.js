import AsyncStorage from '@react-native-community/async-storage';
import Reactotron, { trackGlobalErrors } from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';

console.tron = Reactotron.logImportant;
//AsyncStorage.clear();
const reactotron = Reactotron.setAsyncStorageHandler(AsyncStorage)
  .configure({ name: 'MoneyApp' })
  .useReactNative()
  .use(trackGlobalErrors({}))
  .use(reactotronRedux())
  .connect();

export default reactotron;
