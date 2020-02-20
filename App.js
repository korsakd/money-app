import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ActivityIndicator,
  Button,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

const Profile = () => {
  const [a, setA] = useState(0);
  return (
    <View>
      <Text>{a}</Text>
      <Button title="Press me" color="#f194ff" onPress={() => setA(a + 1)} />
    </View>
  );
};

// class Photo1 extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       nazavanie: 'Photo1',
//       a: 0,
//       cool: true,
//     };
//   }

//   calculation = () => {
//     return 2 + 5;
//   };

//   render() {
//     return (
//       <View>
//         <Text>{this.calculation()}</Text>
//         <Text>{this.state.nazavanie}</Text>
//         <Text>{this.state.a}</Text>
//         <Button
//           title="Press me"
//           color="#f194ff"
//           onPress={() => this.setState({a: this.state.a + 1})}
//         />
//       </View>
//     );
//   }
// }

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Profile />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  awesomeBlock: {
    flexDirection: 'row',
  },
});

export default App;
