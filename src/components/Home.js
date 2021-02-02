import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, FlatList, Image, Pressable, Switch} from 'react-native';
import { queryHomeList, getHomeDetail, createHome, logout, send } from '@volst/react-native-tuya';
import Constant from '../contanst';



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
    getHomeDetail({ homeId: this.state.home.homeId }).then(async data => {
    
      console.log(Constant.userName)
      let response = await new Promise(resolve => {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://node-ca.herokuapp.com/dispositivos/'+Constant.userName+'/'+Constant.password, true);
        // xhr.open("GET", 'https://node-ca.herokuapp.com/dispositivos/appdistribuidas2020@gmail.com/appdistribuidas', true);
        xhr.onload = function(e) {
          resolve(xhr.response);
        };
        xhr.onerror = function () {
          resolve(undefined);
          console.error("** An error occurred during the XMLHttpRequest");
        };
        xhr.send();
      }) 
      let dataConverted = JSON.parse(response);

      if(!dataConverted.error){
        this.setState(
          {
            devList: data.deviceList.concat(dataConverted)
          }
        )
        // console.log(data.deviceList.concat(dataConverted));
      }else{
        this.setState(
          {
            devList: data.deviceList
          }
        )
      }
      
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

  changePower = async (devId, status) => {
    const dps = {"1": !status};
    // let devId = this.state.devId;
    console.log(devId, status);
    await send({
      devId: devId,
      command: dps
    }).then(data => {
      console.log(data);
    }).catch(e => {
      console.log(e.toString());
    });
    this.getData();
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
          <Image style={styles.image} source={{uri: item.iconUrl? item.iconUrl: item.brandLogoUrl}} />
          <Text> {item.name} </Text>
          <Text>{(item.isOnline? item.isOnline: item.online)? 'Online' : 'Offline'}</Text>
          {/* <Switch 
          onValueChange={() => this.changePower(item.devId, item.dpCodes.switch_1)}
          value={item.dpCodes.switch_1}/> */}
        </View>
      </Pressable>
    );
    return (
      <View>
        <Text style={styles.textHome}>{this.state.home ? this.state.home.name : 'create Home'}</Text>
        <FlatList 
        data={this.state.devList}
        renderItem={renderItem}
        keyExtractor={item => item.devId? item.devId: item.deviceid}
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