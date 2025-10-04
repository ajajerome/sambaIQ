import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Screens
import OnboardingScreen from '../screens/auth/OnboardingScreen';
import HomeScreen from '../screens/game/HomeScreen';
import PlayScreen from '../screens/game/PlayScreen';
import GameScreen from '../screens/game/GameScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import FriendsScreen from '../screens/social/FriendsScreen';
import LeaderboardScreen from '../screens/social/LeaderboardScreen';

import { RootStackParamList, MainTabParamList, PlayStackParamList } from '../types';

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();
const PlayStack = createStackNavigator<PlayStackParamList>();

// Play Stack Navigator
function PlayStackNavigator() {
  return (
    <PlayStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#00B04F', // Football green
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <PlayStack.Screen 
        name="Scenarios" 
        component={PlayScreen}
        options={{ title: 'Välj Scenario' }}
      />
      <PlayStack.Screen 
        name="Game" 
        component={GameScreen}
        options={{ title: 'Spela' }}
      />
    </PlayStack.Navigator>
  );
}

// Main Tab Navigator
function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Play') {
            iconName = focused ? 'football' : 'football-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Friends') {
            iconName = focused ? 'people' : 'people-outline';
          } else {
            iconName = 'home-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#00B04F',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#e0e0e0',
        },
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ title: 'Hem' }}
      />
      <Tab.Screen 
        name="Play" 
        component={PlayStackNavigator}
        options={{ title: 'Spela' }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{ title: 'Profil' }}
      />
      <Tab.Screen 
        name="Friends" 
        component={FriendsScreen}
        options={{ title: 'Vänner' }}
      />
    </Tab.Navigator>
  );
}

// Root Navigator
export default function AppNavigator() {
  const [isOnboarded, setIsOnboarded] = React.useState(true); // Will check from AsyncStorage

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isOnboarded ? (
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        ) : (
          <Stack.Screen name="Main" component={MainTabNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}