import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from "@react-native-firebase/firestore"
import LatestListItem from "../components/LatestItemList"

const ExploreScreen =() => {
  const [productList, setProductList]=useState([]);

  useEffect(()=>{
    getAllProducts();
  },[])
  const getAllProducts=async()=>{
    setProductList([]);
    const snapShot = await firestore().collection("USERPOST").orderBy('create','desc').get();
    snapShot.forEach((doc)=>{
        setProductList(productList=>[...productList,doc.data()]);
    })
  }
  return (
    <ScrollView >
      <SafeAreaView className="p-5 py-8">
      <Text className="text-[28px] font-bold">Khám phá nhiều hơn</Text>
      <LatestListItem latestItemList={productList}/></SafeAreaView>
    </ScrollView>
  )
}

export default ExploreScreen

const styles = StyleSheet.create({})