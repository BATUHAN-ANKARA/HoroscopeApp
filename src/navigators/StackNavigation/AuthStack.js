import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SignUp from '../../screens/Auth/SignUp';
import SignUpStep2 from '../../screens/Auth/SignUpStep2';
import BottomTab from '../TabNavigation/BottomTab';
import SignIn from '../../screens/Auth/SignIn';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="SignUpStep2" component={SignUpStep2} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="BottomTab" component={BottomTab} />
    </Stack.Navigator>
  );
};

export default AuthStack;
