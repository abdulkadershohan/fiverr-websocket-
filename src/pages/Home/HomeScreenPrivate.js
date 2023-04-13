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

export default function HomeScreenPrivate() {
  return (
    <View
      style={{
        backgroundColor: '#0E0E2C',
        flex: 1,
        alignItems: 'center',
        paddingTop: windowHeight * 0.1,
      }}>
      <Text style={{fontSize: 22, fontWeight: 'bold', color: 'white'}}>
        {' '}
        Private Events Coming Soon{' '}
      </Text>
    </View>
  );
}
