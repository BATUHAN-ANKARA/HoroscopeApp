import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Waiting from '../../screens/Home/Waiting';

const Stack = createStackNavigator();

const WaitingStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="Waiting"
        component={Waiting}
        options={{
          tabBarStyle: {display: 'none'},
        }}
      />
    </Stack.Navigator>
  );
};

export default WaitingStack;
