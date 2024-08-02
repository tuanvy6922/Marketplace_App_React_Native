import { View, Text, Image, TextInput, SafeAreaView } from 'react-native'
import firestore from "@react-native-firebase/firestore";
import auth from '@react-native-firebase/auth';
import React, {useState, useEffect } from 'react'

export default function Header() {
  const user = auth().currentUser;
  const [fullname, setFullname] = useState('')


  useEffect(() => {
    const fetchUser = async () => {
      const document = await firestore().collection('USERS').doc(user.email).get()
      setFullname(document.data().fullName)
    }
    fetchUser()
  }, [])

  return (
    <SafeAreaView>
        <View className="flex flex-row items-center gap-2">
        <Image source={{uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ--mmPHnesazs3BnusJhNOA373KLqzyGWRY9PKmEqnsM-_EYZxhe8i59y2KqVmPMXpz6k&usqp=CAU"}} 
          className="rounded-full w-12 h-12"
        />
      <View>
        <Text style={{fontSize: 18, fontWeight:'bold'}}>{fullname}</Text>
      </View>
      </View>
    </SafeAreaView>
  )
}
