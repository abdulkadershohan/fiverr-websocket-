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
  Alert,
  Pressable,
  Dimensions,
} from 'react-native';
// Responsive UI??

// My components
import ListUsers from '../../components/atoms/ListUsers';
import Search from '../../components/atoms/Search';

//screens
import {LoadScreen} from '../../components/atoms/LoadScreen';

// Icons
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

//Context
import {EventContext} from '../../context/EventContext';
import {NetworkingContext} from '../../context/NetworkingContext';
import {NotificationContext} from '../../context/NotificationContext';
import {LoggedInUserContext} from '../../context/LoggedInUserContext';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function SaidHi({navigation}) {
  const isVisible = useIsFocused();
  const {id, setupWebSocket, myHis, setMyHis} = useContext(LoggedInUserContext);
  const {getFriends, getMyHis} = useContext(NetworkingContext);
  const {ws_notifications, ws_domain} = useContext(NotificationContext);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    //console.log('called when screen open and also on close');

    // this will call on both screen open and screen close.

    if (isVisible) {
      setLoading(true);
      console.log(
        '*** -- called when SAID HI screen open or when back on screen -- *** ',
      );
      getMyHis('get-my-his')
        .then(response => response.json())
        .then(data => setMyHis(data.my_his))
        .then(() => {
          setLoading(false);
        })
        .catch(console.log('getMyHis promise error'));
      console.log(myHis);

      function getFriendsAgain() {
        console.log('getFriendsAgain');
        setTimeout(() => {
          //getFriends('get-my-his');
          getMyHis('get-my-his')
            .then(response => response.json())
            .then(data => setMyHis(data.my_his));
        }, 1000);
      }
      // last line of code below will refresh the his, if someone says hi whilst you are on this page
      //setupWebSocket(id);
    } else {
      //setupWebSocket(id);
    }
  }, [isVisible]); //eslint-disable-line react-hooks/exhaustive-deps
  if (myHis.length == 1) {
    var no_his_text = myHis.length + ' person has said hi to you';
  } else {
    var no_his_text = myHis.length + ' people have said hi to you';
  }
  return (
    <>
      {isLoading ? (
        <LoadScreen />
      ) : (
        <View style={styles.screen}>
          <View style={styles.searchRow}>
            <Search navigation={navigation} type={'attendees'} />
          </View>
          <View style={styles.resultsNumberRow}>
            <Text style={styles.resultsNumberText}>{no_his_text}</Text>
          </View>

          <View style={styles.flatList}>
            <FlatList
              data={myHis}
              renderItem={({item}) => (
                <ListUsers item={item} navigation={navigation} page={'sayHi'} />
              )}
              keyExtractor={item => item.id}
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
