import {React, useState, useContext, useEffect} from 'react';
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
  Dimensions,
} from 'react-native';
// My components
import ListUsers from '../../components/atoms/ListUsers';
import Search from '../../components/atoms/Search';
import {FilterAttendees} from '../../components/atoms/FilterAttendees';

//Context
import {AuthContext} from '../../context/AuthContext';
import {EventContext} from '../../context/EventContext';
import {LoggedInUserContext} from '../../context/LoggedInUserContext';

//Screens
import {LoadScreen} from '../../components/atoms/LoadScreen';

// Icons
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

Feather.loadFont();
Ionicons.loadFont();

// Responsive UI??
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const BusinessEvents = 1;

export default function EventWhosGoing({route, navigation}) {
  var {id} = route.params;
  const isVisible = useIsFocused();
  const {cities, roles} = useContext(LoggedInUserContext);

  const {
    attending,
    interested,
    attendees,
    getAttendees,
    attendeesFiltered,
    setAttendees,
    setAttendeesFiltered,
    interests_filter_options,
    open_tos_filter_options,
  } = useContext(EventContext);

  const [attendeesLoading, setAttendeesLoading] = useState(true);
  const [selectedCities, setSelectedCities] = useState(cities);
  const [uniqueCities, setUniqueCities] = useState(
    Array.from(new Set(selectedCities.map(obj => obj.city))),
  );
  const [citiesFilterClicked, setCitiesFilterClicked] = useState(false);

  const [selectedRoles, setSelectedRoles] = useState(roles);
  const [uniqueRoles, setUniqueRoles] = useState(
    Array.from(new Set(selectedRoles.map(obj => obj.role))),
  );
  const [rolesFilterClicked, setRolesFilterClicked] = useState(false);

  const [selectedInterests, setSelectedInterests] = useState(
    interests_filter_options,
  );
  const [uniqueInterests, setUniqueInterests] = useState(
    Array.from(new Set(selectedInterests.map(obj => obj.interest))),
  );
  const [interestsFilterClicked, setInterestsFilterClicked] = useState(false);

  const [selectedOpenTos, setSelectedOpenTos] = useState(
    open_tos_filter_options,
  );
  const [uniqueOpenTos, setUniqueOpenTos] = useState(
    Array.from(new Set(selectedOpenTos.map(obj => obj.open_to))),
  );
  const [openTosFilterClicked, setOpenTosFilterClicked] = useState(false);

  //Age slider below
  const [multiSliderValue, setMultiSliderValue] = useState([18, 50]);
  const [ageFilterClicked, setAgeFilterClicked] = useState(false);

  const onCityOpen = () => {
    setCitiesFilterClicked(!citiesFilterClicked);
    setRolesFilterClicked(false);
    setAgeFilterClicked(false);
    setInterestsFilterClicked(false);
    setOpenTosFilterClicked(false);
  };

  const onRoleOpen = () => {
    setRolesFilterClicked(!rolesFilterClicked);
    setCitiesFilterClicked(false);
    setAgeFilterClicked(false);
    setInterestsFilterClicked(false);
    setOpenTosFilterClicked(false);
  };

  const onAgeOpen = () => {
    setAgeFilterClicked(!ageFilterClicked);
    setCitiesFilterClicked(false);
    setRolesFilterClicked(false);
    setInterestsFilterClicked(false);
    setOpenTosFilterClicked(false);
  };

  const onInterestOpen = () => {
    setInterestsFilterClicked(!interestsFilterClicked);
    setCitiesFilterClicked(false);
    setRolesFilterClicked(false);
    setAgeFilterClicked(false);
    setOpenTosFilterClicked(false);
  };

  const onOpenTosOpen = () => {
    setOpenTosFilterClicked(!openTosFilterClicked);
    setInterestsFilterClicked(false);
    setCitiesFilterClicked(false);
    setRolesFilterClicked(false);
    setAgeFilterClicked(false);
  };

  const [searchText, setSearchText] = useState('');

  const filteringUsers = text => {
    setAttendeesFiltered(
      Object.values(attendees).filter(
        i =>
          (i.first_name.toLowerCase().includes(text.toLowerCase()) ||
            i.role.toLowerCase().includes(text.toLowerCase())) &&
          uniqueCities.includes(i.city) &&
          uniqueRoles.includes(i.role) &&
          i.age >= multiSliderValue[0] &&
          i.age <= multiSliderValue[1] &&
          uniqueInterests.some(val => i.interests.includes(val)) &&
          uniqueOpenTos.some(val => i.open_tos.includes(val)),
      ),
    );
  };

  const searchAttendees = text => {
    setSearchText(text);
    filteringUsers(text);
  };
  useEffect(() => {
    // this will call on both screen open and screen close.
    if (isVisible) {
      console.log(
        '*** -- called when EventWhosGoing screen open or when back on screen -- *** ',
      );

      setAttendeesLoading(true);
      //getAttendees(id);
      getAttendees(id)
        .then(response => response.json())
        .then(data => {
          console.log('attendees data -> ' + data);
          setAttendees(data);
          setAttendeesFiltered(data);
        })
        .then(() => setAttendeesLoading(false))
        .catch(console.log('getAttendees promise error'));
      console.log(attendees);
    }
  }, [isVisible, attending, interested]); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const newCities = Array.from(
      new Set(
        selectedCities.filter(i => i.selected == true).map(obj => obj['city']),
      ),
    );
    const newRoles = Array.from(
      new Set(
        selectedRoles.filter(i => i.selected == true).map(obj => obj['role']),
      ),
    );

    const newInterests = Array.from(
      new Set(
        selectedInterests
          .filter(i => i.selected == true)
          .map(obj => obj['interest']),
      ),
    );
    const newOpenTos = Array.from(
      new Set(
        selectedOpenTos
          .filter(i => i.selected == true)
          .map(obj => obj['open_to']),
      ),
    );
    setUniqueCities(newCities);
    setUniqueRoles(newRoles);
    setUniqueInterests(newInterests);
    setUniqueOpenTos(newOpenTos);

    console.log('***////*** uniqueCities ***////*** --->>> ' + newCities);
    console.log('***////*** UniqueRoles ***////*** --->>> ' + newRoles);
  }, [selectedCities, selectedRoles, selectedInterests, selectedOpenTos]);

  //Filtering Attendees
  useEffect(() => {
    filteringUsers(searchText);
    console.log(attendees);
  }, [
    attendees,
    multiSliderValue,
    setAttendeesFiltered,
    uniqueCities,
    uniqueRoles,
    uniqueInterests,
    uniqueOpenTos,
  ]);
  if (attendeesFiltered.length < attendees.length) {
    if (attendeesFiltered.length == 1) {
      var no_attendees_text = 'attendee matches your applied filters';
    } else {
      var no_attendees_text = 'attendees match your applied filters';
    }
  } else {
    if (attendeesFiltered.length == 1) {
      var no_attendees_text = 'attendee';
    } else {
      var no_attendees_text = 'attendees';
    }
  }
  return (
    <>
      {attendeesLoading ? (
        <LoadScreen />
      ) : (
        <View style={styles.screen}>
          <View style={styles.searchRow}>
            <Search
              navigation={navigation}
              type={'attendees'}
              onChangeText={text => searchAttendees(text)}
              value={searchText}
            />
          </View>
         {/* <View style={styles.filterRow}>
            <ScrollView horizontal={true}>
              <FilterAttendees
                listStyle={styles.filterListFirst}
                title={'Cities'}
                selectedItems={selectedCities}
                setSelectedItems={setSelectedCities}
                uniqueItems={uniqueCities}
                setUniqueItems={setUniqueCities}
                filterColumn={'city'}
                onOpen={onCityOpen}
                filterClicked={citiesFilterClicked}
                //clearSearchText={setSearchText}
              />
              <FilterAttendees
                listStyle={styles.filterListFirst}
                title={'Roles'}
                selectedItems={selectedRoles}
                setSelectedItems={setSelectedRoles}
                uniqueItems={uniqueRoles}
                setUniqueItems={setUniqueRoles}
                filterColumn={'role'}
                onOpen={onRoleOpen}
                filterClicked={rolesFilterClicked}
              />
              <FilterAttendees
                listStyle={styles.ageFilter}
                title={'Age'}
                titleStyle={{width: windowWidth * 0.2}}
                multiSliderValue={multiSliderValue}
                setMultiSliderValue={setMultiSliderValue}
                onOpen={onAgeOpen}
                filterClicked={ageFilterClicked}
              />
              <FilterAttendees
                listStyle={styles.filterList}
                title={'Interests'}
                titleStyle={{width: windowWidth * 0.3}}
                selectedItems={selectedInterests}
                setSelectedItems={setSelectedInterests}
                uniqueItems={uniqueInterests}
                setUniqueItems={setUniqueInterests}
                filterColumn={'interest'}
                onOpen={onInterestOpen}
                filterClicked={interestsFilterClicked}
              />
              <FilterAttendees
                listStyle={styles.filterList}
                title={'Open To'}
                titleStyle={{width: windowWidth * 0.3}}
                selectedItems={selectedOpenTos}
                setSelectedItems={setSelectedOpenTos}
                uniqueItems={uniqueOpenTos}
                setUniqueItems={setUniqueOpenTos}
                filterColumn={'open_to'}
                onOpen={onOpenTosOpen}
                filterClicked={openTosFilterClicked}
              />
              <View style={{paddingRight: 100}}></View>
            </ScrollView>
          </View>*/}
          <View style={styles.resultsNumberRow}>
            <Text style={styles.resultsNumberText}>
              {'  '}
              {attendeesFiltered.length} {no_attendees_text}
            </Text>
          </View>

          <View style={styles.flatList}>
            <FlatList
              data={attendeesFiltered}
              renderItem={({item}) => (
                <ListUsers item={item} navigation={navigation} />
              )}
              keyExtractor={item => item.id}
              style={{marginBottom: windowHeight * 0.18}}
            />
          </View>
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
  searchRow: {
    flexDirection: 'row',
    marginTop: windowHeight * 0.01,
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
    marginVertical: windowHeight * 0.01,
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
});
