import { View, Text, Image, TextInput, SafeAreaView, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import firestore from "@react-native-firebase/firestore";
import auth from '@react-native-firebase/auth';
import React, {useState, useEffect } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Header() {
  const user = auth().currentUser;
  const [fullname, setFullname] = useState('')
  const [name, setName] = useState("")
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUser = async () => {
      const document = await firestore().collection('USERS').doc(user.email).get()
      setFullname(document.data().fullName)
    }
    fetchUser()
  }, [])

  const handleSignOut=()=>{
    auth().signOut().then(() => {
      console.log('User signed out!');
      navigation.navigate('Login'); 
    })
  }
  return (
      <View className="flex flex-row items-center justify-between p-1">
        <View className="flex flex-row items-center gap-2">
          <Image
            source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ--mmPHnesazs3BnusJhNOA373KLqzyGWRY9PKmEqnsM-_EYZxhe8i59y2KqVmPMXpz6k&usqp=CAU" }}
            className="rounded-full w-12 h-12"
          />
          <View>
            <Text style={{ fontSize: 17 }}>Admin</Text>
            <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{fullname}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={()=>handleSignOut()}>
          <MaterialIcons name="logout" size={30} color="black" />
        </TouchableOpacity>
      </View>
  )
}
