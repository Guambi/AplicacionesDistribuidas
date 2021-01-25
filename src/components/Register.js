import React, { Component, useState } from 'react'
import {
    Text,
    View,
    StyleSheet,
    Button,
    TextInput,
    ToastAndroid,
    ScrollView,
} from 'react-native'
import {getRegisterEmailValidateCode, registerAccountWithEmail, createHome} from '@volst/react-native-tuya';

class Register extends Component {

    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            countryCode: '+593',
            code: '',
            info: ''
        };
    }

    getCode = async () => {

        await getRegisterEmailValidateCode({
            countryCode: this.state.countryCode,
            email: this.state.email
        }).then(async data => {
            ToastAndroid.show("Send Code success", ToastAndroid.LONG);
        }, e =>{
            console.log("error mensaje: "+ e)
            this.setState({info: "Invalid Email"});
        });
    }

    register = async () => {
        this.setState({info: ""});
        const {email, password, countryCode, code} = this.state;
        await registerAccountWithEmail({
            countryCode: countryCode,
            email: email,
            password: password,
            validateCode: code
        }).then( () => {
            this.props.navigation.navigate('Home');
        }).catch(e => {
            ToastAndroid.show(e.toString(), ToastAndroid.LONG);
        });
    }

    render() {
        return(
            <ScrollView
                contentInsetAdjustmentBehavior="automatic">
                <View style={styles.body}>
                    <Text>Email:</Text>
                    <TextInput style={styles.input} autoCompleteType="email" placeholder="Email"
                    onChangeText={value => this.setState({email: value})}/>
                    <Text style={styles.invalid}>{this.state.info}</Text>
                    <Text>Password:</Text>
                    <TextInput style={styles.input} secureTextEntry={true} placeholder="Email" 
                    onChangeText={value => this.setState({password: value})}/>
                    <Button
                        title="Get Code"
                        color="#841584"
                        accessibilityLabel="Boton para obtener codigo"
                        onPress={this.getCode}
                    />

                    <Text>Codigo:</Text>
                    <TextInput style={styles.input} placeholder="Code" 
                    onChangeText={value => this.setState({code: value})}/>

                    <Button title="Register"
                        color="#841584"
                        accessibilityLabel="Boton para registrarse"
                        onPress={this.register}/>
                </View>

            </ScrollView>
        )
    }
}

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

export default Register;