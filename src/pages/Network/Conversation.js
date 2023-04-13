import {React, useState, useContext, useEffect, useRef} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {useNavigationState} from '@react-navigation/native';

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
// Responsive UI??

// My components
import {LoadScreen} from '../../components/atoms/LoadScreen';
import ChatHeader from '../../components/atoms/ChatHeader';
import Message from '../../components/atoms/Message';
import {SendMessage} from '../../components/atoms/SendMessage';

//Context
import {NotificationContext} from '../../context/NotificationContext';
import {LoggedInUserContext} from '../../context/LoggedInUserContext';
import {UserContext} from '../../context/UserContext';
import {NetworkingContext} from '../../context/NetworkingContext';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Conversation({route, navigation}) {
  const isVisible = useIsFocused();
  const {getUserProfileData} = useContext(UserContext);
  const {
    messageData,
    setMessageData,
    get_historic_chat,
    unread_to_read,
    isBlocked,
    getSaidHi,
    say_hi,
    setIsBlocked,
    isMutualFriend,
  } = useContext(NetworkingContext);

  const {
    id,
    userProfile,
    setUserProfile,
    onUserConvo,
    setOnUserConvo,
    setupChatWebSocket,
    chatServerState,
  } = useContext(LoggedInUserContext);

  const {
    ws_notifications,
    showNotification,
    sayHiNotif,
    setSayHiNotif,
    chatNotif,
    setChatNotif,
  } = useContext(NotificationContext);

  console.log(
    'ws_notifications.current ->>> ' + JSON.stringify(ws_notifications.current),
  );

  var {other_user_email, other_user_id, ws, wsUrl} = route.params;

  const [chatLoading, setChatLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(true);
  const [messageText, setMessageText] = useState('');
  const [inputFieldEmpty, setInputFieldEmpty] = useState(true);
  const [reverseMessageData, setReverseMessageData] = useState([]);

  var sm_interval = useRef();
  var sh_interval = useRef();

  console.log(
    'Conversation ws_chat check_ws_function outside use effect -> ' +
      JSON.stringify(ws),
  );

  useEffect(() => {
    if (isVisible) {
      console.log('Conversation onUserConvo Visible ' + onUserConvo);
      console.log(
        '*** -- called when Conversation screen opens or when back on screen -- *** ',
      );
      /* console.log(
        'ws_notifications.current ->>> ' +
          JSON.stringify(ws_notifications.current),
      );*/
      //getSaidHi({type: 'is-blocked', email2: other_user_email});
      setChatLoading(true);
      setProfileLoading(true);
      getUserProfileData(other_user_email)
        .then(response => response.json())
        .then(data => {
          console.log('user profile data id--> ' + data.id);
          setUserProfile(data);
          //getSaidHi({type: 'is-blocked', email2: data.email});
        })
        .then(() => {
          setProfileLoading(false);
          setOnUserConvo(true);
        })
        .catch(console.log('getUserProfileData promise error'));

      getSaidHi({type: 'mutual-friend', email2: other_user_email});
      getSaidHi({type: 'said-hi', email2: other_user_email});
      getSaidHi({type: 'said-hi-incognito', email2: other_user_email});
      getSaidHi({type: 'is-blocked', email2: other_user_email});

      //setupWebSocket_conv(id,userProfile);
    } else if (!isVisible) {
      setOnUserConvo(false);
      //setupWebSocket(id);
    }
  }, [isVisible]); //eslint-disable-line react-hooks/exhaustive-deps

  const submitMessage = () => {
    try {
      sm_interval.current = setInterval(() => {
        if (ws.readyState == 1) {
          ws.send(JSON.stringify({message: messageText}));
          console.log('conversation readyState == 1');
          clearInterval(sm_interval.current);

          sh_interval.current = setInterval(() => {
            if (ws_notifications.current.readyState == 1) {
              console.log('yoooo')
              ws_notifications.current.send(
                JSON.stringify({
                  notif_type: 'message',
                  message: messageText,
                  receiver: userProfile.id,
                  sender: id,
                }),
              );
              clearInterval(sh_interval.current);
            }
          });
        }
      });

      //ws.send(JSON.stringify({message: messageText}));
      console.log('ws_chat no error 1-> ' + JSON.stringify(ws));
    } catch {
      console.log('ws_chat error 1 -> ' + JSON.stringify(ws));
    }
   /* ws_notifications.current.send(
      JSON.stringify({
        notif_type: 'message',
        message: messageText,
        receiver: userProfile.id,
        sender: id,
      }),
    );*/
    setMessageText('');
    setInputFieldEmpty(true);
    console.log('**** submittttt -->' + messageText + ' ****');
  };

  useEffect(() => {
    if (ws == undefined || ws.readyState == 3 || ws.readyState == 2) {
      console.log('convo page ws undefined');

      /*navigation.setParams({
        ws: setupChatWebSocket(other_user_id, wsUrl),
      });*/

      //ws = setupChatWebSocket(other_user_id, wsUrl);
      console.log(
        'Conversation ws_chat is not ready and check_ws_function in use effect -> ' +
          JSON.stringify(ws),
      );
    }
    // do these once you get other user's id
    console.log(
      '*** called when user profile loading or ws_chat sever changes *** -> ' +
        profileLoading +
        ' ---  id ->' +
        userProfile.id +
        ' ws : ' +
        JSON.stringify(ws),
    );
    get_historic_chat({
      current_user_id: id,
      other_user_id: userProfile.id,
    })
      .then(response => response.json())
      .then(data => setMessageData(data))
      .then(() => {
        setChatLoading(false);
      })
      .catch(console.log('get_historic_chat promise error'));

    const wsUrl = 'ws://127.0.0.1:8000/ws/chat/' + userProfile.id + '/?' + id;
    console.log(wsUrl);
    /*
    ws.onopen = () => {
      console.log('Connected to the server.');
    };
    ws.onclose = e => {
      console.log('Disconnected. Check internet or server.');
    };
    ws.onerror = e => {};
    */
    {
      ws.onmessage = e => {
        const message = JSON.parse(e.data);
        console.log('*** message.messages ***');

        console.log('ws_chat in ws.onmessage : ' + JSON.stringify(ws));

        const date1 = new Date(
          Date.parse(
            JSON.parse(message.last_message.slice(1, -1)).fields.timestamp,
          ),
        );
        const day = date1.getDate();
        const monthYear = date1.toLocaleString('en-gb', {
          month: 'short',
          year: 'numeric',
        });
        const short_date = day + ' ' + monthYear;
        const time = date1.getHours() + ':' + date1.getMinutes();
        const dict = {
          id: JSON.parse(message.last_message.slice(1, -1)).pk,
          sender__email: JSON.parse(message.last_message.slice(1, -1)).fields
            .sender__email,
          sender__id: JSON.parse(message.last_message.slice(1, -1)).fields
            .sender__id,
          message: JSON.parse(message.last_message.slice(1, -1)).fields.message,
          //read: false,
          date: short_date,
          time: time,
        };
        console.log('onmessage dict ---> ' + JSON.stringify(dict));

        setMessageData(x => [...x, dict]);

        //if im looking at the convo screen make messages sent by other user to me read
        if (isVisible) {
          unread_to_read({
            current_user_id: id,
            other_user_id: userProfile.id,
            notif_type: 'message',
          });
        } else {
        }
      };
    }

    const submitMessage = () => {
      try {
        ws.send(JSON.stringify({message: messageText}));
        console.log('ws no error 2-> ' + JSON.stringify(ws));
      } catch {
        console.log('ws error 2 -> ' + JSON.stringify(ws));
      }

      ws_notifications.current.send(
        JSON.stringify({
          notif_type: 'message',
          message: messageText,
          receiver: userProfile.id,
          sender: id,
        }),
      );
      setMessageText('');
      setInputFieldEmpty(true);
      console.log('**** submittttt -->' + messageText + ' ****');
    };
  }, [userProfile, chatServerState]);

  useEffect(() => {
    let abc = [...messageData].reverse();
    setReverseMessageData(abc);
  }, [messageData]); //eslint-disable-line react-hooks/exhaustive-deps

  const showDate = ({item, index}) => {
    if (index < reverseMessageData.length - 1) {
      if (item.date == reverseMessageData.slice(index + 1)[0].date) {
        return null;
      } else {
        return (
          <>
            <View style={{margin: 10}} />
            {/* slice(-2, -1) because the last item in the list is the changed date*/}
            <Text style={styles.date}>{item.date}</Text>
            <View style={{margin: 10}} />
          </>
        );
      }
    }
  };

  const firstDate = item => {
    return (
      <>
        <View style={{margin: 10}} />
        <Text style={styles.date}>{messageData.slice(0)[0].date}</Text>
        <View style={{margin: 10}} />
      </>
    );
  };

  const onChangeText = text => {
    setMessageText(text);
    setInputFieldEmpty(text.length ? false : true);
  };

  //let reverseMessageData = [...messageData].reverse();

  return (
    <>
      {chatLoading && profileLoading ? (
        <LoadScreen />
      ) : (
        <>
          {/*<View
            style={{
              height: 30,
              backgroundColor: '#eeceff',
              padding: 5,
            }}>
            <Text>{serverState}</Text>
          </View>*/}
          <ChatHeader
            first_name={userProfile.first_name} //userProfile.first_name
            picture={userProfile.avatar}
            onPress={() =>
              navigation.push('User Profile', {
                email: other_user_email,
                other_user_id: other_user_id,
                ws: ws,
                wsUrl: wsUrl,
              })
            }
          />
          <View style={{...styles.screen, ...{flex: isBlocked ? 5 : 15}}}>
            {
              <>
                {
                  <FlatList
                    data={reverseMessageData}
                    renderItem={({item, index}) => {
                      const isEnd = index == reverseMessageData.length - 1;
                      return (
                        <>
                          <Message item={item} />
                          {/* Print date after last message in list*/}
                          {showDate({item: item, index: index})}
                          {isEnd && firstDate(item)}
                        </>
                      );
                    }}
                    keyExtractor={item => item.id}
                    inverted={-1}
                  />
                }
                <View style={{marginBottom: 50}} />
              </>
            }
          </View>

          <View style={styles.sendMessage}>
            {!isBlocked && isMutualFriend && (
              <SendMessage
                inputStyle={styles.input}
                placeholderText={'Message..'}
                onChangeText={text => {
                  onChangeText(text);
                }}
                value={messageText}
                onPress={submitMessage}
                disabled={inputFieldEmpty}
                ws={ws}
                //disabled={disableButton || inputFieldEmpty}
              />
            )}
            {isBlocked && (
              <>
                <View style={styles.blockedTextRow}>
                  <Text style={styles.blockedText}>
                    You have blocked this user and can't send them messages.
                    Unblock to send them a message.
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.unblock}
                  onPress={() => {
                    say_hi({type: 'unblock', email2: other_user_email});
                    setIsBlocked(false);
                  }}>
                  <Text style={styles.text}>{'Unblock'}</Text>
                </TouchableOpacity>
              </>
            )}
            {!isBlocked && !isMutualFriend && (
              <>
                <View style={styles.blockedTextRow}>
                  <Text style={styles.blockedText}>
                    Say hi to each other to send messages.
                  </Text>
                </View>
              </>
            )}
          </View>
        </>
      )}
    </>
  );
}

