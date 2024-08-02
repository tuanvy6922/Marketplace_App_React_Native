import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AddSlider from './AddSlider'
import SliderMananegement from './SliderManagement'
import UpdateSlider from './UpdateSlider'

const Stack = createNativeStackNavigator()
const StackNavigatorSlide = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name= 'SliderScreen' component={SliderMananegement} options={{
            headerShown:false,
         }}/>
        <Stack.Screen name='AddSlider' component={AddSlider} options={{headerTitle:'Thêm Slider'}}/>
        <Stack.Screen name='UpdateSlider' component={UpdateSlider} options={{headerTitle:'Cập nhật Slider'}}/>
    </Stack.Navigator>   
  )
}

export default StackNavigatorSlide;