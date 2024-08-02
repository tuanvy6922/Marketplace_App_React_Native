import { Image, StyleSheet, Text, View, ScrollView, TouchableOpacity, Linking, Share, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import firestore, { deleteDoc, doc } from "@react-native-firebase/firestore";
import auth from '@react-native-firebase/auth';
import { Ionicons } from '@expo/vector-icons';

const ProductDetail = ({navigation}) => {
  const {params} = useRoute();
  const [product, setProduct] = useState([]);
  const user = auth().currentUser;
  const nav =useNavigation();

  useEffect(()=>{
    params&&setProduct(params.product);
    shareButton();
  },[params, navigation])

  const shareButton=()=>{
    navigation.setOptions({
      headerRight: () => (
        <Ionicons name="share-social-sharp" 
          size={24} 
          color="white" 
          onPress={()=>shareProduct()} />
      ),
    });
  }
  const shareProduct=async()=>{
    const content ={
      message:product.title+'\n'+product.desc,
    }
    Share.share(content).then(resp=>{
      console.log(resp)
    },(error)=>{
      console.log(error)
    })
  }
  const SendEmailMessage = () => {
    const subject = 'Liên quan tới ' + product.title;
    const body = 'Chào ' + product.userName + "\n" + "Tôi rất quan tâm về sản phẩm này"+product.image;
    Linking.openURL('mailto:' +product.create+"?subject="+subject+"&body="+body)
  }
  const deleteUserPost=() => {
     Alert.alert("Bạn có muốn xóa không?","Bạn có muốn xóa bài đăng này không?",[
      {
        text: "Xóa",
        onPress:()=>deleteFromFirestore()
      },
      {
        text: "Hủy",
        onPress: ()=>console.log('Cancel Pressed'),
        style: 'cancel' 
      }
     ])
  }
  const deleteFromFirestore=async()=>{
    console.log('Deleted')
    const snapshot = await firestore().collection("USERPOST")
    .where('title','==',product.title).get();
    snapshot.forEach(doc=>{
      deleteDoc(doc.ref).then(resp=>{
        console.log("Deleted the Doc...");
        nav.goBack();
      })
    }) 
  }
  return (
    (product!=null)&&
    <ScrollView className="bg-white">
      {(product.image)&&<Image source={{uri:product.image}}
        className="h-[320px] w-full"
      />}

      <View className="p-3">
        <Text className='text-[24px] font-bold'>{product?.title}</Text>
        <View className="items-baseline">
          <Text className="bg-blue-200 text-blue-500 
          rounded-full px-2 p-1 mt-2">{product.category}</Text>
        </View>
        <Text className='mt-3 font-bold text-[20px]'>Mô tả</Text>
        <Text className='text-[17px] text-gray-500' style={{marginBottom:10}}>{product?.desc}</Text>
      </View>
      
      {/* User Info */}
      <View className="p-3 flex flex-row items-center gap-3 bg-blue-100 border-gray-400">
        <Image source={{uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ--mmPHnesazs3BnusJhNOA373KLqzyGWRY9PKmEqnsM-_EYZxhe8i59y2KqVmPMXpz6k&usqp=CAU"}}
          className="w-12 h-12 rounded-full"/>

        <View>
            <Text className="font-bold text-[18px]">{product.userName}</Text>
            <Text className="text-gray-500">{product.create}</Text>
        </View>
      </View>
      {user.email==product.create?
      <TouchableOpacity className="z-40 bg-red-500 rounded-full p-3 m-2"
        onPress={deleteUserPost}
      >
      <Text className="text-center text-white text-[15px]">Xóa sản phẩm</Text>
      </TouchableOpacity>
      :<TouchableOpacity className="z-40 bg-blue-500 rounded-full p-3 m-2"
        onPress={SendEmailMessage}
      >
        <Text className="text-center text-white text-[15px]">Gửi tin nhắn</Text>
      </TouchableOpacity>}
    </ScrollView>
  )
}

export default ProductDetail

const styles = StyleSheet.create({})