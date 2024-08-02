import { Alert, Button, Image, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View, Platform, KeyboardAvoidingView, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { Formik } from 'formik';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';

const AddPostScreen = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [image, setImage] = useState('');
  const [fullname, setFullname] = useState('')
  const USERPOST = firestore().collection("USERPOST");
  const user = auth().currentUser;

  useEffect(() => {
    getCategoryList();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const document = await firestore().collection('USERS').doc(user.email).get()
      setFullname(document.data().fullName)
    }
    fetchUser()
  }, []);

  const getCategoryList = async () => {
    setCategoryList([]);
    const querySnapshot = await firestore().collection('Category').get();
    const categories = [];
    querySnapshot.forEach((doc) => {
      categories.push(doc.data());
    });
    setCategoryList(categories);
  };

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

  const onSubmitMethod = async (values) => {
    if (!values.title || !values.desc || !values.price || !values.address || !selectedCategory || !image) {
      ToastAndroid.show("Vui lòng nhập tất cả thông tin và thêm hình ảnh", ToastAndroid.SHORT);
      return;
    }

    try {
      const response = await USERPOST.add({
        title: values.title,
        desc: values.desc,
        price: values.price,
        address: values.address,
        category: selectedCategory,
        userName: fullname,
        create: user.email,
      });

      const refImage = storage().ref("/posts/" + response.id + ".png");
      await refImage.putFile(image);
      const link = await refImage.getDownloadURL();
      await USERPOST.doc(response.id).update({ image: link, id: response.id });
      ToastAndroid.show("Đăng bài thành công!", ToastAndroid.SHORT);
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'android' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, padding: 8 }}
        keyboardShouldPersistTaps="handled"
      >
        <View>
          <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
            <Text className="text-[27px] font-bold">Thêm bài đăng mới</Text>
          </View>
          <Formik
            initialValues={{ title: '', desc: '', price: '', address: '' }}
            onSubmit={values => onSubmitMethod(values)}
            validate={(values) => {
              const errors = {};
              if (!values.title) {
                errors.title = "Tên tiêu đề phải có ở đây";
              }
              if (!values.desc) {
                errors.desc = "Mô tả phải có ở đây";
              }
              if (!values.price) {
                errors.price = "Giá phải có ở đây";
              }
              if (!values.address) {
                errors.address = "Địa chỉ phải có ở đây";
              }
              return errors;
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <View>
                <TouchableOpacity onPress={pickImage}>
                  {image ? (
                    <Image source={{ uri: image }} style={{ width: 100, height: 100, borderRadius: 15 }} />
                  ) : (
                    <Image source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDQn25YN5t9cfcCvTVqUXBzdSKkvcQgXnm8J5aczoIrg&s' }} style={{ width: 100, height: 100, borderRadius: 15 }} />
                  )}
                </TouchableOpacity>
                {!image && <Text style={styles.errorText}>Phải thêm hình ảnh</Text>}

                <TextInput
                  style={styles.input}
                  placeholder='Tên tiêu đề'
                  value={values.title}
                  onChangeText={handleChange('title')}
                  onBlur={handleBlur('title')}
                />
                {errors.title && touched.title && <Text style={styles.errorText}>{errors.title}</Text>}

                <TextInput
                  style={styles.input}
                  placeholder='Mô tả'
                  value={values.desc}
                  numberOfLines={5}
                  onChangeText={handleChange('desc')}
                  onBlur={handleBlur('desc')}
                />
                {errors.desc && touched.desc && <Text style={styles.errorText}>{errors.desc}</Text>}

                <TextInput
                  style={styles.input}
                  placeholder='Giá tiền'
                  value={values.price}
                  keyboardType='number-pad'
                  onChangeText={handleChange('price')}
                  onBlur={handleBlur('price')}
                />
                {errors.price && touched.price && <Text style={styles.errorText}>{errors.price}</Text>}

                <TextInput
                  style={styles.input}
                  placeholder='Địa chỉ'
                  value={values.address}
                  onChangeText={handleChange('address')}
                  onBlur={handleBlur('address')}
                />
                {errors.address && touched.address && <Text style={styles.errorText}>{errors.address}</Text>}

                <View style={{ borderWidth: 1, borderRadius: 10, marginTop: 10, marginBottom: 5 }}>
                  <Picker
                    selectedValue={selectedCategory}
                    onValueChange={(itemValue) => setSelectedCategory(itemValue)}
                  >
                    {categoryList && categoryList.map((item, index) => (
                      item && <Picker.Item key={index} label={item.name} value={item.name} />
                    ))}
                  </Picker>
                </View>

                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                  <Text style={{ fontSize: 23, color: 'white', alignSelf: 'center' }}>Xác nhận</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddPostScreen;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 17,
    fontSize: 17,
    marginBottom: 5,
    marginTop: 10
  },
  button: {
    backgroundColor: "#0066cc",
    padding: 10,
    borderRadius: 20,
    marginTop: 10
  },
  errorText: {
    fontSize: 14,
    color: 'red',
    marginTop: 5,
    marginBottom: 10,
  },
});
