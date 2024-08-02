import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import UserManagement from './UserManagement'
import UpdateUser from './UpdateUser'

const Stack = createNativeStackNavigator()
const StackNavigatorSlide = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name= 'UserScreen' component={UserManagement} options={{
            headerShown:false,
         }}/>
        <Stack.Screen name='Update' component={UpdateUser} options={{headerTitle:'Tài khoản người dùng'}}/>
    </Stack.Navigator>   
  )
}

export default StackNavigatorSlide;