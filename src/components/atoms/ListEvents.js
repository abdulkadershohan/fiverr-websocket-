import * as React from 'react';

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

import {useNavigation} from '@react-navigation/native';

// Responsive UI??
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function ListEvents({navigation, item}) {
  return (
    <TouchableOpacity
      style={{alignItems: 'center', justifyContent: 'center'}}
      onPress={() => navigation.push('Event Profile', {id: item.id})}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 20,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
          <Image source={{uri: item.event_image1}} style={styles.image} />
          <View style={{width: windowWidth - 400}}>
            <Text style={styles.title}>{item.name}</Text>
            <Text numberOfLines={1} style={styles.subtitle}>
              {item.city}, {item.short_date}, {item.start_time}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

// Styles
const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#0E0E2C',
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },

  image: {
    width: windowWidth * 0.2,
    height: windowWidth * 0.2,
    borderRadius: 20,
    marginRight: windowWidth * 0.03,
  },

  title: {
    color: 'white',
    //fontFamily: 'Roboto-Medium',
    fontSize: 0.035 * windowWidth,
    fontWeight: '600',
  },

  subtitle: {
    color: '#BDBDBD',
    //fontFamily: 'Roboto-Medium',
    fontSize: 0.035 * windowWidth,
    marginTop: 0.003 * windowHeight,
  },
});
