import 'react-native-gesture-handler';
import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  Button,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from './src/components/InitPage';
import Login from './src/components/Login';
import Home from './src/components/Home';
import Register from './src/components/Register';
import NewDevice from "./src/components/NewDevice";
import Connecting from './src/components/Connecting';

const Stack = createStackNavigator();

class App extends React.Component{
  render(){
      return (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Welcome"
              component={Welcome}
            />
            <Stack.Screen
                name="Home"
                component={Home}
            />
            <Stack.Screen
              name="Login"
              component={Login}
            />
            <Stack.Screen
              name="Register"
              component={Register}
            />
            <Stack.Screen
              name="New Device"
              component={NewDevice}
            />
            <Stack.Screen
              name="Connecting"
              component={Connecting}
            />
          </Stack.Navigator>
        </NavigationContainer>
      );
  }
}

export default App;

const styles = StyleSheet.create({
  engine: {
    position: 'absolute',
    right: 0,
},
body: {
    alignContent: 'center',
    margin: 'auto',

},
sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
},
sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
},
sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
},
highlight: {
    fontWeight: '700',
},
footer: {
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
},
input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
}
});