import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './Apps/screens/HomeScreen'
import ItemList from './Apps/screens/ItemList'
import ProductDetail from './Apps/screens/ProductDetail'

const Stack = createNativeStackNavigator()
export default function StackRouter() {
  return (
   <Stack.Navigator>
        <Stack.Screen name='Home' component={HomeScreen} options={{headerShown:false}}/>
        <Stack.Screen name='item-list' component={ItemList}
          options={({route})=>({title: route.params.Category,
            headerTintColor:'white',
            headerStyle:{
                backgroundColor:'#3399ff'
        }})}/>
        <Stack.Screen name='product-detail' component={ProductDetail}
        options={{
          headerTintColor:'white',
          headerStyle:{
            backgroundColor:'#3399ff'
          },
          headerTitle:'Chi tiết sản phẩm'
        }}/>
   </Stack.Navigator>
  )
}