import React, { useState, useEffect} from "react"
import firestore from "@react-native-firebase/firestore"
import { View,Alert, StyleSheet, Image} from "react-native"
import { HelperText, TextInput , Button } from "react-native-paper"
import storage from "@react-native-firebase/storage"
import * as ImagePicker from 'expo-image-picker';

const AddCategory = ({navigation}) =>{
    const [name, setName] = useState("")
    const [image, setImage] = useState("")
    const CATEGORY = firestore().collection("Category")

    const ref = storage().ref()

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
  
    const handleAddNewService = () =>{
        CATEGORY.add(
            {
                name,
            }
        ).then(response => {
            const refImage = storage().ref("/services/" + response.id + ".png")
            if (image !== "") {          
                refImage.putFile(image).then(() => {
                    refImage.getDownloadURL().then(link => {
                        CATEGORY.doc(response.id).update({
                            id: response.id,
                            icon: link
                        }).then(() => {  
                            navigation.navigate("CategoryScreen");
                        }).catch(e => {
                            console.log(e.message);
                            Alert.alert("An error occurs when updating data");
                        });
                    }).catch(e => {
                        console.log(e.message);
                        Alert.alert("An error occurs when getting image URL");
                    });
                }).catch(e => {
                    console.log(e.message);
                    Alert.alert("An error occurs when uploading an image");
                });
            } else {
                CATEGORY.doc(response.id).update({
                    id: response.id,
                    icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDQn25YN5t9cfcCvTVqUXBzdSKkvcQgXnm8J5aczoIrg&s',
                    
                }).then(() => {
                    navigation.navigate("CategoryScreen");
                }).catch(e => {
                    console.log(e.message);
                    Alert.alert("An error occurs when updating data");
                });
            }
            // Alert.alert("Add new service success")
        })
        .catch(e=>Alert.alert("Add new service fail"))
    }
    return(
        <View style={{flex: 1, padding:10}}>
            <Button onPress={pickImage}>
                Upload Image
            </Button>
            {((image!="") && (<Image source={{uri:image}} style={{height:300}}/>))}
            <TextInput 
            style={{marginTop: 50}}
            label={"Tên thể loại"}
            value={name}
            onChangeText={setName}
            />
            <Button mode="contained" style={Style.button} onPress={handleAddNewService}>Thêm thể loại</Button>
        </View>
    )
}
var Style = StyleSheet.create({
    button:{
        marginTop:7,
        padding: 10,
        backgroundColor: 'navy',
        borderRadius: 5
      
    },

})
export default AddCategory