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
import {LoggedInUserContext} from '../../context/LoggedInUserContext';
import {UserContext} from '../../context/UserContext';
import {NotificationContext} from '../../context/NotificationContext';

//atoms
import {LoadScreen} from '../../components/atoms/LoadScreen';

// Responsive UI??
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const pictureWidth = windowWidth;
const pictureHeight = windowHeight * 0.35;

export default function MyUserProfile({navigation}) {
  const {getUserProfileData} = useContext(UserContext);
  const {ws_notifications} = useContext(NotificationContext);
  const {email, image1, image2, image3, userProfile, setUserProfile} =
    useContext(LoggedInUserContext);
  const [aspectRatio1, setAspectRatio1] = useState(1);

  const [profileLoading, setProfileLoading] = useState(true);

  const isVisible = useIsFocused();

  let actionSheet = useRef();
  var optionArray = ['Create Event', 'Cancel'];

  const showActionSheet = () => {
    //To show the Bottom ActionSheet
    actionSheet.current.show();
  };

  /*
  function useImageAspectRatio(imageUrl) {
    Image.getSize(imageUrl, (width, height) => {
      setAspectRatio2(width / height);
    });
  }*/

  useEffect(() => {
    if (isVisible) {
      setProfileLoading(true);
      //setProfileType('My Profile');
      console.log('use effect my user profile ---> ' + email);
      //getUserProfileData(email);
      getUserProfileData(email)
        .then(response => response.json())
        .then(data => {
          console.log(
            '******* getUserProfileData data ->> ********' +
              JSON.stringify(data),
          );
          setUserProfile(data);
        })
        .then(() => {
          setProfileLoading(false);
        })
        .catch(error => {
          console.log('Api call error ->>> ' + error.message);
          alert(error.message);
        });
      //.catch(console.log('getUserProfileData promise error'));
      console.log('***^^^^ PROFILE PAGE ---->>>> ' + userProfile);
    }
  }, [isVisible]); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isVisible) {
      console.log('***^^^^ PROFILE PAGE ---->>>> ' + userProfile);
    }
  }, [userProfile]); //eslint-disable-line react-hooks/exhaustive-deps
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
                  source={{uri: image1.uri}} //userProfile.avatar
                  style={styles.main_image}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={{alignItems: 'center', justifyContent: 'center'}}
              onPress={() =>
                navigation.push('User Photos', {email: email})
              }></TouchableOpacity>
            <Image source={{uri: image2.uri}} style={styles.image1} />
            <Image source={{uri: image3.uri}} style={styles.image2} />

            <Pressable
              style={styles.roundButton1}
              onPress={() => navigation.push('Edit Profile')}>
              <Text style={styles.text}>{'Edit Profile'}</Text>
            </Pressable>

            <TouchableOpacity
              style={styles.roundButton2}
              onPress={showActionSheet}>
              <Text style={styles.text}>{'+'}</Text>
            </TouchableOpacity>
            <ActionSheet
              ref={actionSheet}
              //title={'Which one do you like ?'}
              // Options Array to show in bottom sheet
              options={optionArray}
              cancelButtonIndex={1}
              // Highlight any specific option
              destructiveButtonIndex={[0]}
              onPress={index => {
                // Clicking on the option will give you alert
                if (optionArray[index] == 'Log out') {
                  //function to take user to create event page
                } else {
                }
                //alert(optionArray[index]);
              }}
            />
          </View>

          <View
            style={{
              backgroundColor: '#0E0E2C',
              flexDirection: 'row',
              paddingTop: 0,
              Height: windowHeight * 0.038,
            }}>
            <Text style={styles.nameAge}>
              {userProfile.first_name}, {userProfile.age}
            </Text>
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
    //resizeMode: 'cover'
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

  roundButton1: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    backgroundColor: '#13748A',
    width: windowWidth * 0.35,
    height: windowHeight * 0.035,
    marginHorizontal: 70,
    alignSelf: 'flex-end',
    right: windowWidth * 0.35,
    top: windowHeight * 0.34,
    position: 'absolute',
  },
  roundButton2: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    backgroundColor: '#13748A',
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
});
