import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import LoginScreen from './LoginScreen';

const IntroScreen = ({navigation}) => {
  return (
    <View>
      <Image source={require('../../assets/login.png')}
        className="w-full h-[400px] object-cover"/>
        <View className="p-8 bg-white mt-[-20px] rounded-t-3xl">
            <Text className="text-[30px] font-bold text-center">Marketplace</Text> 
            <Text className="text-[18px] text-slate-500 mt-6 text-center">Mua bán nơi thị trường bạn có thể bán vật phẩm cũ theo cách của bạn</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")} className="p-4 bg-blue-500 rounded-full mt-20">
                <Text className="text-white text-center text-[18px]">Đăng nhập ứng dụng</Text>
            </TouchableOpacity>
            <TouchableOpacity className="p-4 bg-blue-200 rounded-full mt-5">
                <Text className="text-black text-center text-[18px]">Đăng nhập bằng Google</Text>
            </TouchableOpacity>

            
        </View>
    </View>
  )
}

export default IntroScreen

const styles = StyleSheet.create({})