//<Message content = {'yoo'}/>
// Styles
const styles = StyleSheet.create({
  screen: {
    flex: 15,
    backgroundColor: '#0E0E2C',
    //height: '50%',
  },
  sendMessage: {
    flex: 1,
    backgroundColor: '#0E0E2C',
    //height: '50%',
  },
  input: {
    margin: 100,
    height: '100%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#0E0E2C',
    //height: '50%',
  },
  messageContainerSend: {
    backgroundColor: 'blue',
    maxWidth: '80%',
    alignSelf: 'flex-end',
    flexDirection: 'row',
    borderRadius: 15,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    paddingTop: 5,
    paddingBottom: 10,
    marginBottom: 10,
    borderTopRightRadius: 0,
  },
  messageContainerReceive: {
    backgroundColor: 'grey',
    maxWidth: '80%',
    alignSelf: 'flex-start',
    flexDirection: 'row',
    borderRadius: 15,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    paddingTop: 5,
    paddingBottom: 10,
    marginBottom: 10,
    borderTopLeftRadius: 0,
  },
  messageView: {
    backgroundColor: 'transparent',
    maxWidth: '40%',
  },
  message: {
    color: 'white',
    //alignSelf: 'flex-start',
    fontSize: 15,
  },
  date: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 15,
    marginBottom: 10,
  },
  flatList: {
    marginTop: windowHeight * 0.015,
    marginHorizontal: windowWidth * 0.05,
  },
  blockedText: {
    fontSize: 13,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    paddingBottom: 0,
    //padding: '10%',
    //alignSelf: 'flex-start',
    //textAlign: 'left'
  },
  blockedTextRow: {
    flexDirection: 'row',
    paddingHorizontal: '5%',
    justifyContent: 'center',
    paddingBottom: '3%',
    //alignSelf: 'flex-start',
  },
  unblock: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    backgroundColor: '#13748A', //: '#2AAFCC',
    width: windowWidth * 0.3,
    height: windowHeight * 0.035,
    marginHorizontal: 70,
    alignSelf: 'center',
    //top: windowHeight * 0.33,
    //position: 'absolute',
  },
  text: {
    fontSize: 13,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});

/*
        const abc = [...messageData].reverse();
        console.log('onmessage abcd ---> ' + JSON.stringify(abc));
        setReverseMessageData(abc);

        console.log(
          'onmessage reverseMessageData ---> ' +
            JSON.stringify(reverseMessageData),
        );*/
