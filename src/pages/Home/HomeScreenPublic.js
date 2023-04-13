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
import {useIsFocused} from '@react-navigation/native';

//My Components - molecules
import {HomeCard} from '../../components/molecules/HomeCard';

// Global styling
import {globalStyles} from '../../components/atoms/globalStyles';

//Context
import {EventContext} from '../../context/EventContext';

// Responsive UI??
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const pictureWidth = windowWidth * 0.92;
const pictureHeight = windowHeight * 0.21;

export default function HomeScreenPublic({route, navigation}) {
  const {setEventsFiltered, attendeesFiltered, setAttendeesFiltered} =
    useContext(EventContext);

  const isVisible = useIsFocused();
  useEffect(() => {
    // this will call on both screen open and screen close.
    if (isVisible) {
      console.log('*** -- called when HOMEPUBLIC screen opens -- >');
      setEventsFiltered([]);
      setAttendeesFiltered([]);
      console.log('*** attendeesFiltered - >> ' + attendeesFiltered);
    }
  }, [isVisible]); //eslint-disable-line react-hooks/exhaustive-deps
  return (
    <View style={{...globalStyles.screen, ...styles.screen}}>
      <HomeCard
        navigation={navigation}
        title="Business"
        page="Business Events"
        // imageUrl={require('/Users/mahtah/Documents/GitHub/sayHi/SayHi/SayHi_frontend/sayHi/src/assets/images/home/Business.jpeg')}
        imageUrl={require('../../assets/images/home/Business.jpeg')}
      />
      <HomeCard
        navigation={navigation}
        title="Pleasure"
        page="Fun Events"
        imageUrl={require('../../assets/images/home/Pleasure.jpeg')}
      />

      <Text style={styles.quote}>
        Everyone you will ever meet knows something you don't.
      </Text>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  screen: {
    //justifyContent: 'center',
    paddingTop: windowHeight * 0.05,
    //alignItems: 'center',
  },

  quote: {
    color: '#9E9E9E',
    fontSize: 0.04 * windowWidth,
    fontWeight: '400',
    marginTop: windowHeight * 0.01,
    marginHorizontal: 0.15 * windowWidth,
    textAlign: 'center',
  },
});
