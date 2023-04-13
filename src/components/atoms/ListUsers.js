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

import {NetworkingContext} from '../../context/NetworkingContext';
import {LoggedInUserContext} from '../../context/LoggedInUserContext';
import {NotificationContext} from '../../context/NotificationContext';

// Responsive UI??
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function ListUsers({navigation, item, page}) {
  const isVisible = useIsFocused();
  console.log('******* EMAILLL' + item.email);
  const {id, setupChatWebSocket, serverState, chatServerState} =
    useContext(LoggedInUserContext);
  const {sayHiNotif, setSayHiNotif, ws_chat, ws_domain} =
    useContext(NotificationContext);
  const {unread_to_read, getFriends} = useContext(NetworkingContext);
  const [newHi, setNewHi] = useState(false);
  const wsUrl = ws_domain + 'ws/chat/' + item.id + '/?' + id;

  const socket = useRef(null);
  const netInfo = useNetInfo();

  useEffect(() => {
    if (isVisible) {
      socket.current = setupChatWebSocket(item.id.toString(), wsUrl);
      console.log(
        'ListUsers ws_chat userWs check_ws_function -> ' +
          JSON.stringify(socket.current),
      );

      socket.current = setupChatWebSocket(item.id.toString(), wsUrl);
      if (item.unread_hi_count > 0) {
        setNewHi(true);
      } else {
        setNewHi(false);
      }
      console.log(
        '*** -- called when LISTUSERS screen opens or when back on screen -- *** ',
      );
    }
  }, [isVisible, netInfo.isInternetReachable]); //eslint-disable-line react-hooks/exhaustive-deps
  //unread_hi_count
  return (
    <TouchableOpacity
      style={{alignItems: 'center', justifyContent: 'center'}}
      onPress={() => {
        navigation.push('User Profile', {
          email: item.email,
          other_user_id: item.id.toString(),
          ws: socket.current,
          wsUrl: wsUrl,
        });
        if (page == 'sayHi') {
          unread_to_read({
            current_user_id: id,
            other_user_id: item.id,
            notif_type: 'sayHi',
          });
          const updatedSayHiNotif = new Set([sayHiNotif]); //new Set(sayHiNotif);
          updatedSayHiNotif.delete(item.id.toString().trim());
          setSayHiNotif(updatedSayHiNotif);
          setNewHi(false);
        }
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 20,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
          <Image
            source={{
              uri: item.avatar,
            }}
            style={styles.image}
          />
          <View style={{width: windowWidth - 400}}>
            <Text style={styles.title}>
              {item.first_name + ', ' + item.age}
            </Text>
            {newHi && (
              <View style={styles.unreadIcon}>
                <Text style={styles.unreadText}></Text>
              </View>
            )}
            <Text numberOfLines={1} style={styles.subtitle}>
              {item.role}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

// Styles
const styles = StyleSheet.create({
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
  unreadIcon: {
    flexDirection: 'row',
    width: windowWidth * 0.03,
    height: windowWidth * 0.03,
    borderRadius: 100,
    borderWidth: 1,
    backgroundColor: '#39A3BA', //'#3EBFDB', //'#F91F6D'
    position: 'absolute',
    left: windowWidth * 0.55,
    top: windowHeight * 0.005,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0.005 * windowHeight,
  },
});
