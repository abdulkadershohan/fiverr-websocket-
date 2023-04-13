import React from 'react';
import {useState, useCallback, useContext, useEffect} from 'react';
//import DatePicker from 'react-native-date-picker'
import DropDownPicker from 'react-native-dropdown-picker';
import * as Progress from 'react-native-progress';
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
  Platform,
} from 'react-native';

//Context
import {LoggedInUserContext} from '../../../context/LoggedInUserContext';

// My Components - atoms
import {TextType} from '../../../components/atoms/TextType';
import {PrimaryButton} from '../../../components/atoms/Button';
import {LoadScreen} from '../../../components/atoms/LoadScreen';

// My Components - organisms
import UploadPhotoForm from '../../../components/organisms/UploadPhotoForm';

// Responsive UI??
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const pictureWidth = windowWidth;
const pictureHeight = windowHeight * 0.35;

// Global styling
import {globalStyles} from '../../../components/atoms/globalStyles';
import {color} from 'react-native-reanimated';

export default function EditPhotos({navigation}) {
  const [qClicked, setQClicked] = useState(false);

  const [loading, setLoading] = useState(true);
  const isVisible = useIsFocused();

  const QOnPress = () => {
    setQClicked(!qClicked);
  };

  return (
    <ScrollView style={styles.scrollScreen}>
      <View style={{...globalStyles.screen, ...styles.screen}}>
        <TextType
          type="h4"
          text="Upload some photos"
          textStyle={{paddingBottom: '8%'}}
        />
        <TextType
          type="h6"
          text="So people recognise you when you meet in person"
          textStyle={{paddingBottom: '4%'}}
        />
      </View>
      <UploadPhotoForm navigation={navigation} http_type="PATCH" />
    </ScrollView>
  );
}

// Styles
const styles = StyleSheet.create({
  screen: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0E0E2C',
    flex: 1,
    paddingHorizontal: '5%',
  },

  scrollScreen: {
    backgroundColor: '#0E0E2C',
    flex: 1,
    paddingTop: 50,
  },

  progressText: {
    paddingRight: '10%',
    paddingBottom: 10,
    color: '#32629F',
    alignSelf: 'flex-end',
    fontSize: 12,
  },
  row: {
    //alignSelf: 'flex-start',
    marginBottom: '5%',
    flexDirection: 'row',
  },
  image: {
    backgroundColor: 'grey',
    width: windowWidth * 0.3,
    height: windowWidth * 0.3,
    borderRadius: 10,
    marginLeft: windowWidth * 0.05,
    alignSelf: 'flex-start',
    //right : '30%',
    left: '30%',
  },

  roundButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    backgroundColor: '#13748A',
    width: windowWidth * 0.37,
    height: windowHeight * 0.035,
    left: '60%',
    top: '6%',
    //marginVertical: '8%',
    //marginHorizontal: 70,
    //alignSelf: 'flex-end',
  },
  roundButton2: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    backgroundColor: '#13748A',
    width: windowWidth * 0.37,
    height: windowHeight * 0.035,
    right: '63%',
    top: '19%',
    //marginVertical: '5%',
    //marginHorizontal: 70,
    //alignSelf: 'flex-end',
  },

  text: {
    fontSize: 13,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
