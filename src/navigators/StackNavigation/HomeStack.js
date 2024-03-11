import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../../screens/Home/Home';
import ZodiacDetail from '../../screens/Home/ZodiacDetail';
import ZodiacRelationship from '../../screens/Home/ZodiacRelationship';
import ZodiacRelationshipDetail from '../../screens/Home/ZodiacRelationshipDetail';
import Tarot from '../../screens/Home/Tarot';
import TarotDetail from '../../screens/Home/TarotDetail';
import Blog from '../../screens/Home/Blog';
import ChooseTeller from '../../screens/Home/ChooseTeller';
import CoffeeImageUpload from '../../screens/Home/CoffeeImageUpload';
import Waiting from '../../screens/Home/Waiting';
import CoffeResult from '../../screens/Home/CoffeeResult';
import BlogDetail from '../../screens/Home/BlogDetail';
import CoffeContinue from '../../screens/Home/CoffeeContinue';
import CoffeFinished from '../../screens/Home/CoffeeFinished';
import WalletStack from './WalletStack';
import WaitingStack from './WaitingStack';
import Discover from '../../screens/Home/Discover';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="ZodiacDetail" component={ZodiacDetail} />
      <Stack.Screen name="ZodiacRelationship" component={ZodiacRelationship} />
      <Stack.Screen
        name="ZodiacRelationshipDetail"
        component={ZodiacRelationshipDetail}
      />
      <Stack.Screen name="Tarot" component={Tarot} />
      <Stack.Screen name="TarotDetail" component={TarotDetail} />
      <Stack.Screen name="Blog" component={Blog} />
      <Stack.Screen name="BlogDetail" component={BlogDetail} />
      <Stack.Screen name="ChooseTeller" component={ChooseTeller} />
      <Stack.Screen
        name="CoffeeImageUpload"
        component={CoffeeImageUpload}
        options={{
          tabBarStyle: {display: 'none'},
        }}
      />
      <Stack.Screen name="WaitingStack" component={WaitingStack} />
      <Stack.Screen name="CoffeResult" component={CoffeResult} />
      <Stack.Screen name="CoffeContinue" component={CoffeContinue} />
      <Stack.Screen name="CoffeFinished" component={CoffeFinished} />
      <Stack.Screen name="WalletStack" component={WalletStack} />
      <Stack.Screen name="Discover" component={Discover} />
    </Stack.Navigator>
  );
};
export default HomeStack;
