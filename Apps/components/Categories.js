import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Categories({categoryList}) {

  const navigation = useNavigation();
  return (
    <SafeAreaView className="mt-3"> 
      <Text className="font-bold text-[20px]">Danh mục sản phẩm</Text>
      <FlatList data={categoryList}
        numColumns={4}
        scrollEnabled={false}
        renderItem={({item,index})=>(
            <TouchableOpacity className="flex-1 items-center justify-center p-2 border-[1px] 
            border-blue-200 m-1 h-[80px] rounded-lg bg-blue-50"
              onPress={()=>navigation.navigate('item-list',{
                Category: item.name
              })}
            >
                {item.icon&&<Image source={{uri:item.icon}}
                    className="w-[40px] h-[40px]"
                />}
                <Text className="text-[12px] text-center">{item.name}</Text>
            </TouchableOpacity>  
        )}
      />
    </SafeAreaView>
  )
}
