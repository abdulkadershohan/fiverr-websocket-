import {React, useState, useContext, useEffect, useRef} from 'react';
import {useIsFocused} from '@react-navigation/native';
import ConfettiCannon from 'react-native-confetti-cannon';
import ConfettiExplosion from 'react-confetti-explosion';
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
  ActivityIndicator,
} from 'react-native';

// import ActionSheet
import ActionSheet from 'react-native-actionsheet';

// Navigation
import ProfileTab1 from '../../navigation/Profile/ProfileTab1';

// Icons
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
Entypo.loadFont();
Ionicons.loadFont();

//Context
import {NotificationContext} from '../../context/NotificationContext';
import {LoggedInUserContext} from '../../context/LoggedInUserContext';
import {UserContext} from '../../context/UserContext';
import {NetworkingContext} from '../../context/NetworkingContext';

//atoms
import {LoadScreen} from '../../components/atoms/LoadScreen';

// Responsive UI??
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const pictureWidth = windowWidth;
const pictureHeight = windowHeight * 0.35;

export default function UserProfile({route, navigation}) {
  const {getUserProfileData} = useContext(UserContext);
  const {
    say_hi,
    getSaidHi,
    setSaidHi,
    saidHi,
    saidHiIncognito,
    setSaidHiIncognito,
    isMutualFriend,
    setIsMutualFriend,
    isBlocked,
    setIsBlocked,
  } = useContext(NetworkingContext);
  const {
    id,
    firstName,
    saidHiCount,
    setOnUserPage,
    userProfile,
    setUserProfile,
    setOnUserConvo,
  } = useContext(LoggedInUserContext);
  const {ws_notifications, ws_chat, ws_domain, sayHiNotif, setSayHiNotif} =
    useContext(NotificationContext);
  var {email, other_user_id, ws, wsUrl} = route.params;
  const isVisible = useIsFocused();

  const [profileLoading, setProfileLoading] = useState(true);
  const [shoot, setShoot] = useState(false);

  var sh_interval = useRef();

  let actionSheet = useRef();
  if (isBlocked == false && isMutualFriend == true) {
    var optionArray = ['Block User', 'Remove Friend', 'Cancel'];
  } else if (isBlocked == false && isMutualFriend == false) {
    var optionArray = ['Block User', 'Cancel'];
  } else {
    var optionArray = ['Unblock User', 'Cancel'];
  }

  const showActionSheet = () => {
    //To show the Bottom ActionSheet
    actionSheet.current.show();
  };
  //var wsUrl = '';
  useEffect(() => {
    if (isVisible) {
      setProfileLoading(true);
      console.log(
        '*** -- called when User Profile screen opens or when we back on the screen -- *** ',
      );
      console.log('hello');
      console.log(email);
      //getUserProfileData(email);
      getUserProfileData(email)
        .then(response => response.json())
        .then(data => {
          setUserProfile(data);
          console.log('ididid - > ' + data.id);
          //wsUrl = 'ws://127.0.0.1:8000/ws/chat/' + data.id + '/?' + id;
        })
        .then(() => setProfileLoading(false))
        .catch(console.log('getUserProfileData promise error'));
      getSaidHi({type: 'mutual-friend', email2: email});
      getSaidHi({type: 'said-hi', email2: email});
      getSaidHi({type: 'said-hi-incognito', email2: email});
      getSaidHi({type: 'is-blocked', email2: email});
      console.log(
        '************* USER PROFILE PAGE ************  ' +
          userProfile.first_name,
      );
      console.log(userProfile);
      console.log(saidHi);
    } else {
    }
  }, [isVisible]); //eslint-disable-line react-hooks/exhaustive-deps

  console.log(' userWs - ' + JSON.stringify(ws));

  return (
    //wrap my Tab Navigator and the custom components inside a React.Fragment
    <>
      {profileLoading ? (
        <LoadScreen />
      ) : (
        <>
          <View
            style={{
              backgroundColor: '#0E0E2C',
              //paddingTop: 10,
              paddingBottom: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                style={{alignItems: 'center', justifyContent: 'center'}}
                onPress={() => navigation.push('User Photos', {email: email})}>
                <Image
                  source={{uri: userProfile.avatar}}
                  style={styles.main_image}
                />
              </TouchableOpacity>
            </View>
            <Image source={{uri: userProfile.image1}} style={styles.image1} />
            <Image source={{uri: userProfile.image2}} style={styles.image2} />
            {saidHi && !isMutualFriend && (
              <TouchableOpacity
                style={styles.roundButton1Hi}
                onPress={() => {
                  console.log(email);
                  say_hi({type: 'remove-say-hi', email2: email});
                  ws_notifications.current.send(
                    JSON.stringify({
                      notif_type: 'remove sayHi',
                      message: firstName + ' removed sayHi!',
                      receiver: userProfile.id,
                      sender: id,
                    }),
                  );
                  setSaidHi(false);
                  setShoot(false);
                }}>
                <Text style={styles.text}>{'SAID HI'}</Text>
              </TouchableOpacity>
            )}
            {!saidHi && !isMutualFriend && !isBlocked && (
              <TouchableOpacity
                style={styles.roundButton1NoHi}
                onPress={() => {
                  console.log(email);
                  say_hi({type: 'say-hi', email2: email}).then(text => {
                    console.log(' *** subscription text *** ->>  ' + text);
                    if (text == 'More his') {
                      console.log('first_name ->' + firstName);
                      sh_interval.current = setInterval(() => {
                        if (ws_notifications.current.readyState == 1) {
                          ws_notifications.current.send(
                            JSON.stringify({
                              notif_type: 'sayHi',
                              message: firstName + ' said Hi!',
                              receiver: userProfile.id,
                              sender: id,
                            }),
                          );
                          clearInterval(sh_interval.current);
                        }
                      });
                      setSaidHi(true);
                      getSaidHi({type: 'mutual-friend', email2: email});
                      setShoot(true);
                    } else {
                      alert(
                        "You've said hi to the maximum number of people on a Free plan. Please upgrade to say hi to more people.",
                      );
                      navigation.push('Subscription');
                    }
                  });

                  //setShoot(false);
                }}>
                <Text style={styles.text}>{'SAY HI'}</Text>
              </TouchableOpacity>
            )}
            {shoot && (
              <ConfettiCannon
                count={20}
                origin={{x: 100, y: 0}}
                fadeOut={true}
                explosionSpeed={1500}
                fallSpeed={2200}
              />
            )}
            {isMutualFriend && (
              <TouchableOpacity
                style={styles.chat}
                onPress={() => {
                  console.log('chat button pressed');
                  navigation.push('Conversation', {
                    other_user_email: email,
                    other_user_id:other_user_id,
                    ws: ws,
                    wsUrl: wsUrl,
                  });
                  //setOnUserConvo(true);
                }}>
                <Text style={styles.text}>{'CHAT'}</Text>
              </TouchableOpacity>
            )}
            {isBlocked && (
              <TouchableOpacity
                style={styles.unblock}
                onPress={() => {
                  say_hi({type: 'unblock', email2: email});
                  setIsBlocked(false);
                }}>
                <Text style={styles.text}>{'Unblock'}</Text>
              </TouchableOpacity>
            )}
            {saidHiIncognito && !isMutualFriend && !isBlocked && (
              <TouchableOpacity
                style={styles.roundButton2Hi}
                onPress={() => {
                  say_hi({type: 'remove-say-hi-incognito', email2: email});
                  setSaidHiIncognito(false);
                }}>
                <Text style={styles.text}>{'SAID HI INCOGNITO'}</Text>
              </TouchableOpacity>
            )}
            {!saidHiIncognito && !isMutualFriend && !isBlocked && (
              <TouchableOpacity
                style={styles.roundButton2NoHi}
                onPress={() => {
                  say_hi({type: 'say-hi-incognito', email2: email});
                  setSaidHiIncognito(true);
                }}>
                <Text style={styles.text}>{'SAY HI INCOGNITO'}</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.row}>
            <Text style={styles.nameAge}>
              {userProfile.first_name}, {userProfile.age}
            </Text>
            <TouchableOpacity onPress={showActionSheet}>
              <Entypo
                name="dots-three-horizontal"
                size={20}
                color="white"
                style={styles.icons}
              />
            </TouchableOpacity>
            <ActionSheet
              ref={actionSheet}
              //title={'Which one do you like ?'}
              // Options Array to show in bottom sheet
              options={optionArray}
              cancelButtonIndex={2}
              // Highlight any specific option
              destructiveButtonIndex={[0]}
              onPress={index => {
                // Clicking on the option will give you alert
                if (optionArray[index] == 'Block User') {
                  say_hi({type: 'block', email2: email});
                  setIsBlocked(true);
                  Alert.alert(userProfile.first_name + ' has been blocked');
                } else if (optionArray[index] == 'Unblock User') {
                  say_hi({type: 'unblock', email2: email});
                  setIsBlocked(false);
                  Alert.alert(userProfile.first_name + ' has been unblocked');
                } else if (optionArray[index] == 'Remove Friend') {
                  say_hi({type: 'unfriend', email2: email});
                  setIsMutualFriend(false);
                  setSaidHi(false);
                  ws_notifications.current.send(
                    JSON.stringify({
                      notif_type: 'remove sayHi',
                      message: firstName + ' removed sayHi!',
                      receiver: userProfile.id,
                      sender: id,
                    }),
                  );
                  Alert.alert('You have unfriended ' + userProfile.first_name);
                }
              }}
            />
          </View>

          <ProfileTab1 email={email} />
        </>
      )}
    </>
  );
}

// Styles
const styles = StyleSheet.create({
  main_image: {
    width: pictureWidth,
    height: pictureHeight,
    borderRadius: 30,
    marginRight: windowWidth * 0.03,
    marginTop: 0,
    marginHorizontal: 10,
    marginBottom: windowHeight * 0.03,
    aspectRatio: 1,
  },

  image1: {
    width: windowWidth * 0.22,
    height: windowWidth * 0.22,
    borderRadius: 10,
    right: windowWidth * 0.05,
    top: windowHeight * 0.07,
    position: 'absolute',
  },

  image2: {
    width: windowWidth * 0.22,
    height: windowWidth * 0.22,
    borderRadius: 10,
    right: windowWidth * 0.05,
    top: windowHeight * 0.21,
    position: 'absolute',
  },
  chat: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    backgroundColor: '#2AAFCC', //: '#2AAFCC',
    width: windowWidth * 0.5,
    height: windowHeight * 0.035,
    marginHorizontal: 70,
    alignSelf: 'center',
    //right: windowWidth * 0.5,
    top: windowHeight * 0.33,
    position: 'absolute',
  },
  unblock: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    backgroundColor: '#13748A', //: '#2AAFCC',
    width: windowWidth * 0.5,
    height: windowHeight * 0.035,
    marginHorizontal: 70,
    alignSelf: 'center',
    //right: windowWidth * 0.5,
    top: windowHeight * 0.33,
    position: 'absolute',
  },
  roundButton1Hi: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    backgroundColor: '#386E7A', //: '#2AAFCC',
    width: windowWidth * 0.35,
    height: windowHeight * 0.035,
    marginHorizontal: 70,
    alignSelf: 'flex-end',
    right: windowWidth * 0.35,
    top: windowHeight * 0.34,
    position: 'absolute',
  },
  roundButton1NoHi: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    backgroundColor: '#2AAFCC',
    width: windowWidth * 0.35,
    height: windowHeight * 0.035,
    marginHorizontal: 70,
    alignSelf: 'flex-end',
    right: windowWidth * 0.35,
    top: windowHeight * 0.34,
    position: 'absolute',
  },
  roundButton2Hi: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    backgroundColor: '#386E7A',
    width: windowWidth * 0.35,
    height: windowHeight * 0.035,
    marginHorizontal: 70,
    alignSelf: 'flex-end',
    left: windowWidth * 0.35,
    top: windowHeight * 0.34,
    position: 'absolute',
  },
  roundButton2NoHi: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    backgroundColor: '#2AAFCC',
    width: windowWidth * 0.35,
    height: windowHeight * 0.035,
    marginHorizontal: 70,
    alignSelf: 'flex-end',
    left: windowWidth * 0.35,
    top: windowHeight * 0.34,
    position: 'absolute',
  },
  text: {
    fontSize: 13,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },

  nameAge: {
    fontSize: 17,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    marginLeft: windowWidth * 0.08, //30
    paddingTop: 20,
    paddingBottom: 30,
  },

  jobLocation: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: '400',
    letterSpacing: 0.25,
    color: 'white',
    marginLeft: 30,
    paddingBottom: 5,
  },
  icons: {
    marginLeft: windowWidth * 0.62,
    //marginRight: 0,
    paddingTop: 20,
    paddingBottom: 30,
  },
  row: {
    backgroundColor: '#0E0E2C',
    flexDirection: 'row',
    paddingTop: 0,
    Height: windowHeight * 0.038,
  },
});
