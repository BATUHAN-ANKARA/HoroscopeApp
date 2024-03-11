import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Splash from '../screens/Splash';
import OnBoard from '../screens/OnBoard';
import AuthStack from './StackNavigation/AuthStack';
import BottomTab from './TabNavigation/BottomTab';

const Stack = createStackNavigator();
const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="OnBoard" component={OnBoard} />
        <Stack.Screen name="AuthStack" component={AuthStack} />
        <Stack.Screen name="BottomTab" component={BottomTab} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
