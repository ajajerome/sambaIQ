import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Dimensions, 
  TouchableOpacity,
  ImageBackground,
  Animated
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

interface OnboardingScreenProps {
  navigation: any;
}

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ navigation }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAge, setSelectedAge] = useState<number | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);
  const [playerName, setPlayerName] = useState('');

  const fadeAnim = new Animated.Value(1);

  const onboardingSteps = [
    {
      title: 'Välkommen till SambaIQ! ⚽',
      subtitle: 'Duolingo för fotboll',
      description: 'Lär dig fotbollstaktik genom roliga, interaktiva scenarier!',
      component: 'welcome'
    },
    {
      title: 'Hur gammal är du? 🎂',
      subtitle: 'Vi anpassar svårighetsgraden',
      description: 'Välj din ålder så vi kan ge dig perfekta utmaningar',
      component: 'age'
    },
    {
      title: 'Vilken position gillar du? ⚽',
      subtitle: 'Välj din favoritposition',
      description: 'Vi skapar scenarier baserade på din position',
      component: 'position'
    },
    {
      title: 'Dags att börja! 🚀',
      subtitle: 'Din fotbollsresa startar nu',
      description: 'Klart att spela ditt första scenario?',
      component: 'ready'
    }
  ];

  const ageGroups = [
    { range: '7-9', label: '7-9 år', value: 8 },
    { range: '10-12', label: '10-12 år', value: 11 },
    { range: '13-16', label: '13-16 år', value: 14 }
  ];

  const positions = [
    { id: 'goalkeeper', label: 'Målvakt', icon: '🥅' },
    { id: 'defender', label: 'Försvarare', icon: '🛡️' },
    { id: 'midfielder', label: 'Mittfältare', icon: '⚡' },
    { id: 'forward', label: 'Anfallare', icon: '🎯' }
  ];

  const nextStep = async () => {
    if (currentStep === onboardingSteps.length - 1) {
      // Save onboarding completion and user preferences
      await AsyncStorage.setItem('onboarding_completed', 'true');
      if (selectedAge) {
        await AsyncStorage.setItem('user_age', selectedAge.toString());
      }
      if (selectedPosition) {
        await AsyncStorage.setItem('user_position', selectedPosition);
      }
      
      // Navigate to main app
      navigation.replace('Main');
    } else {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        })
      ]).start();
      
      setCurrentStep(currentStep + 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0: return true;
      case 1: return selectedAge !== null;
      case 2: return selectedPosition !== null;
      case 3: return true;
      default: return false;
    }
  };

  const renderWelcome = () => (
    <View style={styles.contentContainer}>
      <Text style={styles.welcomeEmoji}>⚽🏆⚽</Text>
      <Text style={styles.title}>{onboardingSteps[currentStep].title}</Text>
      <Text style={styles.subtitle}>{onboardingSteps[currentStep].subtitle}</Text>
      <Text style={styles.description}>{onboardingSteps[currentStep].description}</Text>
      
      <View style={styles.featuresContainer}>
        <View style={styles.feature}>
          <Ionicons name="game-controller" size={24} color="#00B04F" />
          <Text style={styles.featureText}>Interaktiva scenarier</Text>
        </View>
        <View style={styles.feature}>
          <Ionicons name="trophy" size={24} color="#FFD700" />
          <Text style={styles.featureText}>Badges & nivåer</Text>
        </View>
        <View style={styles.feature}>
          <Ionicons name="people" size={24} color="#FF6B35" />
          <Text style={styles.featureText}>Spela med vänner</Text>
        </View>
      </View>
    </View>
  );

  const renderAgeSelection = () => (
    <View style={styles.contentContainer}>
      <Text style={styles.title}>{onboardingSteps[currentStep].title}</Text>
      <Text style={styles.description}>{onboardingSteps[currentStep].description}</Text>
      
      <View style={styles.ageContainer}>
        {ageGroups.map((group) => (
          <TouchableOpacity
            key={group.range}
            style={[
              styles.ageOption,
              selectedAge === group.value && styles.selectedOption
            ]}
            onPress={() => setSelectedAge(group.value)}
          >
            <Text style={[
              styles.ageText,
              selectedAge === group.value && styles.selectedText
            ]}>
              {group.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderPositionSelection = () => (
    <View style={styles.contentContainer}>
      <Text style={styles.title}>{onboardingSteps[currentStep].title}</Text>
      <Text style={styles.description}>{onboardingSteps[currentStep].description}</Text>
      
      <View style={styles.positionContainer}>
        {positions.map((position) => (
          <TouchableOpacity
            key={position.id}
            style={[
              styles.positionOption,
              selectedPosition === position.id && styles.selectedOption
            ]}
            onPress={() => setSelectedPosition(position.id)}
          >
            <Text style={styles.positionIcon}>{position.icon}</Text>
            <Text style={[
              styles.positionText,
              selectedPosition === position.id && styles.selectedText
            ]}>
              {position.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderReady = () => (
    <View style={styles.contentContainer}>
      <Text style={styles.welcomeEmoji}>🎉</Text>
      <Text style={styles.title}>{onboardingSteps[currentStep].title}</Text>
      <Text style={styles.description}>
        Perfekt! Du är {selectedAge} år och gillar att spela som {positions.find(p => p.id === selectedPosition)?.label.toLowerCase()}.
      </Text>
      <Text style={styles.description}>
        {onboardingSteps[currentStep].description}
      </Text>
    </View>
  );

  const renderCurrentStep = () => {
    switch (onboardingSteps[currentStep].component) {
      case 'welcome': return renderWelcome();
      case 'age': return renderAgeSelection();
      case 'position': return renderPositionSelection();
      case 'ready': return renderReady();
      default: return renderWelcome();
    }
  };

  return (
    <LinearGradient
      colors={['#00B04F', '#32CD32', '#90EE90']}
      style={styles.container}
    >
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        {renderCurrentStep()}
        
        <View style={styles.bottomContainer}>
          <View style={styles.progressContainer}>
            {onboardingSteps.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.progressDot,
                  index === currentStep && styles.activeDot
                ]}
              />
            ))}
          </View>
          
          <TouchableOpacity
            style={[
              styles.nextButton,
              !canProceed() && styles.disabledButton
            ]}
            onPress={nextStep}
            disabled={!canProceed()}
          >
            <Text style={styles.nextButtonText}>
              {currentStep === onboardingSteps.length - 1 ? 'Börja spela!' : 'Nästa'}
            </Text>
            <Ionicons 
              name="arrow-forward" 
              size={24} 
              color="#fff" 
              style={styles.nextIcon}
            />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeEmoji: {
    fontSize: 48,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
    opacity: 0.9,
  },
  description: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
    opacity: 0.8,
    lineHeight: 24,
  },
  featuresContainer: {
    marginTop: 20,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
    width: width * 0.7,
  },
  featureText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
    fontWeight: '500',
  },
  ageContainer: {
    marginTop: 20,
  },
  ageOption: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    width: width * 0.6,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedOption: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderColor: '#fff',
  },
  ageText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  selectedText: {
    color: '#fff',
  },
  positionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
  },
  positionOption: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 20,
    borderRadius: 15,
    margin: 10,
    width: (width - 80) / 2,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  positionIcon: {
    fontSize: 32,
    marginBottom: 10,
  },
  positionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  bottomContainer: {
    paddingBottom: 40,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  progressDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#fff',
  },
  nextButton: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
    borderRadius: 25,
    marginHorizontal: 20,
  },
  disabledButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  nextButtonText: {
    color: '#00B04F',
    fontSize: 18,
    fontWeight: 'bold',
  },
  nextIcon: {
    marginLeft: 10,
    color: '#00B04F',
  },
});

export default OnboardingScreen;