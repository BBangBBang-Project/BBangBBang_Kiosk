import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import AddBreadScreen from '../screens/AddBreadScreen';
import EditBreadScreen from '../screens/EditBreadScreen';
import MainScreen from '../screens/MainScreen';
import ManageBreadScreen from '../screens/ManageBreadScreen';
import ManageScreen from '../screens/ManageScreen';
import NoPassWordScreen from '../screens/NoPasswordScreen';
import NoReservationScreen from '../screens/NoReservationScreen';
import PickupCompleteScreen from '../screens/PickupCompleteScreen';
import PickupScreen from '../screens/PickupScreen';
import PurchaseCompleteScreen from '../screens/PurchaseCompleteScreen';
import PurchaseScreen from '../screens/PurchaseScreen';
import RecommendationScreen from '../screens/RecommedationScreen';

const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerStyle: {},
        headerTintColor: 'black',
      }}>
      <Stack.Screen
        name="Main"
        component={MainScreen}
        options={{title: '', headerStyle: {backgroundColor: '#F3E3D3'}}}
      />
      <Stack.Screen
        name="Purchase"
        component={PurchaseScreen}
        options={{title: '', headerStyle: {backgroundColor: 'white'}}}
      />
      <Stack.Screen
        name="Pickup"
        component={PickupScreen}
        options={{title: '', headerStyle: {backgroundColor: '#F3E3D3'}}}
      />
      <Stack.Screen
        name="Manage"
        component={ManageScreen}
        options={{title: '', headerStyle: {backgroundColor: '#F3E3D3'}}}
      />
      <Stack.Screen
        name="AddBread"
        component={AddBreadScreen}
        options={{title: '', headerStyle: {backgroundColor: '#F3E3D3'}}}

      />
      <Stack.Screen
        name="NoPassword"
        component={NoPassWordScreen}
        options={{title: '', headerStyle: {backgroundColor: '#F3E3D3'}}}
      />
      <Stack.Screen
        name="NoReservation"
        component={NoReservationScreen}
        options={{title: ''}}
      />
      <Stack.Screen
        name="PickupComplete"
        component={PickupCompleteScreen}
        options={{title: '', headerStyle: {backgroundColor: '#F3E3D3'}}}
      />
      <Stack.Screen
        name="PurchaseComplete"
        component={PurchaseCompleteScreen}
        options={{title: '', headerStyle: {backgroundColor: '#F3E3D3'}}}
      />
      <Stack.Screen
        name="Recommedation"
        component={RecommendationScreen}
        options={{title: ''}}
      />
      <Stack.Screen
        name="ManageBread"
        component={ManageBreadScreen}
        options={{title: ''}}
      />
      <Stack.Screen
        name="EditBread"
        component={EditBreadScreen}
        options={{title: ''}}
      />
    </Stack.Navigator>
  );
};

export default StackNavigation;
