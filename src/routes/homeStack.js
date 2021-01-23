import React ,{ Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../components/Home';
import Register from '../components/Register';



const screens = {
    Home: {
        screen: Home
    },
    Register:{
        screen: Register
    }
}

class homeStack extends Component {
    render(){
        return (
            <NavigationContainer>
              <Stack.Navigator>
                <Stack.Screen
                  name="Home"
                  component={Home}
                />
              </Stack.Navigator>
            </NavigationContainer>
        );
    }
}

export default homeStack;