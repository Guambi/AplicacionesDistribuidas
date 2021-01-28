import React from 'react';
import {
    StyleSheet,
    ActivityIndicator,
    View
} from 'react-native'
import { initActivator } from '@volst/react-native-tuya';
import ewelink from 'ewelink-api';

class Connecting extends React.Component {
    constructor(props){
        super(props);
        const params = this.props.route.params;
        this.state = {
            homeId: params.homeId,
            ssid: params.ssid,
            password: params.password,
            time: 120,
            type: "TY_EZ",
            animating: true,
        };
    }

    componentDidMount(){
        const {homeId, ssid, password, time, type} = this.state;
        initActivator({
            homeId: homeId,
            ssid: ssid,
            password: password,
            time: time,
            type: type
        }).then(data => {
            console.log('acepto');
            console.log(data);
            this.props.navigation.navigate('Home');
        }).catch(e => {
            console.log('rechazo');
            console.log(e.toString());
            this.setState({
                animating: false
            });
        });;
    }

    render() {
        return (
            <View style={[styles.container, styles.horizontal]}>
                <ActivityIndicator size="large" color="#00ff00" animating={this.state.animating} />
            </View>
        );
    }
}

export default Connecting;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center"
      },
      horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
      }
});