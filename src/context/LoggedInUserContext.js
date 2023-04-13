import React, {useState, createContext, useContext, useRef} from 'react';
import * as Keychain from 'react-native-keychain';
import {useNetInfo} from '@react-native-community/netinfo';

//context
import {AuthContext} from './AuthContext';
import {NotificationContext} from './NotificationContext';

var jwt_decode = require('jwt-decode');

export const LoggedInUserContext = createContext();

export const LoggedInUserProvider = ({children}) => {
  const netInfo = useNetInfo();
  const {
    sayHiNotif,
    setSayHiNotif,
    chatNotif,
    setChatNotif,
    showNotification,
    ws_notifications,
    ws_chat,
    domain,
    wsUrl,
  } = useContext(NotificationContext);

  function formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }
  console.log(formatDate('Sun May 11,2014'));

  function getAge(birthdate) {
    try {
      var today = new Date();
      var birthDate = birthdate;
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      if (age == 0) {
        return '';
      } else {
        return age;
      }
    } catch {
      return '';
    }
  }
  const [userProfile, setUserProfile] = useState(['']);

  const [onUserConvo, setOnUserConvo] = useState(false);
  const onUserConvoRef = useRef(null);
  onUserConvoRef.current = onUserConvo;
  const userProfileRef = useRef(null);
  userProfileRef.current = userProfile;
  const [myHis, setMyHis] = useState(['']);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const refreshedToken = accessToken;
  const [loggedIn, setLoggedIn] = useState(false);
  const loggedInRef = useRef(null);
  loggedInRef.current = loggedIn;

  const [loading, setLoading] = useState(true);
  const [freePlan, setFreePlan] = useState(true);
  const [saidHiCount, setSaidHiCount] = useState(0);
  const [sayHiText, setSayHiText] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [profileCreated, setProfileCreated] = useState(false);
  const [serverState, setServerState] = useState(true);
  const [chatServerState, setChatServerState] = useState(true);
  const [notifServerState, setNotifServerState] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [id, setId] = useState('');
  const [gender, setGender] = useState('');
  const [ethnicity, setEthnicity] = useState('');
  const today = new Date();
  const [dob, setDob] = useState(today);
  const [age, setAge] = useState(getAge(dob));
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');

  const [avatarId, setAvatarId] = useState('');
  const [image1Id, setImage1Id] = useState('');
  const [image2Id, setImage2Id] = useState('');

  const [student, setStudent] = useState(false);

  const [university, setUniversity] = useState('');
  const [course, setCourse] = useState('');
  const [year, setYear] = useState('');

  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [music, setMusic] = useState(false);
  const [travelling, setTravelling] = useState(false);
  const [sport, setSport] = useState(false);
  const [gaming, setGaming] = useState(false);
  const [reading, setReading] = useState(false);
  const [business, setBusiness] = useState(false);
  const [investing, setInvesting] = useState(false);
  const [christianity, setChristianity] = useState(false);
  const [islam, setIslam] = useState(false);
  const [hinduism, setHinduism] = useState(false);
  const [sikhism, setSikhism] = useState(false);
  const [judaism, setJudaism] = useState(false);
  const [buddhism, setBuddhism] = useState(false);

  /*
  const [buddhism, setBuddhism] = useState(false);
  */

  const [meetingPeople, setMeetingPeople] = useState(false);
  const [travelBuddy, setTravelBuddy] = useState(false);
  const [gymBuddy, setGymBuddies] = useState(false);
  const [studyBuddy, setStudyBuddies] = useState(false);
  const [mentoring, setMentoring] = useState(false);
  const [angelInvesting, setAngelInvesting] = useState(false);
  const [cofounding, setCofounding] = useState(false);

  const [clubbing, setClubbing] = useState(false);
  const [brunches, setBrunches] = useState(false);
  const [festivals, setFestivals] = useState(false);
  const [concerts, setConcerts] = useState(false);
  const [gameNight, setGameNight] = useState(false);
  const [entrepreneurial, setEntrepreneurial] = useState(false);
  const [networking, setNetworking] = useState(false);
  const [career, setCareer] = useState(false);
  const [conferences, setConferences] = useState(false);

  const q1 = 'If a genie gave you three wishes, what would you wish for?';
  const q2 = 'What were you last excited about?';
  const q3 =
    'Have you ever read a book or watched a movie that changed your life?';
  const q4 = 'What are you most determined to accomplish?';
  const q5 = 'Whats your “and then it got worse” story?';
  const q6 = 'What year was your favourite birthday?';
  const q7 = 'What scrambles your brain every time you think about it?';

  const [answer1, setAnswer1] = useState('');
  const [answer2, setAnswer2] = useState('');
  const [answer3, setAnswer3] = useState('');
  const [answer4, setAnswer4] = useState('');
  const [answer5, setAnswer5] = useState('');
  const [answer6, setAnswer6] = useState('');
  const [answer7, setAnswer7] = useState('');

  const genders = [
    {id: 1, gender: 'Man', selected: true},
    {id: 2, gender: 'Woman', selected: true},
    {id: 3, gender: 'Non-Binary', selected: true},
  ];

  const cities = [
    {id: 1, city: 'London', selected: true},
    {id: 2, city: 'Miami', selected: true},
    {id: 3, city: 'Malta', selected: true},
    {id: 4, city: 'Lagos', selected: true},
    {id: 5, city: 'Accra', selected: true},
  ];

  const roles = [
    {id: 1, role: 'Student', selected: true},
    {id: 2, role: 'Product Manager', selected: true},
    {id: 3, role: 'Data Scientist', selected: true},
    {id: 4, role: 'Software Engineer', selected: true},
    {id: 5, role: 'Program Manager', selected: true},
    {id: 6, role: 'Data Analyst', selected: true},
    {id: 7, role: 'Account Manager', selected: true},
  ];

  const interests_bool = [
    music,
    travelling,
    sport,
    gaming,
    reading,
    business,
    investing,
    christianity,
    islam,
    hinduism,
    sikhism,
    judaism,
    buddhism,
  ];
  const interests = [
    'Music',
    'Travelling',
    'Sport',
    'Gaming',
    'Reading',
    'Business',
    'Investing',
    'Christianity',
    'Islam',
    'Hinduism',
    'Sikhism',
    'Judaism',
    'Buddhism',
  ];
  const open_tos_bool = [
    meetingPeople,
    travelBuddy,
    gymBuddy,
    studyBuddy,
    mentoring,
    angelInvesting,
    cofounding,
  ];
  const open_tos = [
    'MeetingNewPeople',
    'TravelBuddy',
    'GymBuddy',
    'StudyBuddy',
    'Mentoring',
    'AngelInvesting',
    'Cofounding',
  ];
  const events_bool = [
    clubbing,
    brunches,
    festivals,
    concerts,
    gameNight,
    entrepreneurial,
    networking,
    career,
    conferences,
  ];

  const events = [
    'Clubbing',
    'Brunches',
    'Festivals',
    'Concerts',
    'Game Night',
    'Entrepreneurial',
    'Networking',
    'Career',
    'Conferences',
  ];

  const questions = [q1, q2, q3, q4, q5, q6, q7];
  const answers = [
    answer1,
    answer2,
    answer3,
    answer4,
    answer5,
    answer6,
    answer7,
  ];

  const [filePath1, setFilePath1] = useState(false);
  const [filePath2, setFilePath2] = useState(false);
  const [filePath3, setFilePath3] = useState(false);

  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);

  const [image1Loading, setImage1Loading] = useState(false);
  const [image2Loading, setImage2Loading] = useState(false);
  const [image3Loading, setImage3Loading] = useState(false);

  //get user token - function used after user enters their email and password
  // then use getUserData() function to get logged in user's data once we have their token
  const getToken = async () => {
    console.log('************** getToken starting **************');
    const url = domain + 'api/login/';
    let response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    var json = '';
    try {
      json = await response.json();
      console.log('***** JSON *****  ->>   ' + JSON.stringify(json));
      const newAccessToken = json.tokens.access;
      const newRefreshToken = json.tokens.refresh;
      setError(null);
      setAccessToken(newAccessToken);
      setRefreshToken(newRefreshToken);

      // await Keychain.resetGenericPassword();
      await Keychain.setGenericPassword('tokens', JSON.stringify(json.tokens), {
        service: 'tokens',
      });
      await Keychain.setGenericPassword('access', json.tokens.access, {
        service: 'access',
      });
      await Keychain.setGenericPassword('refresh', json.tokens.refresh, {
        service: 'refresh',
      });
      //getMyId();
      return new Promise((resolve, reject) => {
        console.log('*** return new Promise ***');
        resolve(json.tokens.access);
      });
    } catch (error) {
      setError(json);
      setAccessToken(undefined);
      //setAccessToken(false);
      console.log('no token exists - login unsuccessful' + '  ' + accessToken);
    }
  };

  // get users refresh token - to be used to then retrieve new access token once old access token expires
  const getTokenRefresh = async () => {
    console.log(
      '************** get Access Token with Refresh Token starting **************',
    );
    const refreshCredentials = await Keychain.getGenericPassword({
      service: 'refresh',
    });
    console.log(
      '************** refreshCredentials **************  ->  ' +
        refreshCredentials.password,
    );
    const url = domain + 'api/token/refresh/';
    let response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refresh: refreshCredentials.password,
      }),
    });

    try {
      var json = await response.json();
      const newAccessToken = json.access;
      console.log('***** getTokenRefresh json.access ***** -> ' + json.access);
      setAccessToken(newAccessToken);

      await Keychain.setGenericPassword('access', json.access, {
        service: 'access',
      });
      const accessCredentials = await Keychain.getGenericPassword({
        service: 'access',
      });
      return new Promise((resolve, reject) => {
        console.log(
          'accessCredentials.password getTokenRefresh promise -> ' +
            accessCredentials.password,
        );
        resolve(accessCredentials.password);
      });
    } catch (error) {
      console.log(error);
    }
  };

  // checking whether current access token is expired - then should get new access token using refresh token
  // needs work

  /*const isTokenExpired = async () => {
    const accessCredentials = await Keychain.getGenericPassword({
      service: 'access',
    });
    console.log('****** checking token expiry date *******');
    console.log('AccessToken ------- ' + accessCredentials.password);
    //var decoded = jwt_decode(accessCredentials.password);
    var decoded = jwt_decode(accessToken);
    // if expiry date has passed
    if (decoded.exp < Date.now() / 1000) {
      console.log('token expired need to refresh token');
      getTokenRefresh();
    } else {
      console.log('token still valid');
      return false;
    }
  };
  */

  const isTokenExpired = async () => {
    const accessCredentials = await Keychain.getGenericPassword({
      service: 'access',
    });
    const refreshCredentials = await Keychain.getGenericPassword({
      service: 'refresh',
    });
    console.log('****** checking token expiry date *******');
    console.log('AccessToken ------- ' + accessToken);
    console.log('accessCredentials ------- ' + accessCredentials.password);
    console.log('RefreshToken ------- ' + refreshToken);
    console.log('refreshCredentials ------- ' + refreshCredentials.password);
    //var decoded = jwt_decode(accessCredentials.password);
    try {
      var decodedAccess = await jwt_decode(accessCredentials.password); //accessToken
      var decodedRefresh = await jwt_decode(refreshCredentials.password); //refreshToken
    } catch (error) {
      console.log('JWT ISSUE --> ' + error);
    }
    // if expiry date has passed
    if (decodedRefresh.exp < Date.now() / 1000) {
      console.log(
        ' *** REFRESH TOKEN EXPIRED getting access & refresh tokens again *** ',
      );
      return new Promise((resolve, reject) => {
        resolve(getToken());
      });
    } else if (decodedAccess.exp < Date.now() / 1000) {
      console.log(
        ' *** ACCESS TOKEN EXPIRED using refresh token to get new access token *** ',
      );
      return new Promise((resolve, reject) => {
        resolve(getTokenRefresh());
      });
    } else {
      console.log(' *** ACCESS TOKEN STILL VALID *** ');
      //return false;
      return new Promise((resolve, reject) => {
        resolve(accessCredentials.password);
      });
    }
  };

  //get logged in users profile data - then save the profile data in the MyUserProfile component
  const getMyProfileData = async () => {
    console.log('******** getMyProfileData ********');

    let access_token = await isTokenExpired();
    console.log(
      '  *** access_token ***  ' + access_token, //accessToken,
    );

    const url = domain + 'api/update-user/' + email + '/';
    return new Promise((resolve, reject) => {
      resolve(
        fetch(url, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer' + ' ' + access_token, //accessToken,
          },
        }),
      );
    });
  };

  // get users refresh token - to be used to then retrieve new access token once old access token expires
  const submitSubscriptionPlan = async ({navigation}) => {
    console.log('************** get Photo IDs starting **************');
    let access_token = await isTokenExpired();
    console.log(
      '  *** access_token ***  ' + access_token, //accessToken,
    );
    const url = domain + 'api/subscription/';
    if (freePlan == true) {
      var user_plan_body = JSON.stringify({
        email: email,
        plan: 'Free',
      });
    } else if (freePlan == false) {
      var user_plan_body = JSON.stringify({
        email: email,
        plan: 'Paid',
      });
    }
    let response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer' + ' ' + access_token, //accessToken,
      },
      body: user_plan_body,
    });

    try {
      var json = await response.json();
      console.log('*** user subscription plan response ***  ->> ' + json);
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  // get users refresh token - to be used to then retrieve new access token once old access token expires
  const getSubscriptionPlan = async () => {
    console.log('************** get Photo IDs starting **************');
    let access_token = await isTokenExpired();
    console.log(
      '  *** access_token ***  ' + access_token, //accessToken,
    );
    const url = domain + 'api/subscription/?email=' + email;
    let response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer' + ' ' + access_token, //accessToken,
      },
    });

    try {
      var json = await response.json();
      setSaidHiCount(json.user_sayhi_count);
      setSayHiText(json.say_hi_text);
      console.log('*** get subscription plan *** ->> ' + JSON.stringify(json));
      if (json.user_plan == 'Free') {
        setFreePlan(true);
      } else if (json.user_plan == 'Paid') {
        setFreePlan(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // get users refresh token - to be used to then retrieve new access token once old access token expires
  const getMyId = async () => {
    console.log('************** get Photo IDs starting **************');
    let access_token = await isTokenExpired();
    console.log(
      '  *** access_token ***  ' + access_token, //accessToken,
    );
    const url = domain + 'api/get-my-id/?email=' + email;
    let response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer' + ' ' + access_token, //accessToken,
      },
    });

    try {
      var json = await response.json();
      setId(json.id);
    } catch (error) {
      console.log(error);
    }
  };

  // get users refresh token - to be used to then retrieve new access token once old access token expires
  const getPhotoIds = async () => {
    console.log('************** get Photo IDs starting **************');
    let access_token = await isTokenExpired();
    console.log(
      '  *** access_token ***  ' + access_token, //accessToken,
    );
    const url = domain + 'api/user-photos-ids/?email=' + email;
    let response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer' + ' ' + access_token, //accessToken,
      },
    });

    try {
      var json = await response.json();
      setAvatarId(json.avatar_id);
      setImage1Id(json.image1_id);
      setImage2Id(json.image2_id);
    } catch (error) {
      console.log(error);
    }
  };

  // get users refresh token - to be used to then retrieve new access token once old access token expires
  const getPhotos = async () => {
    console.log('************** get Photossss starting **************');
    let access_token = await isTokenExpired();
    console.log(
      '  *** access_token ***  ' + access_token, //accessToken,
    );
    const url = domain + 'api/get-user-photos/?email=' + email;
    return new Promise((resolve, reject) => {
      resolve(
        fetch(url, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer' + ' ' + access_token, //accessToken,
          },
        }),
      );
    });
  };
  /*
    try {
      var json = await response.json();
      console.log('*** getPhotos JSON ****  ->> ' + JSON.stringify(json));
      console.log(
        '*** json.avatar JSON ****  ->> ' + JSON.stringify(json.avatar),
      );

      //setImage1({uri: json.avatar});
      //setImage2({uri: json.image1});
      //setImage3({uri: json.image2});

      return new Promise((resolve, reject) => {
        console.log('*** return new Promise ***');
        resolve(json);
      });
      /*
      setImage1({
        uri: json.avatar.uri,
        type: 'image/jpg',
        fileName: email + '-Avatar',
      });
      setImage2({
        uri: json.image1.uri,
        type: 'image/jpg',
        fileName: email + '-image1',
      });
      setImage3({
        uri: json.image2.uri,
        type: 'image/jpg',
        fileName: email + '-image2',
      });
      
    } catch (error) {
      console.log('**** get photos issue ****' + error);
      setImage1(false);
      setImage2(false);
      setImage3(false);
    }
  };
  */

  // getting logged in users interests
  const getInterests = async () => {
    console.log('****** getting my interests from API starting *****');

    console.log(' *** get interests *** ');
    const interests_db = [];

    let access_token = await isTokenExpired();
    console.log(
      '  *** access_token ***  ' + access_token, //accessToken,
    );

    const url = domain + 'api/user-interests/?email=' + email;
    let response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer' + ' ' + access_token,
      },
    });

    try {
      var json = await response.json();
      if (json) {
        console.log(json.includes('Music'));
        if (json.includes('Music')) {
          setMusic(true);
          interests_db.push('Music');
        } else {
          setMusic(false);
          interests_db.push('Music');
        }
        if (json.includes('Travelling')) {
          setTravelling(true);
          interests_db.push('Travelling');
        } else {
          setTravelling(false);
          interests_db.push('Travelling');
        }
        if (json.includes('Sport')) {
          setSport(true);
          interests_db.push('Sport');
        } else {
          setSport(false);
          interests_db.push('Sport');
        }
        if (json.includes('Gaming')) {
          setGaming(true);
          interests_db.push('Gaming');
        } else {
          setGaming(false);
          interests_db.push('Gaming');
        }
        if (json.includes('Reading')) {
          setReading(true);
          interests_db.push('Reading');
        } else {
          setReading(false);
          interests_db.push('Reading');
        }
        if (json.includes('Business')) {
          setBusiness(true);
          interests_db.push('Business');
        } else {
          setBusiness(false);
          interests_db.push('Business');
        }
        if (json.includes('Investing')) {
          setInvesting(true);
          interests_db.push('Investing');
        } else {
          setInvesting(false);
          interests_db.push('Investing');
        }
        if (json.includes('Christianity')) {
          setChristianity(true);
          interests_db.push('Christianity');
        } else {
          setChristianity(false);
          interests_db.push('Christianity');
        }
        if (json.includes('Islam')) {
          setIslam(true);
          interests_db.push('Islam');
        } else {
          setIslam(false);
          interests_db.push('Islam');
        }
        if (json.includes('Hinduism')) {
          setHinduism(true);
          interests_db.push('Hinduism');
        } else {
          setHinduism(false);
          interests_db.push('Hinduism');
        }
        if (json.includes('Sikhism')) {
          setSikhism(true);
          interests_db.push('Sikhism');
        } else {
          setSikhism(false);
          interests_db.push('Sikhism');
        }
        if (json.includes('Judaism')) {
          setJudaism(true);
          interests_db.push('Judaism');
        } else {
          setJudaism(false);
          interests_db.push('Judaism');
        }
        if (json.includes('Buddhism')) {
          setBuddhism(true);
          interests_db.push('Buddhism');
        } else {
          setBuddhism(false);
          interests_db.push('Buddhism');
        }
        console.log(interests_db);
        return interests_db;
      }
    } catch (issue) {
      console.log(issue);
    }
  };

  // getting logged in user's open-tos
  const getOpenTos = async () => {
    console.log('****** getting my open tos from API starting ********');
    const open_tos_db = [];

    let access_token = await isTokenExpired();
    console.log(
      '  *** access_token ***  ' + access_token, //accessToken,
    );

    const url = domain + 'api/my-open-tos/';
    let response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer' + ' ' + access_token, //accessToken,
      },
    });
    /*
      'Cofounding',
      */
    try {
      var json = await response.json();
      if (json) {
        console.log(json);
        if (json.includes('MeetingNewPeople')) {
          setMeetingPeople(true);
          open_tos_db.push('MeetingNewPeople');
        } else {
          setMeetingPeople(false);
          open_tos_db.push('MeetingNewPeople');
        }
        if (json.includes('TravelBuddy')) {
          setTravelBuddy(true);
          open_tos_db.push('TravelBuddy');
        } else {
          setTravelBuddy(false);
          open_tos_db.push('TravelBuddy');
        }
        if (json.includes('GymBuddy')) {
          setGymBuddies(true);
          open_tos_db.push('GymBuddy');
        } else {
          setGymBuddies(false);
          open_tos_db.push('GymBuddy');
        }
        if (json.includes('StudyBuddy')) {
          setStudyBuddies(true);
          open_tos_db.push('StudyBuddy');
        } else {
          setStudyBuddies(false);
          open_tos_db.push('StudyBuddy');
        }
        if (json.includes('Mentoring')) {
          setMentoring(true);
          open_tos_db.push('Mentoring');
        } else {
          setMentoring(false);
          open_tos_db.push('Mentoring');
        }
        if (json.includes('AngelInvesting')) {
          setAngelInvesting(true);
          open_tos_db.push('AngelInvesting');
        } else {
          setAngelInvesting(false);
          open_tos_db.push('AngelInvesting');
        }
        if (json.includes('Cofounding')) {
          setCofounding(true);
          open_tos_db.push('Cofounding');
        } else {
          setCofounding(false);
          open_tos_db.push('Cofounding');
        }
        console.log(open_tos_db);
        return open_tos_db;
      }
    } catch (issue) {
      console.log(issue);
    }
  };

  // getting logged in user's Q&A
  const getQA = async () => {
    console.log('******** getting user QA data from API starting *******');
    let access_token = await isTokenExpired();
    console.log(
      '  *** access_token ***  ' + access_token, //accessToken,
    );
    const url = domain + 'api/my-qas/';
    let response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer' + ' ' + access_token, //accessToken,
      },
    });

    try {
      var json = await response.json();
      if (json) {
        console.log(json);
        let j = 0;
        while (j < json.length) {
          if (json[j][0] == q1) {
            setAnswer1(json[j][1]);
          } else if (json[j][0] == q2) {
            setAnswer2(json[j][1]);
          } else if (json[j][0] == q3) {
            setAnswer3(json[j][1]);
          } else if (json[j][0] == q4) {
            setAnswer4(json[j][1]);
          } else if (json[j][0] == q5) {
            setAnswer5(json[j][1]);
          } else if (json[j][0] == q6) {
            setAnswer6(json[j][1]);
          } else if (json[j][0] == q7) {
            setAnswer7(json[j][1]);
          }
          j++;
        }
      }
    } catch (issue) {
      console.log(issue);
    }
  };

  const get_notif_ids = async user_email => {
    console.log('******* GETTING notif_ids FOR ' + user_email);
    let access_token = await isTokenExpired();
    console.log(
      '  *** access_token ***  ' + access_token, //accessToken,
    );
    const url =
      domain +
      'chat/all-notifs/?type=get_notif_ids&current_user_email=' +
      user_email;
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

  function getFriendsAgain() {
    console.log('getFriendsAgain');
    setTimeout(() => {
      //getFriends('get-my-his');
      getMyHis('get-my-his')
        .then(response => response.json())
        .then(data => setMyHis(data.my_his));
    }, 1000);
  }

  const [notifInterval, setNotifInterval] = useState(null);
  const interval = useRef(null);
  const myIntervals = useRef(null);
  myIntervals.current = [];

  myIntervals.current = [];
  function setupWebSocket(id) {
    //var ws_notifications = new WebSocket(wsUrl);
    console.log('starting setupWebSocket');
    ws_notifications.current = new WebSocket(wsUrl);
    console.log(
      'ws_notifications.current ->>> ' +
        JSON.stringify(ws_notifications.current),
    );
    ws_notifications.current.onopen = () => {
      console.log('ws_notifications Connected to the server---');
      setNotifServerState(true);
      setServerState(true);
      if (interval.current) {
        console.log('ws_notifications clear interval-> ' + interval.current);
        console.log(
          'ws_notifications clear interval2-> ' + myIntervals.current,
        );
        myIntervals.current.forEach(i => {
          console.log('ws_notifications interval -> ' + i);
          clearInterval(i);
        });
        //clearInterval(interval.current);
      }
    };

    ws_notifications.current.onclose = e => {
      console.log('Disconnected. Check internet or server.');
      setServerState(false);
      setNotifServerState(false);
      //setTimeout(setupWebSocket(id), 1000);
      //ws_notifications.current.close();
      interval.current = setInterval(() => {
        console.log('ws_notifications closed interval starting');
        setupWebSocket(id);
      }, 6000);
      myIntervals.current.push(interval.current);
      console.log(' myIntervals ->> ' + myIntervals.current);
    };

    ws_notifications.current.onmessage = e => {
      const notif = JSON.parse(e.data);

      var condition1 =
        notif.notif_type.toString().trim() == 'sayHi' &&
        notif.sender.toString().trim() !== id.toString().trim() &&
        notif.receiver.toString().trim() == id.toString().trim();

      var condition2 =
        onUserConvoRef.current == false &&
        notif.notif_type.toString().trim() == 'message' &&
        notif.sender.toString().trim() !== id.toString().trim() && //sender shouldn't be me
        notif.receiver.toString().trim() == id.toString().trim();

      var condition3 =
        onUserConvoRef.current == true &&
        notif.sender.toString().trim() !==
          userProfileRef.current.id.toString().trim() && //sender shouldn't be the person whos convo I'm on
        notif.notif_type.toString().trim() == 'message' &&
        notif.sender.toString().trim() !== id.toString().trim() && //sender shouldn't be me
        notif.receiver.toString().trim() == id.toString().trim();

      console.log(
        'condition1 : ' +
          condition1 +
          ' condition2 : ' +
          condition2 +
          ' condition3 : ' +
          condition3 +
          ' onUserConvo : ' +
          onUserConvo,
      );

      console.log('*** notifnotif - LoggedInUserContext *** -> ' + notif);
      if (
        notif.notif_type.toString().trim() == 'remove sayHi' &&
        notif.receiver.toString() == id.toString().trim()
      ) {
        const updatedSayHiNotif = new Set([sayHiNotif]); //new Set(sayHiNotif);
        var remove_id = notif.sender.toString().trim();
        updatedSayHiNotif.delete(remove_id);
        setSayHiNotif(updatedSayHiNotif);
        console.log(
          ' *** updatedSayHiNotif notif_type == remove sayHi *** ->' +
            updatedSayHiNotif,
        );
        getFriendsAgain();
      } else if (
        (condition1 || condition2 || condition3) &&
        loggedInRef.current
      ) {
        console.log(
          'one PASSED --- condition1 : ' +
            condition1 +
            ' condition2 : ' +
            condition2 +
            ' condition3 : ' +
            condition3 +
            ' onUserConvo : ' +
            onUserConvo +
            ' loggedInRef.current : ' +
            loggedInRef.current,
        );
        showNotification({
          id: notif.notif_id,
          title:
            notif.notif_type.toString().trim() == 'message'
              ? notif.sender_first_name.toString().trim() +
                ' sent you a message'
              : notif.message.toString().trim(),
          message:
            notif.notif_type.toString().trim() == 'message'
              ? notif.message.toString().trim()
              : 'Say Hi back to start a conversation..',
          picture: notif.sender_avi.toString().trim(),
        });

        if (notif.notif_type.toString().trim() == 'message') {
          const updatedChatNotif = [
            ...chatNotif,
            notif.sender.toString().trim(),
          ];
          console.log(
            ' *** updatedChatNotif loggedInUserContext *** ->' +
              updatedChatNotif,
          );
          setChatNotif([...new Set(updatedChatNotif)]);
        } else if (notif.notif_type.toString().trim() == 'sayHi') {
          const updatedSayHiNotif = [
            ...sayHiNotif,
            notif.sender.toString().trim(),
          ];
          console.log(
            ' *** updatedSayHiNotif loggedInUserContext *** ->' +
              updatedSayHiNotif,
          );
          setSayHiNotif([...new Set(updatedSayHiNotif)]);
          getFriendsAgain();
        }
      } else {
        console.log(
          'condition1 : ' + condition1 + ' condition2 : ' + condition2,
        );
      }
      console.log('condition1 : ' + condition1 + ' condition2 : ' + condition2);
    };
  }

  const [isOffline, setOfflineStatus] = useState(false);
  const [chatInterval, setChatInterval] = useState(null);
  const chat_ws_interval = useRef(null);
  const myChatIntervals = useRef(null);
  myChatIntervals.current = [];

  /*
  const loggedInRef = useRef(null);
  loggedInRef.current = loggedIn;
  */

  function setupChatWebSocket(id, chat_wsUrl) {
    console.log('setupChatWebSocket function ws_chat running');

    ws_chat[id] = new WebSocket(chat_wsUrl);
    console.log(' ws_chat[id] ->>> ' + JSON.stringify(ws_chat[id]));

    ws_chat[id].onopen = () => {
      console.log('ws_chat Connected to the server---');
      setServerState(true);
      setChatServerState(true);
      //setOfflineStatus(false);

      if (myChatIntervals.current) { //if (chat_ws_interval.current) {
        console.log('ws_chat clear interval-> ' + chat_ws_interval.current);
        console.log('ws_chat clear interval2-> ' + myChatIntervals.current);
        myChatIntervals.current.forEach(i => {
          console.log('ws_chat interval -> ' + i);
          clearInterval(i);
        });
        //clearInterval(chat_ws_interval.current);
      }
    };

    ws_chat[id].onclose = e => {
      console.log('ws_chat Disconnected. Check internet or server.');
      setServerState(false);
      setChatServerState(false);
      //setTimeout(setupWebSocket(id), 1000);
      //ws_notifications.current.close();

      chat_ws_interval.current = setInterval(() => {
        console.log('ws_chat closed interval starting');
        //setOfflineStatus(true);
        setupChatWebSocket(id, chat_wsUrl);
      }, 6000);
      myChatIntervals.current.push(chat_ws_interval.current);
      myChatIntervals.current.push(123);
      console.log(' ws_chat myChatIntervals ->> ' + myChatIntervals.current);
    };

    /*chat_ws_interval.current = setInterval(() => {
      if (netInfo.isConnected == true && netInfo.isInternetReachable == true) {
        setOfflineStatus(true);
        setupChatWebSocket(id, chat_wsUrl);
        console.log('ws_chat useNet no internet connection');
      }

      //
    }, 1000);*/

    return ws_chat[id];
  }
  // putting everything together and getting logged in user's data in one function
  // used in the getToken function - getting logged in user's data once we have their token
  const getUserData = ({navigation}) => {
    console.log('getUserData');
    getMyProfileData()
      .then(response => response.json())
      .then(data => {
        console.log('data--> ' + JSON.stringify(data));
        var currentDob;
        if (data.dob == null) {
          currentDob = today;
        } else {
          currentDob = new Date(data.dob);
        }
        setId(data.id);
        setFirstName(data.first_name);
        setLastName(data.last_name);
        console.log('currentDob -->> ' + currentDob);
        setDob(currentDob);
        setAge(getAge(currentDob));
        setGender(data.gender);
        setEthnicity(data.ethnicity);
        setCountry(data.country);
        setCity(data.city);
        setRole(data.role);
        setCompany(data.company);
        setStudent(data.student);
        setUniversity(data.university);
        setCourse(data.course);
        setYear(data.year);
        setProfileCreated(data.profile_created);
        setIsVerified(data.is_verified);
        setupWebSocket(data.id);

        if (data.is_verified == false) {
          navigation.push('Verify Email');
        } else if (data.profile_created == false) {
          navigation.push('Sign up gender location');
        }
      })
      .catch(console.log('getMyProfileData promise error'));
    getPhotoIds();
    getPhotos()
      .then(response => response.json())
      .then(json_response => {
        setImage1({uri: json_response.avatar});
        setImage2({uri: json_response.image1});
        setImage3({uri: json_response.image2});
        /*
        setImage1Loading(false);
        setImage2Loading(false);
        setImage3Loading(false);
        */
      });
    getInterests();
    getOpenTos();
    getQA();
  };

  const editProfilePageData = () => {
    console.log(' ******** editProfilePageData ******** ');
    getMyProfileData()
      .then(response => response.json())
      .then(data => {
        setLoading(true);
        console.log('editProfilePageData data--> ' + JSON.stringify(data));
        var currentDob;
        if (data.dob == null) {
          currentDob = today;
        } else {
          currentDob = new Date(data.dob);
        }
        setId(data.id);
        setFirstName(data.first_name);
        setLastName(data.last_name);
        console.log('currentDob -->> ' + currentDob);
        setDob(currentDob);
        setAge(getAge(currentDob));
        setGender(data.gender);
        setEthnicity(data.ethnicity);
        setCountry(data.country);
        setCity(data.city);
        setRole(data.role);
        setCompany(data.company);
        setStudent(data.student);
        setUniversity(data.university);
        setCourse(data.course);
        setYear(data.year);
        //setProfileCreated(data.profile_created);
        getPhotoIds();
        getPhotos()
          .then(response => response.json())
          .then(json_response => {
            setImage1({uri: json_response.avatar});
            setImage2({uri: json_response.image1});
            setImage3({uri: json_response.image2});
            /*
            setImage1Loading(false);
            setImage2Loading(false);
            setImage3Loading(false);
            */
          });
        getInterests();
        getOpenTos();
        getQA();
      })
      .then(() => {
        setLoading(false);
      })
      .catch(error => {
        console.log('Api call error ->>> ' + error.message);
        alert(error.message);
      });
  };
  //.catch(console.log('getMyProfileData promise error'));
  /*.then(() => {
        
      });*/

  //submitting users name if they make a change - used in Edit Profile section
  const submitName = async ({navigation}) => {
    console.log('******** updating Name data via API starting ********');
    console.log('submitted first name -> ' + firstName);
    console.log('submitted last name -> ' + lastName);
    let access_token = await isTokenExpired();
    console.log(
      '  *** access_token ***  ' + access_token, //accessToken,
    );
    if (firstName.length < 2) {
      setError('Your first name is required');
    } else {
      setError(null);
      const url = domain + 'api/update-user/' + email + '/';
      let response = await fetch(url, {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer' + ' ' + access_token, //accessToken,
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
        }),
      });

      try {
        var json = await response.json();
        if (json) {
          console.log(json);
          setError(null);
          navigation.goBack();
        }
      } catch (issue) {
        console.log(issue);
      }
    }
  };

  //submitting users age if they make a change - used in Edit Profile section
  const submitAge = async ({navigation}) => {
    console.log('******** updating Age data via API starting ********');
    let access_token = await isTokenExpired();
    console.log(
      '  *** access_token ***  ' + access_token, //accessToken,
    );
    if (dob.toDateString() == today.toDateString()) {
      setError('Your date of birth is required');
    } else {
      setError(null);
      const url = domain + 'api/update-user/' + email + '/';
      let response = await fetch(url, {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer' + ' ' + access_token, //accessToken,
        },
        body: JSON.stringify({
          dob: formatDate(dob),
        }),
      });

      try {
        var json = await response.json();
        if (json) {
          console.log(json);
          setError(null);
          setAge(getAge(dob));
          navigation.goBack();
        }
      } catch (issue) {
        console.log(issue);
      }
    }
  };

  //submitting users gender if they make a change - used in Edit Profile section
  const submitGender = async ({navigation}) => {
    console.log('******** updating Gender data via API starting ********');
    let access_token = await isTokenExpired();
    console.log(
      '  *** access_token ***  ' + access_token, //accessToken,
    );
    if (gender.length == 0) {
      setError('Your gender is required');
    } else {
      setError(null);
      const url = domain + 'api/update-user/' + email + '/';
      let response = await fetch(url, {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer' + ' ' + access_token, //accessToken,
        },
        body: JSON.stringify({
          gender: gender,
        }),
      });

      try {
        var json = await response.json();
        if (json) {
          console.log(json);
          setError(null);
          navigation.goBack();
        }
      } catch (issue) {
        console.log(issue);
      }
    }
  };

  //submitting users ethnicity if they make a change - used in Edit Profile section
  const submitEthnicity = async ({navigation}) => {
    console.log('******** updating Ethnicity data via API starting ********');
    let access_token = await isTokenExpired();
    console.log(
      '  *** access_token ***  ' + access_token, //accessToken,
    );
    if (ethnicity.length == 0) {
      setError('Your ethnicity is required');
    } else {
      setError(null);
      const url = domain + 'api/update-user/' + email + '/';
      let response = await fetch(url, {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer' + ' ' + access_token, //accessToken,
        },
        body: JSON.stringify({
          ethnicity: ethnicity,
        }),
      });

      try {
        var json = await response.json();
        if (json) {
          console.log(json);
          setError(null);
          navigation.goBack();
        }
      } catch (issue) {
        console.log(issue);
      }
    }
  };

  //submitting users location if they make a change - used in Edit Profile section
  const submitLocation = async ({navigation}) => {
    console.log('******** updating Location data via API starting ********');
    let access_token = await isTokenExpired();
    console.log(
      '  *** access_token ***  ' + access_token, //accessToken,
    );
    if (country.length == 0) {
      setError('Your country is required');
    } else if (city.length == 0) {
      setError('Your city is required');
    } else {
      setError(null);
      const url = domain + 'api/update-user/' + email + '/';
      let response = await fetch(url, {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer' + ' ' + access_token, //accessToken,
        },
        body: JSON.stringify({
          country: country,
          city: city,
        }),
      });

      try {
        var json = await response.json();
        if (json) {
          console.log(json);
          setError(null);
          navigation.goBack();
        }
      } catch (issue) {
        console.log(issue);
      }
    }
  };

  //submitting users job if they make a change - used in Edit Profile section
  const submitJob = async ({navigation}) => {
    console.log('******** updating Job data via API starting ********');
    let access_token = await isTokenExpired();
    console.log(
      '  *** access_token ***  ' + access_token, //accessToken,
    );
    if (role.length == 0) {
      setError('Your role is required');
    } else if (company.length == 0) {
      setError('Your company is required');
    } else {
      setError(null);
      const url = domain + 'api/update-user/' + email + '/';
      let response = await fetch(url, {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer' + ' ' + access_token, //accessToken,
        },
        body: JSON.stringify({
          company: company,
          role: role,
        }),
      });

      try {
        var json = await response.json();
        if (json) {
          console.log(json);
          setError(null);
          navigation.goBack();
        }
      } catch (issue) {
        console.log(issue);
      }
    }
  };

  //submitting users interests if they make a change - used in Edit Profile section
  const submitInterests = async ({navigation}) => {
    console.log('******** updating interests data via API starting ********');
    let access_token = await isTokenExpired();
    console.log(
      '  *** access_token ***  ' + access_token, //accessToken,
    );
    if (
      music == 0 &&
      travelling == 0 &&
      sport == 0 &&
      gaming == 0 &&
      reading == 0 &&
      business == 0 &&
      investing == 0 &&
      christianity == 0 &&
      islam == 0 &&
      hinduism == 0 &&
      sikhism == 0 &&
      judaism == 0 &&
      buddhism == 0
    ) {
      setError('Pick at least 1 interest');
    } else {
      const interests_db = [];
      let i = 0;
      while (i < interests_bool.length) {
        if (interests_bool[i] == true) {
          interests_db.push(interests[i]);
        }
        i++;
      }
      const url = domain + 'api/my-interests/';
      let response = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer' + ' ' + access_token, //accessToken,
        },
        body: JSON.stringify({
          email: email,
          interests: interests_db,
        }),
      });

      try {
        var json = await response.json();
        if (json) {
          console.log(json);
          setError(null);
          navigation.goBack();
        }
      } catch (issue) {
        console.log(issue);
      }
    }
  };

  //submitting users open tos if they make a change - used in Edit Profile section
  const submitOpenTos = async ({navigation}) => {
    console.log('******** updating Open To data via API starting ********');
    let access_token = await isTokenExpired();
    console.log(
      '  *** access_token ***  ' + access_token, //accessToken,
    );
    if (
      meetingPeople == 0 &&
      travelBuddy == 0 &&
      gymBuddy == 0 &&
      studyBuddy == 0 &&
      mentoring == 0 &&
      angelInvesting == 0 &&
      cofounding == 0
    ) {
      setError("Pick at least 1 thing you're open to");
    } else {
      setError(null);
      const open_tos_db = [];
      let j = 0;
      while (j < open_tos_bool.length) {
        if (open_tos_bool[j] == true) {
          open_tos_db.push(open_tos[j]);
        }
        j++;
      }
      const url = domain + 'api/my-open-tos/';
      let response = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer' + ' ' + access_token, //accessToken,
        },
        body: JSON.stringify({
          email: email,
          open_tos: open_tos_db,
        }),
      });

      try {
        var json = await response.json();
        if (json) {
          console.log(json);
          setError(null);
          navigation.goBack();
        }
      } catch (issue) {
        console.log(issue);
      }
    }
  };

  //submitting users q&a if they make a change - used in Edit Profile section
  const apiSubmitQA = async ({navigation}) => {
    console.log('******** updating Q&A data via API starting ********');
    const qas = [];
    const answeredQs = [];

    let i = 0;
    while (i < answers.length) {
      if (answers[i].length > 15) {
        answeredQs.push(answers[i]);
      }
      i++;
    }

    if (answeredQs.length < 3) {
      setError(
        'Answer at least 3 questions \n An answer must have at least 15 characters',
      );
    } else {
      setError(null);
      let k = 0;
      while (k < answers.length) {
        if (answers[k].length > 15) {
          qas.push([questions[k], answers[k]]);
        }
        k++;
      }

      let access_token = await isTokenExpired();
      console.log(
        '  *** access_token ***  ' + access_token, //accessToken,
      );
      console.log(
        '************** posting user QA data to API starting **************',
      );
      const url = domain + 'api/my-qas/';
      let response = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer' + ' ' + access_token, //accessToken,
        },
        body: JSON.stringify({
          email: email,
          qas: qas,
        }),
      });

      try {
        var json = await response.json();
        if (json) {
          console.log(json);
          navigation.goBack();
        }
      } catch (issue) {
        console.log(issue);
      }
    }
  };

  //submitting users ethnicity if they make a change - used in Edit Profile section
  const submitProfileCreated = async () => {
    console.log('******** submitProfileCreated ********');
    let access_token = await isTokenExpired();
    console.log(
      '  *** access_token ***  ' + access_token, //accessToken,
    );

    const url = domain + 'api/update-user/' + email + '/';
    let response = await fetch(url, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer' + ' ' + access_token, //accessToken,
      },
      body: JSON.stringify({
        profile_created: true,
      }),
    });

    try {
      var json = await response.json();
      if (json) {
        console.log(json);
      }
    } catch (issue) {
      console.log(issue);
    }
  };

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

  return (
    <LoggedInUserContext.Provider
      value={{
        freePlan,
        setFreePlan,
        submitSubscriptionPlan,
        getSubscriptionPlan,
        sayHiText,
        saidHiCount,
        setSaidHiCount,
        email,
        setEmail,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        error,
        setError,
        profileCreated,
        setProfileCreated,
        accessToken,
        setAccessToken,
        getToken,
        getTokenRefresh,
        refreshToken,
        refreshedToken,
        isTokenExpired,
        loggedIn,
        setLoggedIn,
        id,
        setId,
        firstName,
        setFirstName,
        lastName,
        setLastName,
        gender,
        setGender,
        ethnicity,
        setEthnicity,
        dob,
        setDob,
        getAge,
        age,
        setAge,
        country,
        setCountry,
        city,
        setCity,
        student,
        setStudent,
        university,
        setUniversity,
        course,
        setCourse,
        year,
        setYear,
        role,
        setRole,
        company,
        setCompany,
        avatarId,
        setAvatarId,
        image1Id,
        setImage1Id,
        image2Id,
        setImage2Id,
        interests,
        interests_bool,
        open_tos,
        open_tos_bool,
        music,
        setMusic,
        travelling,
        setTravelling,
        sport,
        setSport,
        gaming,
        setGaming,
        reading,
        setReading,
        business,
        setBusiness,
        investing,
        setInvesting,
        christianity,
        setChristianity,
        islam,
        setIslam,
        hinduism,
        setHinduism,
        sikhism,
        setSikhism,
        judaism,
        setJudaism,
        buddhism,
        setBuddhism,
        meetingPeople,
        setMeetingPeople,
        travelBuddy,
        setTravelBuddy,
        gymBuddy,
        setGymBuddies,
        studyBuddy,
        setStudyBuddies,
        mentoring,
        setMentoring,
        angelInvesting,
        setAngelInvesting,
        cofounding,
        setCofounding,
        clubbing,
        setClubbing,
        brunches,
        setBrunches,
        festivals,
        setFestivals,
        concerts,
        setConcerts,
        gameNight,
        setGameNight,
        entrepreneurial,
        setEntrepreneurial,
        networking,
        setNetworking,
        career,
        setCareer,
        conferences,
        setConferences,
        events,
        events_bool,
        q1,
        q2,
        q3,
        q4,
        q5,
        q6,
        q7,
        answer1,
        setAnswer1,
        answer2,
        setAnswer2,
        answer3,
        setAnswer3,
        answer4,
        setAnswer4,
        answer5,
        setAnswer5,
        answer6,
        setAnswer6,
        answer7,
        setAnswer7,
        filePath1,
        setFilePath1,
        filePath2,
        setFilePath2,
        filePath3,
        setFilePath3,
        image1Loading,
        setImage1Loading,
        image2Loading,
        setImage2Loading,
        image3Loading,
        setImage3Loading,
        image1,
        setImage1,
        image2,
        setImage2,
        image3,
        setImage3,
        questions,
        answers,
        cities,
        roles,
        submitName,
        submitAge,
        submitGender,
        submitEthnicity,
        submitLocation,
        submitJob,
        today,
        getUserData,
        formatDate,
        submitInterests,
        submitOpenTos,
        apiSubmitQA,
        //ws_notifications,
        serverState,
        editProfilePageData,
        loading,
        setLoading,
        get_notif_ids,
        getPhotos,
        submitProfileCreated,
        isVerified,
        setupWebSocket,
        myHis,
        setMyHis,
        onUserConvo,
        setOnUserConvo,
        userProfile,
        setUserProfile,
        setupChatWebSocket,
        isOffline,
        setOfflineStatus,
        chatServerState,
        notifServerState,
      }}>
      {children}
    </LoggedInUserContext.Provider>
  );
};
