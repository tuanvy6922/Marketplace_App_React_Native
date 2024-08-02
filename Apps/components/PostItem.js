import { StyleSheet, Text, View, TouchableOpacity, Image, Alert} from 'react-native'
import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons';
import auth from '@react-native-firebase/auth';

const PostItem = ({itemPost, id, name, idSpecial}) => {
  const [isFav, setisFav] = useState(false)
  const navigation = useNavigation();
  const user = auth().currentUser;
  const ref1 = firestore().collection('FavouriteList')
  async function addFavourite(){
    if(isFav == false)
      {
        await ref1.add({
          idProduct: itemPost.id,
          idUser: user.email,
        }).then(res =>{
          setisFav(!isFav)
          Alert.alert("Sản phẩm đã thêm vào danh mục yêu thích")
          ref1.doc(res.id).update({idFavourite: res.id})
        });
      }
      else{
        idSpecial.forEach((item, index) => {       
          if(item.idProduct.includes(itemPost.id)) {
             ref1.doc(item.idFavourite).delete().then(()=>{Alert.alert("Sản phẩm đã loại khỏi danh mục yêu thích"); 
             setisFav(!isFav)})
          }
        });
      }   
    }
  useEffect(() => {
  if (idSpecial != null) {
    let found = false;
      idSpecial.forEach((item, index) => {       
        if(item.idProduct.includes(itemPost.id)) {
          found = true;
          
        }
      });
      if(found) {
        setisFav(true);
      }
      else{
        setisFav(false)
      }
  }
}, [idSpecial]);
  return (
    <TouchableOpacity className="flex-1 m-2 p-2 rounded-lg border-[1px] border-slate-200"
      onPress={()=>navigation.push('product-detail', {
        product:itemPost
      })}
    >
    {itemPost.image && <Image source={{uri:itemPost.image}}
      className="w-full h-[140px] rounded-lg"/>}
    <View>
      <Text className="text-[15px] font-bold mt-2">{itemPost.title}</Text>
      <Text className="text-[20px] font-bold text-blue-500">{itemPost.price} đ</Text>

      <View style={{flexDirection: 'row'}}>
      <Text className="text-blue-500 bg-blue-200 p-[2px] rounded-full 
      mt-1 px-1 text-[10px] w-[70px] text-center">{itemPost.category}</Text>
      <TouchableOpacity style={{marginLeft: 60}} onPress={()=>addFavourite()}>
        <AntDesign name="star" size={24} color={isFav ? 'gold' : 'lightgray'}/>
      </TouchableOpacity>
      </View>

    </View>
  </TouchableOpacity>
  )
}

export default PostItem

const styles = StyleSheet.create({})