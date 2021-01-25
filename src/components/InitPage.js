import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {getCurrentUser} from '@volst/react-native-tuya';


class InitPage extends React.Component {

    async componentDidMount() {
        await getCurrentUser().then(d=>{
            console.log(d);
          if(d){
            this.props.navigation.navigate('Home')
          }
        })
      }

    render() {
        return (
            <View style={styles.body}>
                <Button
                    style={styles.button}
                    title="Registrate"
                    onPress={() =>
                        this.props.navigation.navigate('Register')
                    }
                />
                <Button
                    style={styles.button}
                    title="Login"
                    onPress={() =>
                        this.props.navigation.navigate('Login')
                    }
                />
            </View>
        );
    }
}

export default InitPage;

const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        height: 100,
        width: 100
    }
});