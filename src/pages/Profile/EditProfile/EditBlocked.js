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
import ListUsers from '../../../components/atoms/ListUsers';
import Search from '../../../components/atoms/Search';

// Icons
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

//Context
import {EventContext} from '../../../context/EventContext';
import {NetworkingContext} from '../../../context/NetworkingContext';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function EditBlocked({navigation}) {
  const isVisible = useIsFocused();
  const {myHis, getBlockedList, myBlockedList, setMyBlockedList} =
    useContext(NetworkingContext);

  const [blockListLoading, setBlockListLoading] = useState(true);

  useEffect(() => {
    setBlockListLoading(true);

    if (isVisible) {
      console.log(
        '*** -- called when SAID HI screen open or when back on screen -- *** ',
      );

      getBlockedList('my-blocked-list')
        .then(response => response.json())
        .then(data => {
          setMyBlockedList(data);
          console.log('my-blocked-list - > ' + data);
        })
        .then(() => setBlockListLoading(false))
        .catch(console.log('getBlockedList promise error'));

      console.log(myHis);
    }
  }, [isVisible]); //eslint-disable-line react-hooks/exhaustive-deps
  return (
    <View style={styles.screen}>
      <View style={styles.searchRow}>
        <Search navigation={navigation} type={'attendees'} />
      </View>
      <View style={styles.resultsNumberRow}>
        <Text style={styles.resultsNumberText}>
          {' '}
          {myBlockedList?.length} people you've blocked{' '}
        </Text>
      </View>

      <View style={styles.flatList}>
        <FlatList
          data={myBlockedList}
          renderItem={({item}) => (
            <ListUsers item={item} navigation={navigation} />
          )}
          keyExtractor={item => item.id}
        />
      </View>
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
