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
  Button,
  Dimensions,
} from 'react-native';

// Responsive UI??
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const pictureWidth = windowWidth * 0.92;
const pictureHeight = windowHeight * 0.21;

export const HomeCard = ({imageUrl, navigation, page, title}) => {
  return (
    <View style={styles.cardSection}>
      <TouchableOpacity
        style={{alignItems: 'center', justifyContent: 'center'}}
        onPress={() => navigation.push(page)}>
        <Image source={imageUrl} style={styles.card} />

        <Text style={styles.cardTitle}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    //justifyContent: 'center',
    paddingTop: windowHeight * 0.03,
    alignItems: 'center',
    backgroundColor: '#0E0E2C',
  },
  cardSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: windowHeight * 0.03,
  },

  card: {
    width: pictureWidth,
    height: pictureHeight,
    borderRadius: 30,
    marginRight: windowWidth * 0.03,
    marginHorizontal: 10,
  },
  card2: {
    width: pictureWidth,
    height: pictureHeight,
    borderRadius: 30,
    marginRight: windowWidth * 0.03,
    marginHorizontal: 10,
    marginTop: windowHeight * 0.02,
  },
  cardTitle: {
    position: 'absolute',
    color: '#FFFFFF',
    fontSize: 0.05 * windowWidth,
    fontWeight: '700',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quote: {
    color: '#9E9E9E',
    fontFamily: 'Roboto-Medium',
    fontSize: 0.04 * windowWidth,
    fontWeight: '400',
    marginTop: windowHeight * 0.04,
    marginHorizontal: 0.15 * windowWidth,
    textAlign: 'center',
  },
  roundButton1: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: 'orange',
  },
});
