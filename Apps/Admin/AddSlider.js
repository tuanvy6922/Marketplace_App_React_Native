import { Alert, Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'
import React, {useState, useEffect} from 'react'
import * as ImagePicker from 'expo-image-picker';

const AddSlider = () => {
  const [image, setImage] = useState('');
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    };

    const uploadImage = async () => {
      if (!image) return;
    
      const filename = image.substring(image.lastIndexOf('/') + 1);
      const storageRef = storage().ref(`slider/${filename}`);
      const task = storageRef.putFile(image);
    
      try {
        await task;
        const url = await storageRef.getDownloadURL();
        await firestore().collection('Sliders').add({
          image: url,
        }).then(resp=>{firestore().collection("Sliders").doc(resp.id).update({idSlider: resp.id})});
        Alert.alert('Thành công', 'Hình ảnh đã được tải len!');
        setImage('');
      } catch (e) {
        console.error(e);
        Alert.alert('Lỗi', 'Hình ảnh tải lên thất bại');
      }
    };
    
  return (
    <View>
    <View style={styles.container}>
    <Text style={styles.text}>Thêm hình ảnh Slider</Text>
    <TouchableOpacity onPress={pickImage}>
    {image?(<Image source={{ uri: image }} 
    style={{ width: 390, height: 300, borderRadius: 15 }} />
    ) : (
    <Image source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDQn25YN5t9cfcCvTVqUXBzdSKkvcQgXnm8J5aczoIrg&s' }} 
    style={{ width: 390, height: 300, borderRadius: 15 }} />
    )}
    </TouchableOpacity>
    <TouchableOpacity style={styles.button} onPress={uploadImage}>
        <Text style={styles.textButton}>Thêm hình ảnh</Text>
    </TouchableOpacity>
    </View>
    </View>
  )
}

export default AddSlider

const styles = StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems:'center'
    },
    text:{
        margin: 20,
        fontSize:24, 
        fontWeight:'bold'
    },
    textButton:{
        fontSize: 25, 
        color:'white', 
        fontWeight:'bold',
        textAlign: 'center'
    },
    button:{
        width: 300,
        backgroundColor:'#1a1aff', 
        borderRadius:5, 
        padding: 10,
        margin: 20,
    }
})
