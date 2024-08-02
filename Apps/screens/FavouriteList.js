import React, { useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore"
import auth from '@react-native-firebase/auth'
import { Alert, FlatList, View, Text} from "react-native";
import { Appbar, Button, TextInput } from "react-native-paper";
import LatestItemList from "../components/LatestItemList";
//import Todo from "./todo";

export default function FavouriteList() {
  const[todos,setTodos] = useState([])
  const[special, setSpecial] = useState([])
  const user = auth().currentUser;
  const[todo,setTodo] = useState('')
  const ref1 = firestore().collection('FavouriteList')
  const ref = firestore().collection('USERPOST')
    useEffect(()=>{
      return ref1.where("idUser", '==',user.email).onSnapshot(querySnapshot => {
        const list = []
        querySnapshot.forEach(doc=>{
          const {idProduct} = doc.data()
          list.push({
            idFavourite: doc.id,
            idProduct,
          })
        })
        setSpecial(list)
      })
    },[special])
    useEffect(()=>{
      return ref.orderBy("title").onSnapshot(querySnapshot => {
        const list = []
        querySnapshot.forEach(doc=>{
          const {id,title,price,category,image,
            userName,create,desc} = doc.data()
          if(special != null)
            { 
                special.forEach((item, index) => {
                if(item.idProduct.includes(id))
                {
                    list.push({
                        id: doc.id,
                        title,
                        price,
                        category,
                        desc,
                        image,
                        userName,
                        create,
                      })
                }
                    
                });
           
            }   
        })
        setTodos(list)
      })
    },[todos])
    
    return(
      <View style = {{flex:1}}>
      {special != '' ? (
      <LatestItemList latestItemList={todos} idSpecial ={special}/>
  ) : (
    <Text className="p-5 text-center mt-24 justify-center text-[20px]">Không có sản phẩm yêu thích</Text>
  )}
    </View>
  );
}