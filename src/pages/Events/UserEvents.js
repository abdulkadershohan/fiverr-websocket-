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

// My components
import ListEvents from '../../components/atoms/ListEvents';
import Search from '../../components/atoms/Search';
import {FilterAttendees} from '../../components/atoms/FilterAttendees';

//Context
import {UserContext} from '../../context/UserContext';
import {EventContext} from '../../context/EventContext';
import {NetworkingContext} from '../../context/NetworkingContext';
import {LoggedInUserContext} from '../../context/LoggedInUserContext';

//Screens
import {LoadScreen} from '../../components/atoms/LoadScreen';

// Responsive UI??
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const filterColour = '#13748A';

export default function UserEvents({navigation, route}) {
  const {other_user_email} = route.params;
  const isVisible = useIsFocused();
  const {email, isTokenExpired, userProfile, setUserProfile} =
    useContext(LoggedInUserContext);
  //const {userProfile} = useContext(UserContext);

  const {events, eventsFiltered, setEvents, setSelectedGenres, getEvents} =
    useContext(EventContext);
  const {canViewEvents, setCanViewEvents, getSaidHi, getIfEventsViewer} =
    useContext(NetworkingContext);
  const [eventsLoading, setEventsLoading] = useState(true);
  const [eventsViewerLoading, setEventsViewerLoading] = useState(true);
  const myEventsPage = other_user_email == email ? true : false;

  useEffect(() => {
    // this will call on both screen open and screen close.
    if (isVisible) {
      setEventsLoading(true);
      setEventsViewerLoading(true);
      getEvents({type: 'my', user_email: other_user_email})
        .then(response => response.json())
        .then(data => {
          setEvents(data);
          console.log('EventData -->>> ' + data);
        })
        .then(() => setEventsLoading(false))
        .catch(console.log('getEvents promise error'));

      getIfEventsViewer({type: 'events-viewer', email2: other_user_email})
        .then(response => response.json())
        .then(data => {
          if (data == 1 || other_user_email == email) {
            setCanViewEvents(true);
          } else {
            setCanViewEvents(false);
          }
        })
        .then(() => setEventsViewerLoading(false))
        .catch(console.log('getIfEventsViewer promise error'));
    }
  }, [isVisible]); //eslint-disable-line react-hooks/exhaustive-deps
  var no_events_text = '';
  if (events.length == 1) {
    no_events_text =
      userProfile.first_name + ' is attending ' + events.length + ' event';
  } else {
    no_events_text =
      userProfile.first_name + ' is attending ' + events.length + ' events';
  }
  return (
    <>
      {canViewEvents && eventsLoading ? (
        <LoadScreen />
      ) : (
        canViewEvents && (
          <View style={styles.screen}>
            <View style={styles.resultsNumberRow}>
              <Text style={styles.resultsNumberText}>{no_events_text}</Text>
            </View>
            <View style={styles.flatList}>
              <FlatList
                data={events}
                renderItem={({item}) => (
                  <ListEvents item={item} navigation={navigation} />
                )}
                keyExtractor={item => item.id}
                style={{marginBottom: windowHeight * 0}}
              />
            </View>
          </View>
        )
      )}
      {!canViewEvents && !eventsViewerLoading && (
        <View style={styles.cantViewEventsScreen}>
          <Text style={styles.text}>
            You can only view this user's events when you both say hi to each
            other
          </Text>
        </View>
      )}
    </>
  );
}
// Styles
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0E0E2C',
    //justifyContent: 'center',

    //paddingHorizontal : '5%',
  },
  cantViewEventsScreen: {
    flex: 1,
    backgroundColor: '#0E0E2C',
    justifyContent: 'center',
    paddingHorizontal: '5%',
  },
  searchRow: {
    flexDirection: 'row',
    //marginTop: windowHeight * 0.01,
    marginHorizontal: windowWidth * 0.05,
  },
  filterRow: {
    //paddingTop: '4%',
    paddingLeft: '5%',
    paddingBottom: 0,
    marginBottom: 0,
  },
  filterListFirst: {
    position: 'absolute',
    top: '20%',
    right: windowWidth * -0.21,
  },
  filterList: {
    //flexDirection :'row',
    position: 'absolute',
    top: '20%',
    right: windowWidth * -0.1,
    //width: '50%'
    //marginBottom: 0,
    //height :'60%'
  },
  ageFilter: {
    //flexDirection :'row',
    width: 5,
    //position: 'absolute',
    top: '60%',
    right: windowWidth * 0.35,
    //marginBottom: 0,
    //height :'60%'
  },
  resultsNumberRow: {
    flexDirection: 'row',
    marginVertical: windowHeight * 0.02,
    marginHorizontal: windowWidth * 0.05,
  },
  resultsNumberText: {
    fontSize: 0.03 * windowWidth,
    fontWeight: '500',
    color: '#9E9E9E', //'#4C4C85','#13748A',
    //marginBottom: windowHeight * 0.015,
  },
  flatList: {
    marginTop: windowHeight * 0.015,
    marginHorizontal: windowWidth * 0.05,
    //marginBottom: windowHeight * 0.25,
  },
  text: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    textAlign: 'center',
  },
});
{
  /* <FlatList
          data={EventData}
          renderItem={({item}) => (
            <ListEvents item={item} navigation={navigation} />
          )}
          keyExtractor={item => item.id}
        />*/
}
