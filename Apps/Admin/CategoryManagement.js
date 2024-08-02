import React, { useLayoutEffect, useEffect, useState } from 'react';
import { SafeAreaView, FlatList, Text, View, 
TouchableOpacity, StyleSheet, Image, Alert} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { AntDesign } from '@expo/vector-icons';


const CategoryManagement = ({navigation, route}) => {
  const id = route.params;
  //console.log(id)
  const [category, setCategory] = useState([]);
  const [image, setImage]= useState([]);
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userQuerySnapshot = await firestore().collection('Category') .get();
        const categoryList = userQuerySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setCategory(categoryList);
      } catch (error) {
        console.error("Error fetching users: ", error);
      }
    };

    fetchUsers();
  }, [category]);

  React.useEffect(() => {

    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={{marginRight: 15}}>
          <AntDesign name="pluscircle" size={28} color="black" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);
  const renderItem = ({ item }) => (
    <View style={styles.ListData}>
    <View style={styles.textView}>
    {(item.icon)&&<Image source={{ uri: item?.icon }} style={styles.image} />}
    </View>
      <Text style={{ fontSize: 18, alignSelf:'center'}}>{item.name}</Text>
    <View style={styles.button}>
      <TouchableOpacity style={{ backgroundColor: '#00cc00', 
      borderRadius: 10, padding: 5, width: 110, marginBottom:8 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', 
        color: 'white', textAlign: 'center' }} onPress={()=>navigation.navigate("UpdateCategory", item.id)}>Cập nhật</Text>
      </TouchableOpacity>
    </View>
  </View>  
  );

  return (
      <SafeAreaView>
        <View style={{flexDirection:'row', marginTop: 5, marginLeft:10}}>
        <Text style={{fontSize:24,fontWeight:'bold'}}>Danh sách Thể loại</Text>
          <TouchableOpacity onPress={()=>navigation.navigate("AddCategory")}
          style={{marginLeft:150}}>
            <AntDesign name="pluscircle" size={34} color="black" />
          </TouchableOpacity></View>
        <FlatList
          data={category}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
  );
};

export default CategoryManagement;

const styles = StyleSheet.create({
  ListData:{ 
    padding: 10, 
    borderBottomWidth: 1, 
    borderBottomColor: '#ccc', 
    flexDirection: 'row',
    marginBottom: 5 
  },
  textView:{
    flexDirection: 'row', 
    marginBottom: 5,
  },
  button:{
    flexDirection: 'column', 
    margin: 5, 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'flex-end',
  },
  image: {
    alignSelf:'center',
    width: 70,
    height: 70,
    marginRight: 10,
  },
});
