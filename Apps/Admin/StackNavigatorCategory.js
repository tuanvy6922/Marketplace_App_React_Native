import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AddCategory from './AddCategrory'
import UpdateCategory from './UpdateCategory'
import CategoryManagement from "./CategoryManagement"
import { Button } from 'react-native-paper'

const Stack = createNativeStackNavigator()
const StackNavigatorCategory = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name= 'CategoryScreen' component={CategoryManagement} options={{
            headerShown:false,
         }}/>
        <Stack.Screen name='AddCategory' component={AddCategory} options={{headerTitle:'Thêm thể loại'}}/>
        <Stack.Screen name='UpdateCategory' component={UpdateCategory} options={{headerTitle:'Cập nhật thể loại'}}/>
    </Stack.Navigator>   
  )
}

export default StackNavigatorCategory;