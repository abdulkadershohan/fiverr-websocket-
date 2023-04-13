import React from 'react';
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
  Dimensions,
} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';

// Icons
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
Ionicons.loadFont();
Feather.loadFont();

// Responsive UI??
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const filterColour = '#9D9999'; //'#13748A';

export default function Search({navigation, type, onChangeText, value}) {
  //let filterPage
  let filterPage;
  if (type == 'attendees') {
    filterPage = 'Attendees Filters';
    console.log(filterPage);
  } else {
    filterPage = 'Events Filters';
    console.log(filterPage + 'events');
  }
  return (
    <View
      style={{
        flexDirection: 'row',
        height: windowHeight * 0.038,
        width : windowWidth*0.9,
        borderColor : filterColour,//'#13748A',
        borderWidth: 0.8,
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 6,
        marginVertical: windowHeight * 0.02,
        backgroundColor: 'transparent',
      }}>
      <Feather
        name="search"
        size={15}
        color="#C6C6C6"
        style={{marginRight: windowWidth * 0.02}}
      />

      <TextInput
        style={{
          padding: 2,
          width: windowWidth * 0.65,
          color:'white',
        }}
        placeholder="Search"
        placeholderTextColor={filterColour}//'#212121'
        onChangeText={onChangeText}
        value={value}
      />
      {/* allows text input  */}
      <TouchableOpacity
        style={{alignItems: 'center', justifyContent: 'center'}}
        onPress={() => navigation.push(filterPage)}>
        {/*<Ionicons
          name="filter"
          size={20}
          color="#C6C6C6"
          style={{marginLeft: windowWidth * 0.05}}
      />*/}
      </TouchableOpacity>
    </View>
  );
}
