import {React, useContext, useEffect} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {StyleSheet, Text, View, Dimensions, ScrollView} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';

//Context
import {UserContext} from '../../context/UserContext';
import { LoggedInUserContext } from '../../context/LoggedInUserContext';

// Responsive UI??
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function OpenTo({route, navigation}) {
  const {getUserProfileData} = useContext(UserContext);
  const {userProfile} = useContext(LoggedInUserContext);

  var {email} = route.params;
  var user_open_tos = [];
  var open_tos_hashtag = '';

  const isVisible = useIsFocused();
  useEffect(() => {
    if (isVisible) {
      console.log('use effect my OPENTOPENTO ---> ' + email);
      getUserProfileData(email);
      console.log('***^^^^ OpenToss ---->>>> ' + userProfile.open_tos);
    }
  }, [isVisible]); //eslint-disable-line react-hooks/exhaustive-deps

  if (typeof userProfile.open_tos !== 'undefined') {
    let i = 0;
    while (i < userProfile.open_tos.length) {
      user_open_tos.push('#' + userProfile.open_tos[i]);
      i++;
    }
    open_tos_hashtag = user_open_tos.join('     ');
    console.log(open_tos_hashtag);
    return (
      <ScrollView style={styles.scrollView}>
        <View style={styles.row}>
          <Text style={styles.hashtags}>{open_tos_hashtag}</Text>
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
