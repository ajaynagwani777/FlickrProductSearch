/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Search from './search';
import Detail from './detail';

const Stack = createStackNavigator();

const AppStack = () => {
  return(
    <NavigationContainer>
    <Stack.Navigator screenOptions={{
      headerMode: 'none'
    }}>
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Detail" component={Detail} />
    </Stack.Navigator>
    </NavigationContainer>
  )
}


const App = () => {

  return (
    <AppStack/>
  );
};


export default App;
