import React from 'react';
import { StyleSheet, 
    Text, 
    View, 
    SafeAreaView, 
    ScrollView,
    TextInput,
    FlatList,
    ListItem,
    TouchableOpacity,
    Image

} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

// Icons
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Responsive UI??
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Search({navigation, type}) {
    //let filterPage 
    let filterPage ;
    if (type == 'attendees') {
        filterPage = "Attendees Filters";
        console.log(filterPage)
      } else {
        filterPage = "Events Filters";
        console.log(filterPage + 'events')
      }
    return(
    <View
                style={{
                flexDirection: 'row',
                height : windowHeight*0.038,
                borderColor: 'white',
                borderWidth: 2,
                borderRadius: 20,
                paddingHorizontal: 10,
                paddingVertical: 6,
                marginTop: windowHeight*0.02,
                backgroundColor:'white'
                }}>
                <Feather
                name="search"
                size={15}
                color="#C6C6C6"
                style={{marginRight: windowWidth*0.02}}
                />

                <TextInput 

                style = {{  
                padding: 2,
                width: windowWidth*0.65
                 }} 
                placeholder="Search" 
                />
                 {/* allows text input  */}
                 <TouchableOpacity
                    style={{ alignItems: 'center', justifyContent: 'center'}}
                    onPress={() =>navigation.push(filterPage)}
                > 
                <Ionicons
                name="filter"
                size={20}
                color="#C6C6C6"
                style={{marginLeft: windowWidth*0.05}}
                />
             </TouchableOpacity>
            </View>
    )
}