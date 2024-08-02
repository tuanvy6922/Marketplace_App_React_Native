import { FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native'
import React from 'react'
import PostItem from './PostItem';

const LatestItemList = ({latestItemList, heading, idSpecial}) => {
  return (
    <SafeAreaView className="mt-3"> 
        <Text className="font-bold text-[20px]">{heading}</Text>
        <FlatList data={latestItemList}
        numColumns={2}
        scrollEnabled={false}
        keyExtractor={(item) => item.id}
        renderItem={({item,index})=>(
        <PostItem itemPost={item} idSpecial={idSpecial}/>
      )}/>
    </SafeAreaView>
  )
}

export default LatestItemList;

const styles = StyleSheet.create({})