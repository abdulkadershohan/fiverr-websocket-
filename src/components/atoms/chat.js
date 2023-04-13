import WebSocket from 'ws';
import {React, useState, useContext, useEffect, useRef} from 'react';
import {useIsFocused} from '@react-navigation/native';

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
  Alert,
  Pressable,
  Dimensions,
} from 'react-native';

//WebSocket('ws://localhost:6969')
// var ws = new WebSocket('ws://host.com/path');
//"redis://127.0.0.1:6379"
//const client = new W3CWebSocket('ws://127.0.0.1:8000');

//new WebSocket('ws://127.0.0.1:8000/chat/3/1/');

const Chat = props => {
  // Initiate socket on screen load
  useEffect(() => {
    initiateSocketConnection();
  }, []);

  const initiateSocketConnection = () => {
    // Add URL to the server which will contain the server side setup
    const ws = new WebSocket('ws://127.0.0.1:8000/chat/3/1/');

    // When a connection is made to the server, send the user ID so we can track which
    // socket belongs to which user
    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          userId: 20,
        }),
      );
    };

    // Ran when the app receives a message from the server
    ws.onmessage = e => {
      //const message = JSON.parse(e.data);
      // a message was received
      console.log(e.data);
    };
  };

  return (
    <>
      <SafeAreaView></SafeAreaView>
    </>
  );
};

export default Chat;
