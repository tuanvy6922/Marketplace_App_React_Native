import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore';
import LatestItemList from '../components/LatestItemList';

const ItemList = () => {
  const {params} = useRoute();
  const [itemList, setItemList] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(()=>{
    console.log(params.Category);
    params&&getItemListByCategory();
  },[params])

  const getItemListByCategory = async () => {
    setItemList([])
    setLoading(true)
    const snapshot = await firestore().collection("USERPOST")
    .where('category','==',params.Category).get()
    setLoading(false)
    snapshot.forEach(doc => {
      console.log(doc.data());
      setItemList(itemList=>[...itemList, doc.data()])
      setLoading(false)
    });
  }
  return (
    <View>
      {loading?<ActivityIndicator className="mt-24" size={'large'} color={'blue'}/>:
      itemList?.length>0? <LatestItemList latestItemList={itemList} heading={''}/>
      :<Text className="p-5 text-center mt-24 justify-center text-[20px]">Không tìm thấy bài đăng sản phẩm</Text>}
    </View>
  )
}

export default ItemList

const styles = StyleSheet.create({})