import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Wallet from '../../screens/Wallet/Wallet';
import Payment1 from '../../screens/Wallet/Payment1';
import ProfileStack from './ProfileStack';
import BrowserStack from './BrowserStack';
import Browser from '../../screens/Browser/Browser';

const Stack = createStackNavigator();

const WalletStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Wallet" component={Wallet} />
      <Stack.Screen name="Payment1" component={Payment1} />
      <Stack.Screen name="ProfileStack" component={ProfileStack} />
      <Stack.Screen name="BrowserStack" component={BrowserStack} />
      <Stack.Screen name="Browser" component={Browser} />
    </Stack.Navigator>
  );
};
export default WalletStack;
