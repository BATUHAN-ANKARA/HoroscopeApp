import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeStack from '../StackNavigation/HomeStack';
import ProfileStack from '../StackNavigation/ProfileStack';
import {View, Platform} from 'react-native';
import DiceStack from '../StackNavigation/DiceStack';
import MessagesStack from '../StackNavigation/MessagesStack';
import DiceSvg from '../../../assets/svg/DiceSvg';
import DiceBlackSvg from '../../../assets/svg/DiceBlackSvg';
import MatchesStack from '../StackNavigation/MatchesStack';

const Bottom = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Bottom.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: '#73DBC8',
            height: Platform.OS === 'android' ? 70 : 99,
            flexDirection: 'row',
            tabBarIconStyle: {display: 'none'},
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
          },
        }}>
        <Bottom.Screen
          name="HomeStack"
          component={HomeStack}
          options={{
            tabBarIcon: ({focused}) => (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {focused ? (
                  <View
                    style={{
                      backgroundColor: '#fff',
                      borderRadius: 12,
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: 5,
                    }}>
                    <Ionicons name="home-outline" size={35} color={'#000'} />
                  </View>
                ) : (
                  <Ionicons name="home-outline" size={35} color={'#fff'} />
                )}
              </View>
            ),
          }}
        />

        <Bottom.Screen
          name="DiceStack"
          component={DiceStack}
          options={{
            tabBarIcon: ({focused}) => (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {focused ? (
                  <View
                    style={{
                      backgroundColor: '#fff',
                      borderRadius: 12,
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: 8,
                    }}>
                    <DiceBlackSvg />
                  </View>
                ) : (
                  <DiceSvg />
                )}
              </View>
            ),
          }}
        />

        <Bottom.Screen
          name="MessagesStack"
          component={MessagesStack}
          options={{
            tabBarIcon: ({focused}) => (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {focused ? (
                  <View
                    style={{
                      backgroundColor: '#fff',
                      borderRadius: 12,
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: 5,
                    }}>
                    <Ionicons
                      name="chatbox-ellipses-outline"
                      size={35}
                      color={'#000'}
                    />
                  </View>
                ) : (
                  <Ionicons
                    name="chatbox-ellipses-outline"
                    size={35}
                    color={'#fff'}
                  />
                )}
              </View>
            ),
          }}
        />

        <Bottom.Screen
          name="MatchesStack"
          component={MatchesStack}
          options={{
            tabBarHideOnKeyboard: true,
            tabBarIcon: ({focused}) => (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {focused ? (
                  <View
                    style={{
                      backgroundColor: '#fff',
                      borderRadius: 12,
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: 5,
                    }}>
                    <Ionicons name="heart-outline" size={35} color={'#000'} />
                  </View>
                ) : (
                  <Ionicons name="heart-outline" size={35} color={'#fff'} />
                )}
              </View>
            ),
          }}
        />
        <Bottom.Screen
          name="ProfileStack"
          component={ProfileStack}
          options={{
            tabBarHideOnKeyboard: true,
            tabBarIcon: ({focused}) => (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {focused ? (
                  <View
                    style={{
                      backgroundColor: '#fff',
                      borderRadius: 12,
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: 5,
                    }}>
                    <Ionicons
                      name="person-circle-outline"
                      size={35}
                      color={'#000'}
                    />
                  </View>
                ) : (
                  <Ionicons
                    name="person-circle-outline"
                    size={35}
                    color={'#fff'}
                  />
                )}
              </View>
            ),
          }}
        />
      </Bottom.Navigator>
    </View>
  );
};
export default BottomTab;
