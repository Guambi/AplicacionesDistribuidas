import React, { Component, useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Button,
    TextInput,
    ToastAndroid,
    ScrollView,
} from 'react-native'
import {loginWithEmail} from '@volst/react-native-tuya';


class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            countryCode: '+593',
            info: ''
        };
    }

    login = async () => {
        this.setState({info: ""});
        const {email, password, countryCode} = this.state;
        await loginWithEmail({
            countryCode: countryCode,
            email: email,
            password: password
        }).then(() => {
            this.props.navigation.navigate('Home');
        }).catch(e => {
            ToastAndroid.show(e.toString(), ToastAndroid.LONG);
        });

    }

    render() {
        return (
            <ScrollView
            contentInsetAdjustmentBehavior="automatic">
            <View style={styles.body}>
                <Text>Email:</Text>
                <TextInput style={styles.input} autoCompleteType="email" placeholder="Email"
                onChangeText={value => this.setState({email: value})}/>
                <Text>Password:</Text>
                <TextInput style={styles.input} secureTextEntry={true} placeholder="Email" 
                onChangeText={value => this.setState({password: value})}/>

                <Button title="Login"
                    color="#841584"
                    accessibilityLabel="Boton para registrarse"
                    onPress={this.login}/>
            </View>

        </ScrollView>
        );
    }
}

export default Login;

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
    },
    invalid: {
        color: 'red'
    }
});