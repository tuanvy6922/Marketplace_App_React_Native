import { StyleSheet, Text, View, TouchableOpacity, Image, Alert } from 'react-native';
import React, { useEffect, useState, useLayoutEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage'
import * as ImagePicker from 'expo-image-picker';
import { Button, Dialog, IconButton, Portal, TextInput } from 'react-native-paper';

const UpdateCategory = ({navigation, route}) => {
  const [images, setImages] = useState('');
  const [name, setName] = useState("")
  const id = route.params;
  const hideDialog = () => setVisible(false)
  const [visible, setVisible] = useState(false)
  const [isUploadImage, setIsUploadImage] = useState(false)
  //console.log(id)

  useLayoutEffect(()=>{
    navigation.setOptions({
        headerRight: (props) => <IconButton icon={"delete"} {...props} onPress={() => setVisible(true)} />
    })

},[])
  const handleDeleteCategory = () =>{
    firestore().collection("Category").doc(route.params).delete().then(
    navigation.navigate("CategoryScreen"))
  }

  const fetchSliderData = async () => {
    try {
      const documentSnapshot = await firestore().collection('Category').doc(id).get();
      const data = documentSnapshot.data();
      const {icon,name} = data
      setImages(icon);
      setName(name)
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
      setIsUploadImage(true); // Update the state to indicate an image is selected
    }
  };
  
  const uploadCategory = async () => {
    console.log(isUploadImage);
  
    // If an image is selected for upload
    if (isUploadImage) {
      if (!images) return;
  
      const filename = images.substring(images.lastIndexOf('/') + 1);
      const storageRef = storage().ref(`category/${filename}`);
      const task = storageRef.putFile(images);
  
      try {
        await task;
        const url = await storageRef.getDownloadURL();
  
        // Update both name and image URL
        await firestore().collection('Category').doc(id).update({
          icon: url,
          name: name,
        });
        Alert.alert('Thành công', 'Cập nhật thành công');
      } catch (e) {
        console.error(e);
        Alert.alert('Lỗi', 'Cập nhật thất bại');
      }
    } else {
      // If only the name is to be updated
      try {
        await firestore().collection('Category').doc(id).update({
          name: name,
        });
        Alert.alert('Thành công', 'Cập nhật thành công');
      } catch (e) {
        console.error(e);
        Alert.alert('Lỗi', 'Cập nhật thất bại');
      }
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
      <TextInput 
            style={{marginTop: 50, width:400}}
            label={"Tên thể loại"}
            value={name}
            onChangeText={(text) => setName(text)}
      />
      <TouchableOpacity style={styles.button} onPress={uploadCategory}>
        <Text style={styles.textButton}>Cập nhật thể loại</Text>
      </TouchableOpacity>
      <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Title>Thông báo</Dialog.Title>
                    <Dialog.Content>
                        <Text variant="bodyMedium">Bạn muốn xóa thể loại không ?</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={hideDialog}>Không</Button>
                        <Button onPress={handleDeleteCategory}>Có</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
    </View>
  );
};

export default UpdateCategory;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  text: {
    margin: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
  textButton: {
    fontSize: 18,
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
