import {React, useContext, useEffect} from 'react';
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

import {NavigationContainer} from '@react-navigation/native';

//Atoms
import {ViewQARow} from '../../components/molecules/ViewQARow';

//Context
import {UserContext} from '../../context/UserContext';
import { LoggedInUserContext } from '../../context/LoggedInUserContext';

// Responsive UI??
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Interests({route, navigation}) {
  const {userProfile} = useContext(LoggedInUserContext);
  const {getUserProfileData} = useContext(UserContext);
  var {email} = route.params;
  const user_interests = [];
  var interests_hashtag;
  const isVisible = useIsFocused();
  useEffect(() => {
    if (isVisible) {
      console.log('use effect my interests ---> ' + email);
      getUserProfileData(email);
      console.log('***^^^^ INTERESTss ---->>>> ' + userProfile.interests);
    }
  }, [isVisible]); //eslint-disable-line react-hooks/exhaustive-deps

  if (typeof userProfile.interests !== 'undefined') {
    let i = 0;
    while (i < userProfile.interests.length) {
      user_interests.push('#' + userProfile.interests[i]);
      i++;
    }
    interests_hashtag = user_interests.join('     ');
    console.log(userProfile);
    console.log(interests_hashtag);
    return (
      <ScrollView style={styles.scrollView}>
        <View style={styles.row}>
          <Text style={styles.hashtags}>{interests_hashtag}</Text>
        </View>
      </ScrollView>
    );
  } else {
    return <ScrollView style={styles.scrollView} />;
  }
}
// Styles
const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#0E0E2C',
    paddingTop: windowHeight * 0.03,
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hashtags: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: '400',
    letterSpacing: 0.25,
    color: 'white',
    marginLeft: 15,
    paddingBottom: 5,
  },
  row: {
    flexDirection: 'row',
    marginLeft: 20,
  },
});
