import { View, Text, FlatList, Image, SafeAreaView } from 'react-native'
import React from 'react'

export default function Slider({sliderList, currentSlide}) {
  return (
    <SafeAreaView className="mt-5">
      <FlatList data={sliderList} 
      horizontal={true} 
      showsHorizontalScrollIndicator={false}
      renderItem={({item, index})=>(
        <View style={{ display: index === currentSlide ? 'block' : 'none' }}>
            <Image source={{uri:item?.image}} 
                className="h-[200px] w-[370px] mr-3 rounded-lg object-contain"
            />
        </View>
      )} keyExtractor={(item, index) => index.toString()} />
    </SafeAreaView>
  )
}