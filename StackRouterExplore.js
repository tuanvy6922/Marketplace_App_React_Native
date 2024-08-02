import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ItemList from './Apps/screens/ItemList'
import ProductDetail from './Apps/screens/ProductDetail'
import ExploreScreen from './Apps/screens/ExploreScreen'

const Stack = createNativeStackNavigator()
export default function StackRouter() {
  return (
   <Stack.Navigator>
        <Stack.Screen name='Explore' component={ExploreScreen} options={{headerShown:false}}/>
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