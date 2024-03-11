import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Dice from '../../screens/Dice/Dice';
import DiceResult from '../../screens/Dice/DiceResult';
import DiceExplore from '../../screens/Dice/DiceExplore';

const Stack = createStackNavigator();

const DiceStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Dice" component={Dice} />
      <Stack.Screen name="DiceResult" component={DiceResult} />
      <Stack.Screen name="DiceExplore" component={DiceExplore} />
    </Stack.Navigator>
  );
};
export default DiceStack;
