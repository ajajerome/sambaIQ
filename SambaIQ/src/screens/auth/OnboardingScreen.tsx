import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Dimensions, 
  TouchableOpacity,
  ImageBackground,
  Animated,
  ScrollView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { footballRegions, FootballRegion } from '../../data/regions';

const { width, height } = Dimensions.get('window');

interface OnboardingScreenProps {
  navigation: any;
}

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ navigation }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAge, setSelectedAge] = useState<number | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
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
      title: 'Vilken fotbollskultur inspirerar dig? 🌍',
      subtitle: 'Olika länder, olika filosofier',
      description: 'Välj den approach som passar dig bäst',
      component: 'region'
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
      if (selectedRegion) {
        await AsyncStorage.setItem('user_region', selectedRegion);
        
        // Spara kulturella inställningar
        const region = footballRegions.find(r => r.id === selectedRegion);
        if (region) {
          const culturalSettings = {
            region_id: selectedRegion,
            specialization_approach: region.ageApproach.specialization,
            position_focus_age: region.ageApproach.positionAge
          };
          await AsyncStorage.setItem('cultural_settings', JSON.stringify(culturalSettings));
        }
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
      case 3: return selectedRegion !== null;
      case 4: return true;
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

  const renderRegionSelection = () => (
    <View style={styles.contentContainer}>
      <Text style={styles.title}>{onboardingSteps[currentStep].title}</Text>
      <Text style={styles.description}>{onboardingSteps[currentStep].description}</Text>
      
      <ScrollView 
        style={styles.regionScrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.regionContainer}
      >
        {footballRegions.map((region) => (
          <TouchableOpacity
            key={region.id}
            style={[
              styles.regionOption,
              selectedRegion === region.id && styles.selectedRegionOption,
              { borderColor: region.colors.primary }
            ]}
            onPress={() => setSelectedRegion(region.id)}
          >
            <View style={styles.regionHeader}>
              <Text style={styles.regionFlag}>{region.flag}</Text>
              <View style={styles.regionInfo}>
                <Text style={[
                  styles.regionName,
                  selectedRegion === region.id && styles.selectedRegionText
                ]}>
                  {region.name}
                </Text>
                <Text style={styles.regionShort}>{region.shortName}</Text>
              </View>
              {selectedRegion === region.id && (
                <Ionicons name="checkmark-circle" size={24} color={region.colors.primary} />
              )}
            </View>
            
            <Text style={styles.regionPhilosophy}>
              {region.philosophy}
            </Text>
            
            <View style={styles.regionDetails}>
              <Text style={styles.regionAge}>
                🎯 Positioner från: {region.ageApproach.positionAge} år
              </Text>
              <Text style={styles.regionFocus}>
                ⚽ Fokus: {region.ageApproach.earlyFocus}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderReady = () => (
    <View style={styles.contentContainer}>
      <Text style={styles.welcomeEmoji}>🎉</Text>
      <Text style={styles.title}>{onboardingSteps[currentStep].title}</Text>
      <Text style={styles.description}>
        Perfekt! Du är {selectedAge} år, spelar {positions.find(p => p.id === selectedPosition)?.label.toLowerCase()}, och följer {footballRegions.find(r => r.id === selectedRegion)?.shortName} fotbollsfilosofi.
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
      case 'region': return renderRegionSelection();
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
  
  // Region Selection Styles
  regionScrollView: {
    flex: 1,
    width: '100%',
  },
  regionContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  regionOption: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 15,
    marginVertical: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedRegionOption: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderWidth: 3,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  regionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  regionFlag: {
    fontSize: 28,
    marginRight: 12,
  },
  regionInfo: {
    flex: 1,
  },
  regionName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  selectedRegionText: {
    color: '#007AFF',
  },
  regionShort: {
    fontSize: 14,
    color: '#7F8C8D',
    fontStyle: 'italic',
  },
  regionPhilosophy: {
    fontSize: 14,
    color: '#34495E',
    lineHeight: 20,
    marginBottom: 10,
    fontWeight: '500',
  },
  regionDetails: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(52, 73, 94, 0.1)',
    paddingTop: 10,
  },
  regionAge: {
    fontSize: 12,
    color: '#7F8C8D',
    marginBottom: 2,
  },
  regionFocus: {
    fontSize: 12,
    color: '#7F8C8D',
  },
});

export default OnboardingScreen;