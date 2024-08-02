import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import IntroScreen from './Apps/screens/IntroScreen';
import LoginScreen from './Apps/screens/LoginScreen';
import RegisterScreen from './Apps/screens/RegisterScreen';
import AddPostScreen from './Apps/screens/AddPostScreen';
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import StackRouter from './StackRouter';
import StackRouterExplore from './StackRouterExplore';
import StackRouterProfile from './StackRouterProfile';
import AdminScreen from './Apps/Admin/AdminScreen';
import ForgotPassword from './Apps/screens/ForgotPassword';
import AdminDrawer from './Apps/Admin/AdminDrawer';

const Tab = createBottomTabNavigator();
function BottomTabs() {
  return (
    <Tab.Navigator screenOptions={{
        tabBarStyle:{
            position: "absolute",
            bottom:0,
            left:0,
            right:0,
            shadowOpacity:4,
            shadowRadius:4,
            elevation:4,
            shadowOffset:{
                width:0,
                height:-4
            },
            borderTopWidth:0 
        }
    }}>
      <Tab.Screen
        name="Home-tab"
        component={StackRouter}
        options={{
          tabBarLabel: "Trang chủ",
          headerShown: false,
          tabBarLabelStyle: { color: "black" },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Entypo name="home" size={24} color="blue" />
            ) : (
              <Entypo name="home" size={24} color="grey" />
            ),
        }}
      />
      <Tab.Screen
        name="Explore-tab"
        component={StackRouterExplore}
        options={{
          tabBarLabel: "Khám phá",
          headerShown: false,
          tabBarLabelStyle: { color: "black" },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <MaterialIcons name="explore" size={24} color="blue" />
            ) : (
              <MaterialIcons name="explore" size={24} color="grey" />
            ),
        }}
      />
      <Tab.Screen
        name="AddPost"
        component={AddPostScreen}
        options={{
          tabBarLabel: "Đăng bài",
          headerShown: false,
          tabBarLabelStyle: { color: "black" },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Entypo name="camera" size={24} color="blue" />
            ) : (
              <Entypo name="camera" size={24} color="grey" />
            ),
        }}
      />
      <Tab.Screen
        name="Profile-tab"
        component={StackRouterProfile}
        options={{
          tabBarLabel: "Thông tin",
          headerShown: false,
          tabBarLabelStyle: { color: "black" },
          tabBarIcon: ({ focused }) =>
            focused ? (
                <Ionicons name="person" size={24} color="blue" />
            ) : (
                <Ionicons name="person" size={24} color="grey" />
            ),
        }}
      />
    </Tab.Navigator>
  );
}

//Stack Navigator
const Stack = createNativeStackNavigator();
function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Intro" component={IntroScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Home-nav" component={BottomTabs} options={{headerShown:false}} />
        <Stack.Screen name="Admin" component={AdminDrawer} options={{headerShown:false}} />
        <Stack.Screen name= "ForgotPassword" component={ForgotPassword} options={{
          headerTitle:"Quên mật khẩu"
        }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
