import React from 'react';
import {View, Text} from 'react-native';
import FlashMessage from 'react-native-flash-message';
import Home from './src/screens/home/Home';

const App = () => {
  return (
    <View style={{flex: 1}}>
      <Home />
      <FlashMessage
        position="bottom"
        titleStyle={{fontSize: 20, fontWeight: '700'}}
      />
    </View>
  );
};

export default App;
