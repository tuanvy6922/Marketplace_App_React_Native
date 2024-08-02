import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, Text, View, 
TouchableOpacity, StyleSheet, Image,
Alert} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import storage from "@react-native-firebase/storage";
import { AntDesign } from '@expo/vector-icons';

const SliderManagement = ({navigation}) => {
  const [slider, setSlider] = useState([]);
  const [image, setImage] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userQuerySnapshot = await firestore().collection('Sliders').get();
        const SliderList = userQuerySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setSlider(SliderList);
      } catch (error) {
        console.error("Error fetching users: ", error);
      }
    };

    fetchUsers();
  }, [slider]);

  const deleteImage = async (id) => {
    try {
      await firestore().collection("Sliders").doc(id).delete();
      Alert.alert("Thành công", "Xóa thành công!");
      setSlider(prevSliders => prevSliders.filter(slider => slider.idSlider !== id));
    } catch (error) {
      console.error("Error deleting slider: ", error);
      Alert.alert("Lỗi", "Xóa thất bại!");
    }
  };
  
  const renderItem = ({ item }) => (
    <View style={styles.ListData}>
    {(item.image)&&<Image source={{ uri: item?.image }} style={styles.image} />}
    <View style={styles.button}>
      <TouchableOpacity style={{ backgroundColor: '#00cc00', 
      borderRadius: 10, padding: 5, width: 110, marginBottom:8 }}
      onPress={()=>navigation.navigate("UpdateSlider", item.idSlider )}
      >
        <Text style={{ fontSize: 20, fontWeight: 'bold', 
        color: 'white', textAlign: 'center' }}>Cập nhật</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ backgroundColor: 'red', borderRadius: 10, 
      padding: 5, width: 110}} onPress={() => deleteImage(item.idSlider)}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', 
        color: 'white', textAlign: 'center' }}>Xóa</Text>
      </TouchableOpacity>
    </View>
  </View>  
  );

  return (
      <SafeAreaView>
        <View style={{flexDirection:'row', marginTop: 20, marginStart:20 }}> 
          <Text style={{fontSize:24,fontWeight:'bold'}}>Danh sách Slider</Text>
          <TouchableOpacity onPress={()=>navigation.navigate("AddSlider")}
          style={{marginLeft:150}}>
            <AntDesign name="pluscircle" size={34} color="black" />
          </TouchableOpacity>
        </View>
        <FlatList
          data={slider}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
  );
};

export default SliderManagement;

const styles = StyleSheet.create({
  ListData:{ 
    padding: 10, 
    borderBottomWidth: 1, 
    borderBottomColor: '#ccc', 
    flexDirection: 'row',
    marginBottom: 5 
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
    width: 250,
    height: 150,
    marginRight: 10,
  },
});
