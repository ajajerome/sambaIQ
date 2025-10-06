import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Screens
import OnboardingScreen from '../screens/auth/OnboardingScreen';
import HomeScreen from '../screens/game/HomeScreen';
import PlayScreen from '../screens/game/PlayScreen';
import GameScreen from '../screens/game/GameScreen';
import DrawingGameScreen from '../components/common/DrawingGameScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import FriendsScreen from '../screens/social/FriendsScreen';
import LeaderboardScreen from '../screens/social/LeaderboardScreen';

import { RootStackParamList, MainTabParamList, PlayStackParamList } from '../types';
import { PremiumTheme } from '../styles/PremiumTheme';

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();
const PlayStack = createStackNavigator<PlayStackParamList>();

// Play Stack Navigator
function PlayStackNavigator() {
  return (
    <PlayStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: PremiumTheme.surface,
        },
        headerTintColor: PremiumTheme.text.primary,
        headerTitleStyle: {
          fontWeight: 'bold',
          color: PremiumTheme.accent,
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
        options={{ title: 'Spela (Joystick)' }}
      />
      <PlayStack.Screen 
        name="DrawingGame" 
        component={DrawingGameScreen}
        options={{ title: 'Spela (Rita)' }}
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
          let emoji: string;

          if (route.name === 'Home') {
            emoji = focused ? '🏠' : '🏡';
          } else if (route.name === 'Play') {
            emoji = focused ? '⚽' : '🏈';
          } else if (route.name === 'Profile') {
            emoji = focused ? '👤' : '👥';
          } else if (route.name === 'Friends') {
            emoji = focused ? '👥' : '👫';
          } else {
            emoji = '🏠';
          }

          return <Text style={{ fontSize: size * 0.8, color }}>{emoji}</Text>;
        },
        tabBarActiveTintColor: PremiumTheme.accent,
        tabBarInactiveTintColor: PremiumTheme.text.tertiary,
        tabBarStyle: {
          backgroundColor: PremiumTheme.surface,
          borderTopWidth: 1,
          borderTopColor: PremiumTheme.ui.cardBorder,
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
  const [isOnboarded, setIsOnboarded] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    const checkOnboarding = async () => {
      try {
        const onboardingCompleted = await AsyncStorage.getItem('onboarding_completed');
        setIsOnboarded(onboardingCompleted === 'true');
      } catch (error) {
        console.log('Error checking onboarding status:', error);
        setIsOnboarded(false); // Default to showing onboarding
      }
    };

    checkOnboarding();
  }, []);

  // Show loading while checking onboarding status
  if (isOnboarded === null) {
    return null; // Or a loading screen
  }

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