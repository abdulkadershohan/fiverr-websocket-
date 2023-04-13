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
import ListUsers from '../../components/atoms/ListUsers';
import Search from '../../components/atoms/Search';
import {FilterAttendees} from '../../components/atoms/FilterAttendees';

//Context
import {EventContext} from '../../context/EventContext';
import {LoggedInUserContext} from '../../context/LoggedInUserContext';

//Screens
import {LoadScreen} from '../../components/atoms/LoadScreen';

// Responsive UI??
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const filterColour = '#13748A';

export default function Events({navigation, route}) {
  const {type} = route.params;
  const isVisible = useIsFocused();
  const {cities, roles, isTokenExpired} = useContext(LoggedInUserContext);
  const {
    events,
    getEvents,
    eventsFiltered,
    setEventsFiltered,
    genresFilterOptions,
    selectedGenres,
    setSelectedGenres,
    setEvents,
  } = useContext(EventContext);
  const [eventsLoading, setEventsLoading] = useState(true);
  const [selectedCities, setSelectedCities] = useState(cities);
  const [uniqueCities, setUniqueCities] = useState(
    Array.from(new Set(selectedCities.map(obj => obj.city))),
  );
  const [citiesFilterClicked, setCitiesFilterClicked] = useState(false);

  const [uniqueGenres, setUniqueGenres] = useState(
    Array.from(new Set(selectedGenres.map(obj => obj.genres))),
  );
  const [genresFilterClicked, setGenresFilterClicked] = useState(false);

  //Age slider below
  const [multiSliderValue, setMultiSliderValue] = useState([18, 50]);
  const [ageFilterClicked, setAgeFilterClicked] = useState(false);

  const onCityOpen = () => {
    setCitiesFilterClicked(!citiesFilterClicked);
    setGenresFilterClicked(false);
    setAgeFilterClicked(false);
  };

  const onGenresOpen = () => {
    setGenresFilterClicked(!genresFilterClicked);
    setCitiesFilterClicked(false);
    setAgeFilterClicked(false);
  };

  const onAgeOpen = () => {
    setAgeFilterClicked(!ageFilterClicked);
    setCitiesFilterClicked(false);
    setGenresFilterClicked(false);
  };

  const [searchText, setSearchText] = useState('');

  const filteringUsers = text => {
    setEventsFiltered(
      Object.values(events).filter(
        i =>
          (i.name.toLowerCase().includes(text.toLowerCase()) ||
            i.city.toLowerCase().includes(text.toLowerCase())) &&
          uniqueCities.includes(i.city) &&
          i.min_age >= multiSliderValue[0] &&
          uniqueGenres.some(val => i.genres.includes(val)),
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
      //getEvents({type: type});
      setEventsLoading(true);
      getEvents({type: type})
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setEvents(data);
          console.log('EventData LENGTH -->>> ' + data.length);
          var genres = [];
          let i = 0;
          while (i < data.length) {
            genres = genres.concat(data[i]['genres']);
            console.log('EventData[i] -->>>' + data[i]['genres']);
            i++;
          }
          console.log('GENRESSSS -->>> ' + genres);
          genres = [...new Set(genres)];
          var genresFilterOptions2 = [];
          let j = 0;
          while (j < genres.length) {
            genresFilterOptions2.push({
              id: j + 1,
              genre: genres[j],
              selected: true,
            });
            j++;
          }
          //setGenresFilterOptions(genresFilterOptions2);
          setSelectedGenres(genresFilterOptions2);
          console.log(
            '*** genresFilterOptions -->>> ' +
              JSON.stringify(genresFilterOptions2),
          );
        })
        .then(() => setEventsLoading(false));
      console.log(
        '*** -- called when EVENTSSS screen open multiSliderValue -- >' +
          multiSliderValue[0],
      );
    }
    console.log('***** eventsFiltered *****' + eventsFiltered);
  }, [isVisible]); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const newCities = Array.from(
      new Set(
        selectedCities.filter(i => i.selected == true).map(obj => obj['city']),
      ),
    );
    const newGenres = Array.from(
      new Set(
        selectedGenres.filter(i => i.selected == true).map(obj => obj['genre']),
      ),
    );

    setUniqueCities(newCities);
    setUniqueGenres(newGenres);

    console.log('***////*** uniqueCities ***////*** --->>> ' + newCities);
    console.log('***////*** uniqueGenres ***////*** --->>> ' + newGenres);
  }, [selectedCities, selectedGenres]);

  //Filtering Attendees
  useEffect(() => {
    filteringUsers(searchText);
    console.log(events);
  }, [events, multiSliderValue, setEventsFiltered, uniqueCities, uniqueGenres]);
  if (eventsFiltered.length < events.length) {
    var no_events_text =
      type + ' events have attendess matching your applied filters';
  } else if (events.length == 1) {
    var no_events_text = ' event';
  } else {
    var no_events_text = ' events';
  }
  return (
    <>
      {eventsLoading ? (
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
          <View style={styles.filterRow}>
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
                title={'Genres'}
                selectedItems={selectedGenres}
                setSelectedItems={setSelectedGenres}
                uniqueItems={uniqueGenres}
                setUniqueItems={setUniqueGenres}
                filterColumn={'genre'}
                onOpen={onGenresOpen}
                filterClicked={genresFilterClicked}
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
              <View style={{paddingRight: 100}}></View>
            </ScrollView>
          </View>
          <View style={styles.resultsNumberRow}>
            <Text style={styles.resultsNumberText}>
              {'  '}
              {eventsFiltered.length} {no_events_text}
            </Text>
          </View>

          <View style={styles.flatList}>
            <FlatList
              data={eventsFiltered}
              renderItem={({item}) => (
                <ListEvents item={item} navigation={navigation} />
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
