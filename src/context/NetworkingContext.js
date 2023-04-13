import React, {useState, createContext, useContext} from 'react';
import * as Keychain from 'react-native-keychain';

//context
import {LoggedInUserContext} from './LoggedInUserContext';
import {UserContext} from './UserContext';
import {NotificationContext} from './NotificationContext';

export const NetworkingContext = createContext();

export const NetworkingProvider = ({children}) => {
  const {email, isTokenExpired, setSaidHiCount,myHis, setMyHis} =
    useContext(LoggedInUserContext);
  const {domain, ws_domain, ws_notifications} = useContext(NotificationContext);

  //const [myHis, setMyHis] = useState(['']);
  const [myMutuals, setMyMutuals] = useState(['']);
  const [myBlockedList, setMyBlockedList] = useState(['']);
  const [saidHi, setSaidHi] = useState(false);
  const [shoot, setShoot] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [saidHiIncognito, setSaidHiIncognito] = useState(false);
  const [isMutualFriend, setIsMutualFriend] = useState(false);
  const [canViewEvents, setCanViewEvents] = useState(false);
  const [messageData, setMessageData] = useState([]);
  const [openChats, setOpenChats] = useState([]);

  // function used to say hi, say hi incognito, remove say hi, block user, unblock etc
  const say_hi = async ({type, email2}) => {
    console.log(type + '  ' + email2);
    console.log(
      '************** posting data to friend API starting **************',
    );
    let access_token = await isTokenExpired();
    console.log(
      '  *** access_token ***  ' + access_token, //accessToken,
    );
    const url = domain + 'api/friend/';
    let response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: type,
        email: email,
        email2: email2,
      }),
    });
    if (type == 'say-hi') {
      console.log('**SAYHI**');
      try {
        var json = await response.json();
        if (json) {
          console.log(' *** say hi before promise json ->>> ' + json);
          setSaidHiCount(json.user_sayhi_count);
          return new Promise((resolve, reject) => {
            console.log('*** return new Promise ***');
            resolve(json.text);
          });
        }
      } catch (issue) {
        console.log(issue);
      }
    } else if (type == 'say-hi-incognito') {
      try {
        var json = await response.json();
        if (json) {
          console.log(json.users);
        }
      } catch (issue) {
        console.log(issue);
      }
    } else if (type == 'remove-say-hi') {
      try {
        var json = await response.json();
        if (json) {
          console.log('*** friends list' + json.friends);
        }
      } catch (issue) {
        console.log(issue);
      }
    } else if (type == 'remove-say-hi-incognito') {
      try {
        var json = await response.json();
        if (json) {
          console.log('*** Incognito friends list' + json.incognito_friends);
        }
      } catch (issue) {
        console.log(issue);
      }
    } else if (type == 'unfriend') {
      try {
        var json = await response.json();
        if (json) {
          console.log(json);
        }
      } catch (issue) {
        console.log(issue);
      }
    } else if (type == 'block') {
      try {
        var json = await response.json();
        if (json) {
          console.log(json);
        }
      } catch (issue) {
        console.log(issue);
      }
    } else if (type == 'unblock') {
      try {
        var json = await response.json();
        if (json) {
          console.log(json);
        }
      } catch (issue) {
        console.log(issue);
      }
    }
  };

  // get another clicked on user's profile data (not logged in user)
  const getBlockedList = async type => {
    console.log('******* GETTING USER PROFILE DATA FOR ' + email);
    let access_token = await isTokenExpired();
    console.log(
      '  *** access_token ***  ' + access_token, //accessToken,
    );
    const url = domain + 'api/friend/?email=' + email + '&type=' + type;
    console.log(url);
    return new Promise((resolve, reject) => {
      resolve(
        fetch(url, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer' + ' ' + access_token,
          },
        }),
      );
    });
  };

  //Getting list of users who have said hi, or who are mutual friends, or blocked list

  //Checking if logged in user is attending an event
  const getMyHis = async type => {
    console.log('***** GET FRIENDS ' + type + ' *********');
    isTokenExpired();
    const url = domain + 'api/friend/?email=' + email + '&type=' + type;
    return new Promise((resolve, reject) => {
      resolve(
        fetch(url, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            //Authorization: 'Bearer' + ' ' + accessCredentials.password,
          },
        }),
      );
    });
  };

  //Checking if logged in user is attending an event
  const getIfEventsViewer = async ({type, email2}) => {
    console.log('***** GET If Events Viewer ' + type + ' *********');
    const url =
      domain +
      'api/friend/?email=' +
      email +
      '&email2=' +
      email2 +
      '&type=' +
      type;
    console.log(url);
    isTokenExpired();
    return new Promise((resolve, reject) => {
      resolve(
        fetch(url, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            //Authorization: 'Bearer' + ' ' + accessCredentials.password,
          },
        }),
      );
    });
  };

  const getFriends = async type => {
    console.log('***** GET FRIENDS ' + type + ' *********');
    let access_token = await isTokenExpired();
    console.log(
      '  *** access_token ***  ' + access_token, //accessToken,
    );
    const url = domain + 'api/friend/?email=' + email + '&type=' + type;
    console.log(url);
    let response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        //Authorization: 'Bearer' + ' ' + accessCredentials.password,
      },
    });
    if (type == 'get-my-his') {
      try {
        var json = await response.json();
        if (json) {
          console.log(json.my_his);
          setMyHis(json.my_his);
        }
      } catch (issue) {
        console.log(issue);
      }
    } else if (type == 'get-friends') {
      try {
        var json = await response.json();
        if (json) {
          console.log(json.mutual_friends);
          setMyMutuals(json.mutual_friends);
        }
      } catch (issue) {
        console.log(issue);
      }
    } else if (type == 'my-blocked-list') {
      try {
        var json = await response.json();
        if (json) {
          console.log(json.mutual_friends);
          setMyBlockedList(json.my_blocked_list);
        }
      } catch (issue) {
        console.log(issue);
      }
    }
  };

  //Checking if individual users have said Hi, or if an individual user is a mutual friend
  const getSaidHi = async ({type, email2}) => {
    console.log(
      '******* GETTING WHETHER YOU HAVE ' +
        type +
        ' TO ' +
        email2 +
        ' ********',
    );
    isTokenExpired();
    const url =
      domain +
      'api/friend/?email=' +
      email +
      '&email2=' +
      email2 +
      '&type=' +
      type;
    console.log(url);
    let response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        //Authorization: 'Bearer' + ' ' + accessCredentials.password,
      },
    });
    if (type == 'said-hi') {
      try {
        var json = await response.json();
        console.log('Said Hi ---> ' + json);
        if (json == 1) {
          setSaidHi(true);
        } else {
          setSaidHi(false);
        }
      } catch (issue) {
        console.log(issue);
      }
    } else if (type == 'said-hi-incognito') {
      try {
        var json = await response.json();
        console.log('Said Hi Incognito ---> ' + json);
        if (json == 1) {
          setSaidHiIncognito(true);
        } else {
          setSaidHiIncognito(false);
        }
      } catch (issue) {
        console.log(issue);
      }
    } else if (type == 'mutual-friend') {
      try {
        var json = await response.json();
        console.log('Is mutual friend ---> ' + json);
        if (json == 1) {
          setIsMutualFriend(true);
        } else {
          setIsMutualFriend(false);
        }
      } catch (issue) {
        console.log(issue);
      }
    } else if (type == 'events-viewer') {
      try {
        var json = await response.json();
        console.log('Is event viewer ---> ' + json);
        if (json == 1) {
          setCanViewEvents(true);
        } else {
          setCanViewEvents(false);
        }
      } catch (issue) {
        console.log(issue);
      }
    } else if (type == 'is-blocked') {
      try {
        var json = await response.json();
        console.log('Is blocked ---> ' + json);
        if (json == 1) {
          setIsBlocked(true);
        } else {
          setIsBlocked(false);
        }
      } catch (issue) {
        console.log(issue);
      }
    }
  };

  const get_historic_chat = async ({current_user_id, other_user_id}) => {
    console.log(
      '******* GETTING HISTORIC CHAT WITH ' +
        current_user_id +
        ' & ' +
        other_user_id,
    );
    isTokenExpired();
    const url =
      domain +
      'chat/history/?current_user_id=' +
      current_user_id +
      '&other_user_id=' +
      other_user_id;
    return new Promise((resolve, reject) => {
      resolve(
        fetch(url, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            //Authorization: 'Bearer' + ' ' + accessCredentials.password,
          },
        }),
      );
    });
  };

  //Checking if logged in user is attending an event
  const get_open_chats = current_user_id => {
    console.log('******* GETTING OPEN CHATS FOR ' + current_user_id);
    isTokenExpired();
    const url =
      domain +
      'chat/open_chats/?current_user_id=' +
      current_user_id +
      '&email=' +
      email;
    return new Promise((resolve, reject) => {
      resolve(
        fetch(url, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            //Authorization: 'Bearer' + ' ' + accessCredentials.password,
          },
        }),
      );
    });
  };

  //API which converts users messages from unread to read
  const unread_to_read = async ({
    current_user_id,
    other_user_id,
    notif_type,
  }) => {
    console.log(
      '******* read_to_unread WITH ' +
        current_user_id +
        ' & ' +
        other_user_id +
        ' & ' +
        notif_type,
    );
    isTokenExpired();
    if (notif_type == 'sayHi') {
      var url = domain + 'chat/all-notifs/';
    } else {
      var url = domain + 'chat/open_chats/';
      var notif_type = 'message';
    }
    let response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'read_to_unread_notifs',
        current_user_id: current_user_id,
        other_user_id: other_user_id,
        notif_type: notif_type,
      }),
    });

    try {
      var json = await response.json();
      //console.log('HistoricChat ---> ' + JSON.stringify(json));
    } catch (issue) {
      //console.log('issue -->> ' + issue);
    }
  };

  //Checking if logged in user is attending an event

  return (
    <NetworkingContext.Provider
      value={{
        say_hi,
        getFriends,
        getMyHis,
        setMyHis,
        myHis,
        myMutuals,
        getSaidHi,
        saidHi,
        setSaidHi,
        saidHiIncognito,
        setSaidHiIncognito,
        isMutualFriend,
        setIsMutualFriend,
        getIfEventsViewer,
        canViewEvents,
        setCanViewEvents,
        isBlocked,
        setIsBlocked,
        getBlockedList,
        myBlockedList,
        setMyBlockedList,
        get_historic_chat,
        get_open_chats,
        setOpenChats,
        openChats,
        unread_to_read,
        messageData,
        setMessageData,
      }}>
      {children}
    </NetworkingContext.Provider>
  );
};
