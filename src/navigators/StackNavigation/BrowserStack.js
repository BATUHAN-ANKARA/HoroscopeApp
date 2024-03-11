import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Browser from '../../screens/Browser/Browser';

const Stack = createStackNavigator();

const BrowserStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Browser" component={Browser} />
    </Stack.Navigator>
  );
};
export default BrowserStack;
