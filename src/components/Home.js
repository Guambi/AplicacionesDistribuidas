import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, FlatList, Image, Pressable, Switch} from 'react-native';
import { queryHomeList, getHomeDetail, createHome, logout, send } from '@volst/react-native-tuya';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      home: null,
      devList: [],
    };
  }

  componentDidMount() {
    this.getData();
    // createHome({
    //   name: 'Casa del Campo',
    //   lon: 0,
    //   lat: 0,
    //   geoName: "Ecuador",
    //   rooms: []
    // }).then(bean => {
    //     console.log(bean);
    // }).catch();
    
  }

  getHomeDetail() {
    getHomeDetail({ homeId: this.state.home.homeId }).then(data => {
      console.log(data.deviceList);
      this.setState(
        {
          devList: data.deviceList
        }
      )
    })
  }

  getData() {
    queryHomeList()
      .then((data) => {
        if (data.length != 0) {
          this.setState({
            home: data[0],
            devList: []
          }, () => {
            this.getHomeDetail()
          });
          // this.props.dispatch(storeHomeId(data[0].homeId));
        } else {
          this.setState({
            home: null,
          })
        }
      })
  }

  logout = () => {
    logout().then(() => {
      this.props.navigation.navigate('Welcome');
    }).catch(e => {
      console.log(e.toString());
    })
    
  }

  new = () => {
    this.props.navigation.navigate('New Device', {homeId: this.state.home.homeId});
  }

  changePower = async () => {
    const dps = {"1": false};
    let devId = this.state.devId;
    await send({
      devId: devId,
      command: dps
    }).then(data => {
      console.log(data);
    }).catch(e => {
      console.log(e.toString());
    });
    this.setState({
      status: !this.state.status
    });
  }

  render() {
    const renderItem = ({ item }) => (
      <Pressable style={({ pressed }) => [
        {
          backgroundColor: pressed
            ? 'rgb(210, 230, 255)'
            : 'white'
        },]}
        >
        <View style={styles.itemContainer}>
          <Image style={styles.image} source={{uri: item.iconUrl}} />
          <Text> {item.name} </Text>
          <Text>{item.isOnline? 'Online' : 'Offline'}</Text>
          <Switch 
          onValueChange={this.changePower}
          value={item.dpCodes.switch_1}/>
        </View>
      </Pressable>
    );
    return (
      <View>
        <Text style={styles.textHome}>{this.state.home ? this.state.home.name : 'create Home'}</Text>
        <FlatList 
        data={this.state.devList}
        renderItem={renderItem}
        keyExtractor={item => item.devId}
        />
        {/* <View style={styles.bar}> */}
        <Button title="Inicio" onPress={this.home} />
        <Button title="Anadir Dispositivo" onPress={this.new} />
        <Button title="Cerrar Sesion" onPress={this.logout} />
        
        {/* </View> */}
      </View>
    );
  }
}

export default Home;

const styles = StyleSheet.create({
  bar: {
    flex: 1,
    flexDirection: 'row',
    borderColor: 'gray',
    borderWidth: 1,
  },
  button: {
    color: 'black'
  },
  image:{
    width: 50,
    height: 50
  },
  textHome: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: "bold"
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10
  },
});