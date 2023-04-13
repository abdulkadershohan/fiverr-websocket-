import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// Icons
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
Ionicons.loadFont();
Feather.loadFont();

//import {theme} from '../../theme';

const ChatHeader = ({first_name, picture, onPress}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.profileOptions}>
        <TouchableOpacity style={{paddingRight: 20}} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-outline" size={30} color={'white'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.profile} onPress={onPress}>
          <Image style={styles.image} source={{uri: picture}} />
          <View style={styles.usernameAndOnlineStatus}>
            <Text style={styles.username}>{first_name}</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.options}>
          <TouchableOpacity style={{paddingHorizontal: 20}}>
            {/*<Ionicons name="ellipsis-vertical" size={25} color={'white'} />*/}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#0E0E2C',
    borderBottomColor: 'grey',
    borderBottomWidth: 0.7,
    //paddingTop: 40,
    paddingBottom: 10,
    //marginBottom: 10,
  },
  backButton: {
    alignSelf: 'center',
    //paddingHorizontal: 10,
  },
  profileOptions: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#fff',
    flex: 4,
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 32.5,
  },
  usernameAndOnlineStatus: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  username: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  options: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

export default ChatHeader;
