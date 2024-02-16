import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Main from './screens/Main';
import ProductDetail from './screens/ProductDetail';
import Cart from './screens/Cart';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import CheckOut from './screens/CheckOut';
import Address from './screens/Address';
import AddAddress from './screens/AddAddress';
const Stack = createStackNavigator();
const AppNavigator = () => {
 
  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name='Main' component={Main} options={{headerShown:false}}/>
            <Stack.Screen name='ProductDetail' component={ProductDetail} options={{headerShown:false}}/>
            <Stack.Screen name='Cart' component={Cart} options={{headerShown:false}}/>
            <Stack.Screen name='Login' component={Login} options={{headerShown:false}}/>
            <Stack.Screen name='SignUp' component={SignUp} options={{headerShown:false}}/>
            <Stack.Screen name='CheckOut' component={CheckOut} options={{headerShown:false}}/>
            <Stack.Screen name='Address' component={Address} options={{headerShown:false}}/>
            <Stack.Screen name='AddAddress' component={AddAddress} options={{headerShown:false}}/>
        </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
