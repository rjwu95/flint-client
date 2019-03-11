import React from 'react';
import { Provider } from 'react-redux';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { Font, Notifications } from 'expo';
import { AsyncStorage, ActivityIndicator } from 'react-native';
import socketio from 'socket.io-client';
import Home from './src/screens/Home';
import Referee from './src/screens/Referee';
import Dashboard from './src/screens/Dashboard';
import History from './src/screens/History';
import UserInfo from './src/screens/UserInfo';
import sendRequest from './src/modules/sendRequest';
import registerForPushNotificationsAsync from './src/modules/registerForPushNotificationsAsync';
import store from './store';

const io = socketio('http://13.209.19.196:3000');

const isChallenge = async () => {
  const user = JSON.parse(await AsyncStorage.getItem('userInfo'));
  if (!user) return false;
  const { data } = await sendRequest('get', `/api/challenges/getInProgressChallenges/${user.id}`);
  if (data.challenges.length) return true;
  return false;
};

const Root1 = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarLable: 'HOME',
        tabBarIcon: ({ tintColor }) => <Icon name="ios-home" color={tintColor} size={24} />,
      },
    },
    Referee: {
      screen: Referee,
      navigationOptions: {
        tabBarLable: 'Referee',
        tabBarIcon: ({ tintColor }) => <Icon name="ios-megaphone" color={tintColor} size={24} />,
      },
    },
    Dashboard: {
      screen: Dashboard,
      navigationOptions: {
        tabBarLable: 'Dashboard',
        tabBarIcon: ({ tintColor }) => <Icon name="ios-bicycle" color={tintColor} size={24} />,
      },
    },
    History: {
      screen: History,
      navigationOptions: {
        tabBarLable: 'History',
        tabBarIcon: ({ tintColor }) => <Icon name="ios-ribbon" color={tintColor} size={24} />,
      },
    },
    MyPage: {
      screen: UserInfo,
      navigationOptions: {
        tabBarLable: 'UserInfo',
        tabBarIcon: ({ tintColor }) => <Icon name="ios-person" color={tintColor} size={24} />,
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: 'black',
      inactiveTintColor: 'gray',
      style: {
        backgroundColor: 'white',
        borderTopWidth: 0,
        shadowOffset: { width: 5, height: 3 },
        shadowColor: 'black',
        shadowOpacity: 0.5,
        elevation: 5,
      },
    },
    initialRouteName: 'Home',
  },
);

const Root2 = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarLable: 'HOME',
        tabBarIcon: ({ tintColor }) => <Icon name="ios-home" color={tintColor} size={24} />,
      },
    },
    Referee: {
      screen: Referee,
      navigationOptions: {
        tabBarLable: 'Referee',
        tabBarIcon: ({ tintColor }) => <Icon name="ios-megaphone" color={tintColor} size={24} />,
      },
    },
    Dashboard: {
      screen: Dashboard,
      navigationOptions: {
        tabBarLable: 'Dashboard',
        tabBarIcon: ({ tintColor }) => <Icon name="ios-bicycle" color={tintColor} size={24} />,
      },
    },
    History: {
      screen: History,
      navigationOptions: {
        tabBarLable: 'History',
        tabBarIcon: ({ tintColor }) => <Icon name="ios-ribbon" color={tintColor} size={24} />,
      },
    },
    MyPage: {
      screen: UserInfo,
      navigationOptions: {
        tabBarLable: 'UserInfo',
        tabBarIcon: ({ tintColor }) => <Icon name="ios-person" color={tintColor} size={24} />,
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: 'black',
      inactiveTintColor: 'gray',
      style: {
        backgroundColor: 'white',
        borderTopWidth: 0,
        shadowOffset: { width: 5, height: 3 },
        shadowColor: 'black',
        shadowOpacity: 0.5,
        elevation: 5,
      },
    },
    initialRouteName: 'Dashboard',
  },
);

const AppContainer1 = createAppContainer(Root1);
const AppContainer2 = createAppContainer(Root2);
const Fontrust = require('./assets/fonts/Fontrust.ttf');

class App extends React.Component {
  state = {
    isLoaded: false,
    isHome: true,
    notification: {},
  };

  async componentDidMount() {
    // 저장된 유저정보가 바뀔 때마다 새로 받아야 하는데 아직 그러지 못하고 있음.
    // 앱이 꺼지면 유지 못하고 있음
    const user = JSON.parse(await AsyncStorage.getItem('userInfo'));
    this.notificationSubscription = Notifications.addListener(this.handleNotification);
    registerForPushNotificationsAsync(); // 앱시작했을 때 허락요청
    if (user !== null) {
      io.on(user.id, async () => {
        registerForPushNotificationsAsync();
      });
    }
    await Font.loadAsync({
      Fontrust,
    });
    const isHome = !(await isChallenge());

    this.setState({ isLoaded: true, isHome });
  }

  handleNotification = notification => {
    this.setState({ notification });
  };

  render() {
    const { isLoaded, isHome } = this.state;
    if (isLoaded) {
      return (
        <Provider store={store}>
          { isHome ? <AppContainer1 /> : <AppContainer2 />}
        </Provider>
      );
    }
    return (
      <ActivityIndicator />
    );
  }
}
export default App;
