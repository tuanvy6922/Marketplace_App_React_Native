import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigatorCategory from './StackNavigatorCategory';
import AdminScreen from './AdminScreen';
import StackNavigatorSlide from './StackNavigatorSlide';
import StackUser from "./StackUser"

const Drawer = createDrawerNavigator();
const AdminDrawer = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={AdminScreen} options={{headerShown:false}}/>
      <Drawer.Screen name="User" component={StackUser} options={{headerShown:false}}/>
      <Drawer.Screen name="Slider" component={StackNavigatorSlide} 
      options={{headerShown:false}}/>
      <Drawer.Screen name="Category" component={StackNavigatorCategory} options={{headerShown:false}} />
    </Drawer.Navigator>
  )
}
export default AdminDrawer

