import { StyleSheet, Text, View, StatusBar } from 'react-native';
import IntroScreen from './Apps/screens/IntroScreen';
import Navigation from './StackNavigator';
import { Provider } from 'react-native-paper';
import 'react-native-gesture-handler';
import 'react-native-reanimated';

export default function App() {    
  StatusBar.setBarStyle('dark-content')
  return (
    <Provider>
      <Navigation/></Provider>
      
  );
}

const styles = StyleSheet.create()