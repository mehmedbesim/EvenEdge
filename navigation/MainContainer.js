import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import HistoryScreen from './screens/HistoryScreen';

const homeName = 'Home';
const searchName = 'Search';
const historyName = 'History';

const Tab = createBottomTabNavigator();

const MainContainer = ({navigation}) => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({route}) => ({
          headerShown: false,
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? 'home' : 'home-outline';
            } else if (rn === searchName) {
              iconName = focused ? 'search' : 'search-outline';
            } else if (rn === historyName) {
              iconName = focused ? 'chatbox' : 'chatbox-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarStyle: {
            backgroundColor: '#EFEFF4',
          },
        })}>
        <Tab.Screen name={homeName} component={HomeScreen} />
        <Tab.Screen name={searchName} component={SearchScreen} />
        <Tab.Screen name={historyName} component={HistoryScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default MainContainer;
