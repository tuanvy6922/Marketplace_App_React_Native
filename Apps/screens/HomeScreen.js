import { Image, StyleSheet, Text, View, TextInput, ScrollView} from 'react-native'
import React, {useEffect, useState } from 'react';
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import Header from '../components/Header';
import Slider from '../components/Slider';
import Categories from '../components/Categories';
import LatestItemList from '../components/LatestItemList';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = () => {
  const [sliderList, setSliderList] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [categoryList, setCategoryList] = useState([]);
  const [latestItemList, setLatestItemList] = useState([]);
  const [data, setData] = useState([]);
  const user = auth().currentUser;
  const[special, setSpecial] = React.useState([])
  const navigation = useNavigation();
  const [name, setName] = useState("")

  useEffect(()=>{
    getSliders();
    getCategoryList();
    getLastestItemList();
  },[])
  
  useEffect(()=>{
    firestore().collection("USERPOST").onSnapshot(response => {
        var arr = []
        response.forEach(doc => arr.push(doc.data()))
        setData(arr)
    })
  },[])
  React.useEffect(()=>{
    return  firestore().collection("FavouriteList").where('idUser','==',user.email).onSnapshot(querySnapshot => {
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
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % sliderList.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [sliderList]);

  useEffect(()=>{
    setData(latestItemList.filter(s=> s.title.includes(name)))
    console.log(data)
  },[name])

  const getSliders =async()=>{
    setSliderList([])
    const querySnapshot = await firestore().collection('Sliders').get();
    querySnapshot.forEach((doc) => {setSliderList(sliderList=>[...sliderList, doc.data()]);      
    });
  }
  const getCategoryList =async()=>{
    setCategoryList([])
    const querySnapshot = await firestore().collection('Category').get();
    querySnapshot.forEach((doc) => {
      setCategoryList(categoryList=>[...categoryList, doc.data()]);      
    });
  }
  const getLastestItemList = () => {
    setLatestItemList([]);
    const unsubscribe = firestore().collection('USERPOST')
        .orderBy('create', 'desc')
        .onSnapshot(querySnapshot => {
            const latestItems = [];
            querySnapshot.forEach(doc => {
                latestItems.push(doc.data());
            });
            setLatestItemList(latestItems);
        }, error => {
            console.error("Error fetching latest items: ", error);
        });
    return unsubscribe;
};

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header/>
      <View className="p-[9px] px-5 flex flex-row items-center rounded-full mt-5 bg-blue-50" style={{borderColor:"#0066cc", borderWidth:1, width: 370}}>
      <Ionicons name="search-outline" size={24} color="grey" />
        <TextInput placeholder='Tìm kiếm sản phẩm' 
        className="ml-2 text-[16px]"
        onChangeText={setName} 
        value={name} />
      </View>

      {/* Slider */}
      <Slider sliderList={sliderList} currentSlide={currentSlide}/>
      {/* Category list */}
      <Categories categoryList={categoryList}/>
      {special != ''?<LatestItemList latestItemList={data} heading={'Sản phẩm mới nhất'} idSpecial={special}/>
      :<LatestItemList latestItemList={data} heading={'Sản phẩm mới nhất'} idSpecial={null}/>
      }
      
    </ScrollView> 
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 20,
    paddingStart: 20,
    paddingEnd: 20,
    paddingBottom: 45,
    backgroundColor:'white'
 },})