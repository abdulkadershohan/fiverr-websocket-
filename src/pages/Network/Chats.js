import {React, useState, useContext, useEffect} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {useRoute} from '@react-navigation/native';

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
} from 'react-native';
// Responsive UI??

// My components
import ListChats from '../../components/atoms/ListChats';
import Search from '../../components/atoms/Search';

// Icons
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

//Screens
import {LoadScreen} from '../../components/atoms/LoadScreen';

//Context
import {LoggedInUserContext} from '../../context/LoggedInUserContext';
import {NetworkingContext} from '../../context/NetworkingContext';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Chats({navigation}) {
  const isVisible = useIsFocused();
  const {get_open_chats, setOpenChats, openChats} =
    useContext(NetworkingContext);
  const {id, chatServerState} = useContext(LoggedInUserContext);
  const [isLoading, setLoading] = useState(true);
  const [serverNotifications, setServerNotifications] = useState([]); //runs once

  const route = useRoute();
  console.log('routerouteroute --->' + route.name);

  useEffect(() => {
    if (isVisible) {
      setLoading(true);
      console.log(
        '*** -- called when CHATS screen open or when back on screen -- *** ',
      );

      get_open_chats(id)
        .then(response => response.json())
        .then(data => setOpenChats(data.open_chats))
        .then(() => {
          setLoading(false);
          console.log(
            'openChatsopenChats1 before new load is complete -->> ' +
              JSON.stringify(openChats),
          );
        })
        .catch(console.log('get_open_chats promise error'));

      setServerNotifications([]);
    }
  }, [isVisible]); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <View style={styles.screen}>
      <View style={styles.searchRow}>
        <Search navigation={navigation} type={'attendees'} />
      </View>
      {isLoading ? (
        <LoadScreen />
      ) : (
        <View style={styles.flatList}>
          <FlatList
            data={openChats}
            renderItem={({item}) => (
              <ListChats
                item={item}
                navigation={navigation}
                isVisible={isVisible}
              />
            )}
            keyExtractor={item => item.id}
          />
        </View>
      )}
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0E0E2C',
  },
  searchRow: {
    flexDirection: 'row',
    marginTop: windowHeight * 0.015,
    marginHorizontal: windowWidth * 0.05,
  },
  resultsNumberRow: {
    flexDirection: 'row',
    marginTop: windowHeight * 0.015,
    marginHorizontal: windowWidth * 0.05,
  },
  resultsNumberText: {
    fontSize: 0.03 * windowWidth,
    fontWeight: '500',
    color: '#4C4C85',
    marginBottom: windowHeight * 0.015,
  },
  flatList: {
    marginTop: windowHeight * 0.015,
    marginHorizontal: windowWidth * 0.05,
  },
});
