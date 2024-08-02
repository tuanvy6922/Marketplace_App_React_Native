import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from "@react-native-firebase/firestore"
import auth from "@react-native-firebase/auth"
import LatestItemList from '../components/LatestItemList'
import { useNavigation } from '@react-navigation/native'

const MyProductScreen =() => {
  const user = auth().currentUser;
  const [productList, setProductList] = useState([]);
  const navigation = useNavigation()

  useEffect(()=>{
    user&&getUserPost();
  },[user])

  const getUserPost = () => {
    setProductList([]);
    const unsubscribe = firestore()
      .collection('USERPOST')
      .where('create', '==', user.email)
      .onSnapshot(snapshot => {
        const updatedProductList = [];
        snapshot.forEach(doc => {
          updatedProductList.push(doc.data());
        });
        setProductList(updatedProductList);
      });
    return unsubscribe;
  };
  
  return (
    <View>
      <LatestItemList latestItemList={productList}/>
    </View>
  )
}

export default MyProductScreen

const styles = StyleSheet.create({})