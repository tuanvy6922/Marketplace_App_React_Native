import { Image, StyleSheet, Text, View, TouchableOpacity, FlatList, Linking } from 'react-native'
import React, { useState, useEffect } from 'react'
import firestore from "@react-native-firebase/firestore";
import auth from '@react-native-firebase/auth';
import diary from "../../assets/sketchbook.png"
import Socail from "../../assets/www.png"
import search from "../../assets/seo.png"
import logout from "../../assets/logout.png"
import favourite from "../../assets/favourite.png"
import resetpassword from "../../assets/reset-password.png"
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const [image, setImage] = useState('');
  const user = auth().currentUser;
  const navigation = useNavigation();
  const [fullname, setFullname] = useState('')

  useEffect(() => {
    const fetchUser = async () => {
      const document = await firestore().collection('USERS').doc(user.email).get()
      setFullname(document.data().fullName)
    }
    fetchUser()
  }, [])
  const menuList=[
    {
      id: 1,
      name: 'Sản phẩm của tôi',
      icon:diary,
      path: 'MyProduct'
    },
    {
      id: 2,
      name: 'Khám phá',
      icon:search,
      path:'Explore-tab'
    },
    {
      id: 3,
      name: 'Website',
      icon:Socail,
      url:'https://tdmu.edu.vn/'
    },   
    {
      id: 4,
      name: 'Danh sách yêu thích',
      icon: favourite,
      path: 'Favourite',
    },
    {
      id: 5,
      name: 'Đổi mật khẩu',
      icon: resetpassword,
      path: 'ChangePassword',
    }, 
    {
      id: 6,
      name: 'Đăng xuất',
      icon:logout,
    },
  ]
  const onMenuPress=(item)=>{
    if(item.name=='Đăng xuất'){
      auth().signOut().then(() => {
        console.log('User signed out!');
        navigation.navigate('Login'); 
      })
      return ;
    }
    if (item.url) {
      Linking.openURL(item.url).catch((err) => console.error('An error occurred', err));
      return;
    }
    item?.path?navigation.navigate(item.path):null;
  }
  return (
    <View className="p-5 bg-white">
      <View className="items-center mt-10">
      <TouchableOpacity>
        {image ? (
          <Image source={{ uri: image }} className='w-[100px] h-[100px] rounded-full items-center justify-center text-center'/>
        ) : (
          <Image source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ--mmPHnesazs3BnusJhNOA373KLqzyGWRY9PKmEqnsM-_EYZxhe8i59y2KqVmPMXpz6k&usqp=CAU" }}
          className='w-[100px] h-[100px] rounded-full'
          />
        )}
      </TouchableOpacity>
      <Text className="font-bold text-[25px] mt-2">{fullname}</Text>
      <Text className="text-[18px] mt-2 text-gray-500">{user.email}</Text>
      </View>
      <FlatList style={{marginTop:20}} 
      data={menuList}
      numColumns={3}
      renderItem={({item,index})=>(
        <TouchableOpacity className="flex-1 p-3 border-[1px] items-center 
           mx-4 mt-4 rounded-lg border-blue-400 bg-blue-50" onPress={()=>onMenuPress(item)}>
          {item.icon&& <Image source={item?.icon} className="w-[50px] h-[50px]"/>}
          <Text className="text-[14px] mt-2 text-blue-700 text-center">{item.name}</Text>
        </TouchableOpacity>
      )}/>
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})