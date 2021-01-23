import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

class Home extends React.Component {
  render() {
    return (
      <View>
        <Text style={styles.text}>Hola mundo desde Home</Text>
      </View>
    );
  }
}

export default Home;

const styles = StyleSheet.create({
    text: {
        color: 'black'
    },
});