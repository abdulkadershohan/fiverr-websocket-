import {React, useState, useContext, useEffect, useRef} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {useNetInfo} from '@react-native-community/netinfo';

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

import {useNavigation} from '@react-navigation/native';

//Context
import {AuthContext} from '../../context/AuthContext';
import {NotificationContext} from '../../context/NotificationContext';
import {LoggedInUserContext} from '../../context/LoggedInUserContext';
import {NetworkingContext} from '../../context/NetworkingContext';

// Responsive UI??
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function ListChats({navigation, item, isVisible}) {
  const {unread_to_read} = useContext(NetworkingContext);
  const {
    id,
    setOnUserConvo,
    setupChatWebSocket,
    chatServerState,
    isOffline,
    setOfflineStatus,
  } = useContext(LoggedInUserContext);
  const {chatNotif, setChatNotif, ws_domain, ws_chat, ws_notifications} =
    useContext(NotificationContext);
  const [wsState, setWsState] = useState(ws_chat[item.id.toString()]);
  const socket = useRef(null);
  const netInfo = useNetInfo();
  const wsUrl = ws_domain + 'ws/chat/' + item.id + '/?' + id;
  //ws_chat.current['hi'] = 'yooooooo'
  //console.log('ws_chat.current hi ' + ws_chat.current['hi'])
  console.log(
    'ws_notifications.current ListChats -> ' +
      JSON.stringify(ws_notifications.current),
  );

  const [serverMessages, setServerMessages] = useState([item.latest_message]); //runs once
  const [newMessagesCount, setNewMessagesCount] = useState(
    () => item.unread_message_count,
  ); //runs once

  /*
  useEffect(() => {
    function handleFirstConnectivityChange(isConnected) {
      console.log(
        'handleFirstConnectivityChange -> We are ' +
          (isConnected ? 'online' : 'offline'),
      );
      if (isConnected == true) {
        userWs = setupChatWebSocket(item.id.toString(), wsUrl);
      }
    }
    /*useNetInfo.isConnected.addEventListener(
      'change',
      handleFirstConnectivityChange,
    );*/
  /*
    NetInfo.addEventListener(state => {
      console.log('Changed Connection Type', state.type);
      console.log('Is connected?', state.isConnected);
      if (state.isInternetReachable == true) {
        userWs = setupChatWebSocket(item.id.toString(), wsUrl);
      }
    });
  }, []);

  */

  useEffect(() => {
    if (isVisible) {
      socket.current = setupChatWebSocket(item.id.toString(), wsUrl);
      //setWsState(userWs);
      console.log(
        'ListChats ws_chat check_ws_function -> ' +
          JSON.stringify(socket.current),
      );
      socket.current = setupChatWebSocket(item.id.toString(), wsUrl); //userWs
      var serverMessagesList = [item.latest_message];
      setServerMessages([item.latest_message]);
      setNewMessagesCount(() => item.unread_message_count);

      console.log(
        '*** -- called when ListChats screen opens or when back on screen -- *** ',
      );
      socket.current.onopen = () => {
        console.log('** LISTCHATS ** Connected to the server.');
      };
      socket.current.onclose = e => {
        console.log('** LISTCHATS ** Disconnected.');
      };
      socket.current.onerror = e => {};
      socket.current.onmessage = e => {
        console.log(
          '** LISTCHATS ** onmessage : userWs' + JSON.stringify(socket.current),
        );
        const message = JSON.parse(e.data);

        const promiseA = new Promise((resolve, reject) => {
          serverMessagesList.push(
            JSON.parse(message.last_message.slice(1, -1)).fields.message,
          );
          resolve(serverMessagesList);
        });

        const promiseB = promiseA
          .then(val => setServerMessages([...val]))
          .catch(console.log('promiseA promise error'));
      };
    } else {
      //ws.close();
    }
  }, [isVisible]); // netInfo.isInternetReachable  //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setNewMessagesCount(item.unread_message_count + serverMessages.length - 1);
  }, [serverMessages]); //eslint-disable-line react-hooks/exhaustive-deps

  if (item?.latest_message?.length > 27) {
    var latest_message = item.latest_message.slice(0, 27).trim() + '...';
  } else {
    var latest_message = item.latest_message;
  }
  return (
    <TouchableOpacity
      style={{alignItems: 'center', justifyContent: 'center'}}
      onPress={() => {
        navigation.push('Conversation', {
          other_user_email: item.email,
          other_user_id: item.id.toString(),
          ws: socket.current,
          wsUrl: wsUrl,
        });
        //setOnUserConvo(true);
        unread_to_read({
          current_user_id: id,
          other_user_id: item.id,
        });
        const updatedChatNotif = new Set(chatNotif);
        updatedChatNotif.delete(item.id.toString().trim());
        setChatNotif(updatedChatNotif);
      }}>
      <View style={styles.container}>
        <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
          <Image
            source={{
              uri: item.avatar,
            }}
            style={styles.image}
          />
          <View style={{width: windowWidth - 400}}>
            <Text style={styles.title}>{item.first_name}</Text>

            {newMessagesCount > 0 && (
              <View style={styles.unreadIcon}>
                <Text style={styles.unreadText}>{newMessagesCount}</Text>
              </View>
            )}

            <Text
              numberOfLines={1}
              style={
                newMessagesCount > 0 ? styles.messageUnread : styles.messageRead
              }>
              {serverMessages?.slice(-1)}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
  },
  unreadIcon: {
    flexDirection: 'row',
    minWidth: windowWidth * 0.06,
    height: windowWidth * 0.06,
    borderRadius: 100,
    borderWidth: 1,
    backgroundColor: '#39A3BA', //'#3EBFDB',
    position: 'absolute',
    left: windowWidth * 0.55,
    top: windowHeight * 0.005,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0.005 * windowHeight,
  },
  unreadText: {
    color: '#0E0E2C',
    fontSize: 0.03 * windowWidth,
    fontWeight: '500',
    //padding: 0.003 * windowHeight,
  },
  screen: {
    backgroundColor: '#0E0E2C',
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },

  image: {
    width: windowWidth * 0.2,
    height: windowWidth * 0.2,
    borderRadius: 100,
    marginRight: windowWidth * 0.03,
  },

  title: {
    color: 'white',
    //fontFamily: 'Roboto-Medium',
    fontSize: 0.035 * windowWidth,
    fontWeight: '500',
  },

  subtitle: {
    color: '#9E9E9E',
    //fontFamily: 'Roboto-Medium',
    fontSize: 0.035 * windowWidth,
    marginTop: 0.003 * windowHeight,
  },
  messageRead: {
    color: '#9E9E9E',
    //fontFamily: 'Roboto-Medium',
    fontSize: 0.035 * windowWidth,
    marginTop: 0.003 * windowHeight,
  },
  messageUnread: {
    color: 'white',
    //fontFamily: 'Roboto-Medium',
    fontSize: 0.035 * windowWidth,
    marginTop: 0.003 * windowHeight,
  },
});
