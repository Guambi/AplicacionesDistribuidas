import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

class InitPage extends React.Component {
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
        height: 1000,
        width: 100
    }
});