import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Messages from '../../screens/Messages/Messages';
import MessageDetail from '../../screens/Messages/MessageDetail';

const Stack = createStackNavigator();

const MessagesStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Messages" component={Messages} />
      <Stack.Screen name="MessageDetail" component={MessageDetail} />
    </Stack.Navigator>
  );
};
export default MessagesStack;
