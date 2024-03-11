import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Matches from '../../screens/Matches/Matches';

const Stack = createStackNavigator();

const MatchesStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Matches" component={Matches} />
    </Stack.Navigator>
  );
};
export default MatchesStack;
