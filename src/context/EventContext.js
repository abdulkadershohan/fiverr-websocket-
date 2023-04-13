import React, {useState, createContext, useContext} from 'react';

import * as Keychain from 'react-native-keychain';

//Context
import {AuthContext} from './AuthContext';
import {LoggedInUserContext} from './LoggedInUserContext';
import {NotificationContext} from './NotificationContext';

export const EventContext = createContext();

export const EventProvider = ({children}) => {
  //const {isTokenExpired} = useContext(AuthContext);
  const {email, interests, getAge, dob, open_tos, isTokenExpired} =
    useContext(LoggedInUserContext);
  const {domain} = useContext(NotificationContext);

  const [eventProfile, setEventProfile] = useState('');
  const [events, setEvents] = useState('');
  const [eventsFiltered, setEventsFiltered] = useState('');

  const [attending, setAttending] = useState(false);
  const [interested, setInterested] = useState(false);
  const [attendees, setAttendees] = useState('');
  const [attendeesFiltered, setAttendeesFiltered] = useState('');

  const [genderAttendeesFilter, setGenderAttendeesFilter] = useState('');
  const [ethnicityAttendeesFilter, setEthnicityAttendeesFilter] = useState('');
  const [ageAttendeesFilter, setAgeAttendeesFilter] = useState(getAge(dob));
  const [countryAttendeesFilter, setCountryAttendeesFilter] = useState('');
  const [cityAttendeesFilter, setCityAttendeesFilter] = useState('');

  const [roleAttendeesFilter, setRoleAttendeesFilter] = useState('');
  const [companyAttendeesFilter, setCompanyAttendeesFilter] = useState('');

  var interests_filter_options = [];
  let i = 0;
  while (i < interests.length) {
    interests_filter_options.push({
      id: i + 1,
      interest: interests[i],
      selected: true,
    });
    i++;
    //{id: 1, interest: 'Music', selected: true},
  }
  var open_tos_filter_options = [];
  let j = 0;
  while (j < open_tos.length) {
    open_tos_filter_options.push({
      id: j + 1,
      open_to: open_tos[j],
      selected: true,
    });
    j++;
    //{id: 1, open_to: 'MeetingNewPeople', selected: true},
  }
  //genres_filter_options
  const [genresFilterOptions, setGenresFilterOptions] = useState([
    {id: 1, genre: 'afrobeats', selected: true},
    {id: 2, genre: 'urban', selected: true},
  ]);
  const [selectedGenres, setSelectedGenres] = useState(genresFilterOptions);

  /// Functions for Events below

  //Get either 'Business' or 'Pleasure' event attendees from the DB
  const getAttendees2 = async type => {
    console.log('************** getting Attendees API starting **************');

    isTokenExpired();
    //const url = domain + 'api/my-qas/';
    var api_url = '';
    if (typeof type == 'number') {
      api_url =
        domain +
        'api/events/?type=get-event-attendees&event_id=' +
        type +
        '&email=' +
        email;
    } else {
      api_url =
        domain +
        'api/events/?type=get-' +
        type +
        '-events-attendees&email=' +
        email;
    }
    console.log('api_urlapi_url ->> ' + api_url);
    let response = await fetch(api_url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        //Authorization: 'Bearer' + ' ' + accessCredentials.password,
      },
    });

    try {
      var json = await response.json();
      if (json) {
        console.log(type + 'attendees below**');
        console.log(json);
        setAttendees(json);
        setAttendeesFiltered(json);
      }
    } catch (issue) {
      console.log(issue);
    }
  };

  const getAttendees = async type => {
    console.log('************** getting Attendees API starting **************');

    isTokenExpired();
    var api_url = '';
    if (typeof type == 'number') {
      api_url =
        domain +
        'api/events/?type=get-event-attendees&event_id=' +
        type +
        '&email=' +
        email;
    } else {
      api_url =
        domain +
        'api/events/?type=get-' +
        type +
        '-events-attendees&email=' +
        email;
    }
    console.log('api_urlapi_url ->> ' + api_url);
    return new Promise((resolve, reject) => {
      resolve(
        fetch(api_url, {
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

  /*
  const getEvents = async ({type, user_email}) => {
    console.log(
      '************** getting list of ' +
        type +
        ' ' +
        user_email +
        ' events from API starting **************',
    );
    var api_url = '';
    console.log('typeof user_email ->> ' + user_email);
    if (typeof user_email !== undefined) {
      api_url =
        'http://127.0.0.1:8000/api/events/?type=get-' +
        type +
        '-events&email=' +
        user_email;
    } else {
      api_url =
        'http://127.0.0.1:8000/api/events/?type=get-' + type + '-events';
    }
    console.log('api_urlapi_url ->> ' + api_url);
    isTokenExpired();
    return new Promise((resolve, reject) => {
      resolve(
        fetch(api_url,
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              //Authorization: 'Bearer' + ' ' + accessCredentials.password,
            },
          },
        ),
      );
    });
  };

  */
  const getEvents = async ({type, user_email}) => {
    console.log(
      '************** getting list of ' +
        type +
        ' ' +
        user_email +
        ' events from API starting **************',
    );
    var api_url = '';
    console.log('typeof user_email ->> ' + user_email);
    if (typeof user_email !== undefined) {
      api_url =
        domain + 'api/events/?type=get-' + type + '-events&email=' + user_email;
    } else {
      api_url = domain + 'api/events/?type=get-' + type + '-events';
    }
    console.log('api_urlapi_url ->> ' + api_url);
    isTokenExpired();
    return new Promise((resolve, reject) => {
      resolve(
        fetch(api_url, {
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

  //Get either 'Business' or 'Pleasure' events from the DB
  const getEvents2 = async ({type, user_email}) => {
    console.log(
      '************** getting list of ' +
        type +
        ' events from API starting **************',
    );
    isTokenExpired();
    var api_url = '';
    if (typeof user_email !== undefined) {
      api_url =
        domain + 'api/events/?type=get-' + type + '-events&email=' + user_email;
    } else {
      api_url = domain + 'api/events/?type=get-' + type + '-events';
    }

    console.log('api_urlapi_url ->> ' + api_url);

    let response = await fetch(api_url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        //Authorization: 'Bearer' + ' ' + accessCredentials.password,
      },
    });

    try {
      var json = await response.json();
      if (json) {
        console.log(json);
        setEvents(json);
        console.log('EventData LENGTH -->>> ' + json.length);
        var genres = [];
        let i = 0;
        while (i < json.length) {
          genres = genres.concat(json[i]['genres']);
          console.log('EventData[i] -->>>' + json[i]['genres']);
          i++;
        }
        console.log('GENRESSSS -->>> ' + genres);
        genres = [...new Set(genres)];
        var genresFilterOptions2 = [];
        let j = 0;
        while (j < genres.length) {
          genresFilterOptions2.push({
            id: j + 1,
            genre: genres[j],
            selected: true,
          });
          j++;
        }
        //setGenresFilterOptions(genresFilterOptions2);
        setSelectedGenres(genresFilterOptions2);
        console.log(
          '*** genresFilterOptions -->>> ' +
            JSON.stringify(genresFilterOptions2),
        );
      }
    } catch (issue) {
      console.log(issue);
    }
  };

  // Get the profile data for an event (when you click on an event from list of events)
  const getEventProfileData = async id => {
    console.log(
      '************** getting Event Profile data from API starting **************',
    );
    isTokenExpired();
    var api_url = domain + 'api/events/?type=get-event&event_id=' + id;
    console.log('api_url -->> ' + api_url);
    let response = await fetch(api_url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        //Authorization: 'Bearer' + ' ' + accessCredentials.password,
      },
    });

    try {
      var json = await response.json();
      if (json) {
        console.log('json received');
        setEventProfile(json);
        console.log('**** eventProfile --->>>> ' + eventProfile);
        //JSON.stringify(userDate)
      }
    } catch (issue) {
      console.log(issue);
    }
  };

  //post whether logged in user is 'attending' or 'interested' an event (when user clicks attending/interested)
  const post_event_status = async ({type, event_id}) => {
    console.log(
      '************** posting event status to event API starting **************',
    );
    const url = domain + 'api/events/';
    let response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: type,
        event_id: event_id,
        email: email,
      }),
    });
    if (type == 'attending') {
      try {
        var json = await response.json();
        if (json) {
          console.log('attendingattending' + json);
          //setAttending(true);
          //setInterested(false)
        }
      } catch (issue) {
        console.log(issue);
      }
    } else if (type == 'interested') {
      try {
        var json = await response.json();
        if (json) {
          console.log(json.users);
          //setInterested(true);
          //setAttending(false)
        }
      } catch (issue) {
        console.log(issue);
      }
    }
  };

  //getting whether logged in user is 'attending' or 'interested' in an event
  const get_event_status = async ({type, event_id}) => {
    console.log(
      '******* GETTING WHETHER YOU ' +
        email +
        ' ARE ' +
        type +
        ' event_id ' +
        event_id +
        ' ********',
    );
    const url =
      domain +
      'api/events/?type=' +
      type +
      '&email=' +
      email +
      '&event_id=' +
      event_id;
    console.log(url);
    let response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        //Authorization: 'Bearer' + ' ' + accessCredentials.password,
      },
    });
    if (type == 'attending') {
      try {
        var json = await response.json();
        console.log('AttendingAttending ---> ' + json);
        if (json == 1) {
          setAttending(true);
        } else {
          setAttending(false);
        }
      } catch (issue) {
        console.log(issue);
      }
    } else if (type == 'interested') {
      try {
        var json = await response.json();
        console.log('Interested ---> ' + json);
        if (json == 1) {
          setInterested(true);
        } else {
          setInterested(false);
        }
      } catch (issue) {
        console.log(issue);
      }
    }
  };

  return (
    <EventContext.Provider
      value={{
        attendees,
        setAttendees,
        getAttendees,
        attendeesFiltered,
        setAttendeesFiltered,
        getEvents,
        setEvents,
        events,
        eventsFiltered,
        setEventsFiltered,
        open_tos_filter_options,
        interests_filter_options,
        genresFilterOptions,
        selectedGenres,
        setSelectedGenres,
        getEventProfileData,
        eventProfile,
        post_event_status,
        get_event_status,
        interested,
        setInterested,
        attending,
        setAttending,
        genderAttendeesFilter,
        setGenderAttendeesFilter,
        ethnicityAttendeesFilter,
        setEthnicityAttendeesFilter,
        ageAttendeesFilter,
        setAgeAttendeesFilter,
        countryAttendeesFilter,
        setCountryAttendeesFilter,
        cityAttendeesFilter,
        setCityAttendeesFilter,
        roleAttendeesFilter,
        setRoleAttendeesFilter,
        companyAttendeesFilter,
        setCompanyAttendeesFilter,
      }}>
      {children}
    </EventContext.Provider>
  );
};
