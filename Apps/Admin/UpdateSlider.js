import { StyleSheet, Text, View, TouchableOpacity, Image, Alert } from 'react-native';
import React, { useEffect, useState, useLayoutEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage'
import * as ImagePicker from 'expo-image-picker';
import { Button, Dialog, IconButton, Portal } from 'react-native-paper';

const UpdateSlider = ({navigation,route}) => {
  const [images, setImages] = useState('');
  const idSlider = route.params;
  
  const fetchSliderData = async () => {
    try {
      const documentSnapshot = await firestore().collection('Sliders').doc(idSlider).get();
      const data = documentSnapshot.data();
      const {image} = data
      setImages(image);
      console.log(data)
    } catch (error) {
      console.error('Error fetching image: ', error);
    }
  };

  useEffect(() => {
    fetchSliderData();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
        setImages(result.assets[0].uri);
      }
    };

    const uploadImage = async () => {
      if (!images) return;
    
      const filename = images.substring(images.lastIndexOf('/') + 1);
      const storageRef = storage().ref(`slider/${filename}`);
      const task = storageRef.putFile(images);
    
      try {
        await task;
        const url = await storageRef.getDownloadURL();
        await firestore().collection('Sliders').doc(idSlider).update({
          image: url,
        })
        Alert.alert('Thành công', 'Hình ảnh đã được tải lên!');
      } catch (e) {
        console.error(e);
        Alert.alert('Lỗi', 'Hình ảnh tải lên thất bại');
      }
    };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage}>
        {images ? (
          <Image source={{ uri: images }} style={{ width: 390, height: 300, borderRadius: 15 }} />
        ) : (
          <Image
            source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDQn25YN5t9cfcCvTVqUXBzdSKkvcQgXnm8J5aczoIrg&s',
            }}
            style={{ width: 390, height: 300, borderRadius: 15 }}
          />
        )}
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={uploadImage}>
        <Text style={styles.textButton}>Cập nhật hình ảnh</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UpdateSlider;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  text: {
    margin: 20,
    fontSize: 24,
    fontWeight: 'bold',
  },
  textButton: {
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    width: 300,
    backgroundColor: '#1a1aff',
    borderRadius: 5,
    padding: 10,
    margin: 20,
  },
});
