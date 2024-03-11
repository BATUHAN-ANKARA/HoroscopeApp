import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Profile from '../../screens/Profile/Profile';
import AccountInfo from '../../screens/Profile/AccountInfo';
import Orders from '../../screens/Profile/Orders';
import Favorites from '../../screens/Favorites/Favorites';
import FavoritesDetail from '../../screens/Favorites/FavoritesDetail';

const Stack = createStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="AccountInfo" component={AccountInfo} />
      <Stack.Screen name="Orders" component={Orders} />
      <Stack.Screen name="Favorites" component={Favorites} />
      <Stack.Screen name="FavoritesDetail" component={FavoritesDetail} />
    </Stack.Navigator>
  );
};
export default ProfileStack;
