import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    Button,
    TextInput,
    ToastAndroid,
    ScrollView,
} from 'react-native'
import NetInfo from "@react-native-community/netinfo";

class NewDevice extends React.Component {
    constructor(props){
        super(props);
        const params = this.props.route.params;
        this.state = {
            homeId: params.homeId,
            ssid: "",
            password: "",
            time: 120,
            type: "TY_QR"
        };
    }

    componentDidMount(){
        NetInfo.fetch().then(info => {
            if(info.type == 'wifi' &&  info.details.ssid){
                this.setState({
                    ssid: info.details.ssid
                });
            }
        });
    }

    continue = () => {
        const {homeId, ssid, password} = this.state;
        this.props.navigation.navigate('Connecting', {
            homeId: homeId,
            ssid: ssid,
            password: password
         });
    }

    render() {
        return (
            <ScrollView
            contentInsetAdjustmentBehavior="automatic">
            <View>
                <Text>Verify is the light is flashing</Text>
            </View>
            <View style={styles.body}>
                <Text>SSID</Text>
                <TextInput style={styles.input} value={this.state.ssid} onChangeText={value => this.setState({ssid: value})}/>
                <Text>Password</Text>
                <TextInput style={styles.input} onChangeText={value => this.setState({password: value})} />
                <Button title="Continuar" onPress={this.continue}/>
            </View>

        </ScrollView>
        );
    }
}

export default NewDevice;

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