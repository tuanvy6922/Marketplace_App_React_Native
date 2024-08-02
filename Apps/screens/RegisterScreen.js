import React, { useState, useEffect} from "react";
import { View, StyleSheet, Image, ToastAndroid, TouchableOpacity} from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { Icon } from "react-native-paper";
import {createAccount} from "../../store";


const RegisterScreen =({navigation})=>{
    const [fullName,setFullname]= useState("")
    const [email,setEmail]= useState("")
    const [password,setPassword]= useState("")
    const [confirmpassword,setConfirmPassword]= useState("")
    const [errorFullname, setErrorFullname] = useState(false);
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const [errorConfirmpassword, setErrorConfirmpassword] = useState(false);
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    useEffect(() => {
        if (fullName.length == 0) {
          setErrorFullname(true);
        } else {
          setErrorFullname(false);
        }
        if (!emailPattern.test(email)) {
          setErrorEmail(true);
        } else {
          setErrorEmail(false);
        }
    
        if (password.length < 6) {
          setErrorPassword(true);
        } else {
          setErrorPassword(false);
        }
        if (password === confirmpassword && password.length >= 6) {
          setErrorConfirmpassword(false);
        } else {
            setErrorConfirmpassword(true);
        }  
    }, [fullName, email, password, confirmpassword]);
    
    const handleCreateAccount=()=>{
        if (fullName.length === 0 || !emailPattern.test(email) || password.length < 6 || password !== confirmpassword) {
            ToastAndroid.show("Vui lòng nhập hết thông tin để được đăng ký tài khoản!", ToastAndroid.LONG);
            return;
        }
        createAccount(fullName,email,password,"user")
    }
    return(
        <View style ={styles.container}>
           <Image
              style ={styles.logo}
              source={require("../../assets/logo.jpg")}/>
            <TextInput style={styles.input}
                label={"Tên đầy đủ"}
                value={fullName}
                onChangeText={setFullname}
            />
            <View style={styles.textValidContainer}>
            <Icon source={errorFullname ? "alert-circle" : "check-circle"} color={errorFullname ? "red" : "green"} size={20} />
            <Text style={{ marginLeft: 5, color: errorFullname ? "red" : "green" }}>Tên đầy đủ không được bỏ trống</Text>
            </View>
            <TextInput style={styles.input}
                label={"Email"}
                value={email}
                onChangeText={setEmail}
            />
            <View style={styles.textValidContainer}>
                <Icon source={errorEmail ? "alert-circle" : "check-circle"} color={errorEmail ? "red" : "green"} size={20} />
                <Text style={{ marginLeft: 5, color: errorEmail ? "red" : "green" }}>Email đúng định dạng</Text>
            </View>
            <TextInput style={styles.input}
                label={"Mật khẩu"}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
             <View style={styles.textValidContainer}>
                <Icon source={errorPassword ? "alert-circle" : "check-circle"} color={errorPassword ? "red" : "green"} size={20} />
                <Text style={{ marginLeft: 5, color: errorPassword ? "red" : "green" }}>Mật khẩu từ 6 kí tự trở lên</Text>
            </View>
            <TextInput style={styles.input}
                label={"Xác nhận mật khẩu"}
                value={confirmpassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
            />
            <View style={styles.textValidContainer}>
                <Icon source={errorConfirmpassword ? "alert-circle" : "check-circle"} color={errorConfirmpassword ? "red" : "green"} size={20} />
                <Text style={{ marginLeft: 5, color: errorConfirmpassword ? "red" : "green" }}>Nhập lại mật khẩu</Text>
            </View>

            <TouchableOpacity onPress={handleCreateAccount} style={styles.button}>
                <Text style={{fontSize:16, color:'white'}}>Tạo tài khoản</Text>
            </TouchableOpacity>
            <View style={styles.footerView}>
                <Text style={styles.footerText}>Bạn đã có tài khoản?</Text>
                <Button style={styles.footerLink} onPress={()=> navigation.navigate("Login")}>Đăng nhập</Button>
            </View>
        </View>
    )
}
export default RegisterScreen;
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignContent: 'center'
    },
    logo: {
        alignSelf: 'center',
        height: 150,
        width: 150,
        margin: 30,
    },
    input: {
        height: 50,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16
    },
    button: {
        backgroundColor: "navy",
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 48,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
    },
    footerView: {
        flexDirection: "row",
        justifyContent: 'center',
        alignContent: 'center',
        marginTop: 10
    },
    footerText: {
        fontSize: 16,
        color: '#000000',
        alignSelf: 'center',
        paddingLeft: 100
    },
    footerLink: {
        color: "navy",
        fontWeight: "bold",
        fontSize: 16,
        paddingRight:80
    },
    textValidContainer: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        marginLeft: 30,
        marginTop: 5,
        marginBottom: 5
    },
  
})