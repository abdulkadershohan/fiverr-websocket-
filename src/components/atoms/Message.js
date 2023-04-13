import {React, useState, useContext, useEffect} from 'react';

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TextInput,
  FlatList,
  ListItem,
  TouchableOpacity,
  Image,
  Button,
  Dimensions,
} from 'react-native';

// Responsive UI??
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

//Context

import {LoggedInUserContext} from '../../context/LoggedInUserContext';

export default function Message({item}) {
  const {email, id} = useContext(LoggedInUserContext);
  if (item.sender__id == id) {
    return (
      <View style={styles.messageContainerSend}>
        <View style={styles.messageView}>
          <Text style={styles.message}>{item.message}</Text>
        </View>
        <View style={styles.timeView}>
          <Text style={styles.time}>{item.time}</Text>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.messageContainerReceive}>
        <View style={styles.messageView}>
          <Text style={styles.message}>{item.message}</Text>
        </View>
        <View style={styles.timeView}>
          <Text style={styles.time}>{item.time}</Text>
        </View>
      </View>
    );
  }
}

// Styles
const styles = StyleSheet.create({
  messageContainerSend: {
    backgroundColor: '#2C8DFF',
    maxWidth: '80%',
    alignSelf: 'flex-end',
    flexDirection: 'row',
    borderRadius: 15,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    paddingTop: 5,
    paddingBottom: 10,
    marginBottom: 10,
    borderBottomRightRadius: 0,
  },
  messageContainerReceive: {
    backgroundColor: 'transparent',
    maxWidth: '80%',
    alignSelf: 'flex-start',
    flexDirection: 'row',
    borderRadius: 15,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    paddingTop: 5,
    paddingBottom: 10,
    marginBottom: 10,
    borderBottomLeftRadius: 0,
    borderColor: '#2CA6FF', //'#2CA6FF',
    borderWidth: 0.5,
  },
  messageView: {
    backgroundColor: 'transparent',
    maxWidth: '80%',
  },
  message: {
    color: 'white',
    alignSelf: 'flex-start',
    fontSize: 15,
  },
  /*time: {
    marginLeft: 10,
    color: 'white',
    //alignSelf: 'center',
    justifyContent: "flex-end",
    //alignContent:'center',
    fontSize: 9,
  },*/

  timeView: {
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    paddingLeft: 10,
  },
  time: {
    color: 'lightgray',
    alignSelf: 'flex-end',
    //marginLeft: 40,
    fontSize: 10,
  },
});
