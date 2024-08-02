import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ProfileScreen from './Apps/screens/ProfileScreen'
import MyProductScreen from './Apps/screens/MyProductScreen'
import ProductDetail from './Apps/screens/ProductDetail'
import ChangePassword from './Apps/screens/ChangePassword'
import FavouriteList from './Apps/screens/FavouriteList'

const Stack = createNativeStackNavigator()
export default function StackRouter() {
  return (
   <Stack.Navigator>
        <Stack.Screen name='Profile' component={ProfileScreen} options={{headerShown:false}}/>
        <Stack.Screen name='MyProduct' component={MyProductScreen}
        options={{
          headerTintColor:'white',
          headerStyle:{
            backgroundColor:'#3399ff'
          },
          headerTitle:'Sản phẩm của tôi'
        }}/>
      <Stack.Screen name='product-detail' component={ProductDetail}
        options={{
          headerTintColor:'white',
          headerStyle:{
            backgroundColor:'#3399ff'
          },
          headerTitle:'Chi tiết sản phẩm'
        }}/>
      <Stack.Screen name= "ChangePassword" component={ChangePassword} options={{
        headerTitle:"Đổi mật khẩu"
      }}/>
      <Stack.Screen name="Favourite" component={FavouriteList} options={{
          headerTintColor:'white',
          headerStyle:{
            backgroundColor:'#3399ff'
          },
          headerTitle:'Danh sách yêu thích'
        }}/> 
   </Stack.Navigator>
  )
}