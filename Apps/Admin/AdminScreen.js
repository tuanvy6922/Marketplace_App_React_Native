import {Image, FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import HeaderAdmin from './HeaderAdmin'
import category from "../../assets/admin/categories.png";
import picture from "../../assets/admin/picture.png";
import account from "../../assets/admin/verified-account.png";
import { useNavigation } from '@react-navigation/native';

const AdminScreen = () => {
  const navigation = useNavigation();
  const menuAdminList=[
    {
      id: 1,
      name: 'Quản lý người dùng',
      icon: account,
      path: 'User'
    },
    {
      id: 2,
      name: 'Quản lý Slider',
      icon: picture,
      path: 'Slider'
    },
    {
      id: 3,
      name: 'Quản lý thể loại',
      icon: category,
      path: 'Category'
    }, 
  ]
  const onMenuPress=(item)=>{
    item?.path?navigation.navigate(item.path):null;
  }
  return (
    <View style={styles.container}>
      <HeaderAdmin/>
      <FlatList style={{marginTop: 200}} 
      data={menuAdminList}
      numColumns={2}
      renderItem={({item,index})=>(
        <TouchableOpacity className="flex-1 p-3 border-[1px] items-center 
           mx-4 mt-4 rounded-lg border-blue-400 bg-blue-50" onPress={()=>onMenuPress(item)}>
          {item.icon&& <Image source={item?.icon} className="w-[60px] h-[60px]"/>}
          <Text className="text-[18px] mt-2 text-blue-700 text-center">{item.name}</Text>
        </TouchableOpacity>
      )}/>
      
    </View>
  )
}

export default AdminScreen;

const styles = StyleSheet.create({
  container:{
    flex: 1,
    margin: 20,
    justifyContent:'center',
    alignContent:'center',
  },
})