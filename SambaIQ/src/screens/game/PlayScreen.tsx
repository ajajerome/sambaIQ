import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity,
  ScrollView,
  Dimensions 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface PlayScreenProps {
  navigation: any;
}

const PlayScreen: React.FC<PlayScreenProps> = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState('recommended');

  // Mock scenarios data
  const scenarios = {
    recommended: [
      {
        id: 'scenario_1',
        title: 'Ditt Första Mål',
        description: 'Du har bollen framför målet. Visa att du kan göra mål!',
        difficulty: 1,
        xp: 50,
        completedBy: 89,
        ageGroup: '7-9',
        category: 'Grundläggande',
        estimatedTime: 2,
        isCompleted: false
      },
      {
        id: '2', 
        title: 'Hjälp din Kompis',
        description: 'Din lagkamrat är fri. Kan du passa bollen rätt?',
        difficulty: 2,
        xp: 75,
        completedBy: 76,
        ageGroup: '7-9',
        category: 'Lagarbete',
        estimatedTime: 3,
        isCompleted: true
      },
      {
        id: 'scenario_2',
        title: 'Hjälp din Kompis',
        description: 'Din lagkamrat Marcus är helt fri framför mål! Passa bollen till honom.',
        difficulty: 2,
        xp: 75,
        completedBy: 68,
        ageGroup: '7-9',
        category: 'Lagarbete',
        estimatedTime: 3,
        isCompleted: false
      },
      {
        id: 'scenario_3',
        title: 'Smart Försvar',
        description: 'Lär dig rätt defensiv positionering mot anfallare. Var ska du stå?',
        difficulty: 3,
        xp: 100,
        completedBy: 42,
        ageGroup: '10-12',
        category: 'Taktik',
        estimatedTime: 4,
        isCompleted: false
      },
      {
        id: '3',
        title: 'Försvara Målet',
        description: 'Motståndaren anfaller! Stoppa dem från att göra mål.',
        difficulty: 2,
        xp: 75,
        completedBy: 65,
        ageGroup: '7-9', 
        category: 'Försvar',
        estimatedTime: 3,
        isCompleted: false
      }
    ],
    daily: [
      {
        id: 'daily_1',
        title: 'Dagens Utmaning: Perfekt Pass',
        description: 'Gör 5 korrekta passningar för att klara utmaningen!',
        difficulty: 3,
        xp: 100,
        completedBy: 45,
        ageGroup: '10-12',
        category: 'Daglig Utmaning',
        estimatedTime: 5,
        isCompleted: false,
        isDaily: true
      }
    ],
    new: [
      {
        id: '4',
        title: 'Offside Träning',
        description: 'Lär dig när du kan springa och när du måste vänta.',
        difficulty: 3,
        xp: 100,
        completedBy: 23,
        ageGroup: '10-12',
        category: 'Regler',
        estimatedTime: 4,
        isCompleted: false,
        isNew: true
      }
    ]
  };

  const categories = [
    { id: 'recommended', title: 'Rekommenderade', icon: 'star' },
    { id: 'daily', title: 'Dagens', icon: 'calendar' },
    { id: 'new', title: 'Nya', icon: 'sparkles' }
  ];

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty <= 2) return '#00B04F'; // Grön för lätt
    if (difficulty <= 3) return '#FF9500'; // Orange för medel  
    return '#FF3B30'; // Röd för svår
  };

  const getDifficultyText = (difficulty: number) => {
    if (difficulty <= 2) return 'Lätt';
    if (difficulty <= 3) return 'Medel';
    return 'Svår';
  };

  const handlePlayScenario = (scenarioId: string) => {
    navigation.navigate('Game', { scenarioId });
  };

  const renderScenarioCard = (scenario: any) => (
    <TouchableOpacity
      key={scenario.id}
      style={[
        styles.scenarioCard,
        scenario.isCompleted && styles.completedCard
      ]}
      onPress={() => handlePlayScenario(scenario.id)}
    >
      <View style={styles.cardHeader}>
        <View style={styles.cardTitleRow}>
          <Text style={[styles.scenarioTitle, scenario.isCompleted && styles.completedText]}>
            {scenario.title}
          </Text>
          {scenario.isNew && (
            <View style={styles.newBadge}>
              <Text style={styles.newBadgeText}>NYT</Text>
            </View>
          )}
          {scenario.isDaily && (
            <View style={styles.dailyBadge}>
              <Text style={styles.dailyBadgeText}>DAGLIG</Text>
            </View>
          )}
        </View>
        
        <View style={styles.cardMeta}>
          <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(scenario.difficulty) }]}>
            <Text style={styles.difficultyText}>{getDifficultyText(scenario.difficulty)}</Text>
          </View>
          <Text style={styles.categoryText}>{scenario.category}</Text>
        </View>
      </View>

      <Text style={[styles.scenarioDescription, scenario.isCompleted && styles.completedText]}>
        {scenario.description}
      </Text>

      <View style={styles.cardFooter}>
        <View style={styles.cardStats}>
          <View style={styles.statItem}>
            <Ionicons name="trophy" size={16} color="#FFD700" />
            <Text style={styles.statText}>{scenario.xp} XP</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="time" size={16} color="#666" />
            <Text style={styles.statText}>{scenario.estimatedTime} min</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="people" size={16} color="#666" />
            <Text style={styles.statText}>{scenario.completedBy}% klarade</Text>
          </View>
        </View>
        
        <View style={styles.playButton}>
          {scenario.isCompleted ? (
            <Ionicons name="checkmark-circle" size={24} color="#00B04F" />
          ) : (
            <Ionicons name="play-circle" size={24} color="#00B04F" />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#00B04F', '#32CD32']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Välj Scenario</Text>
        <Text style={styles.headerSubtitle}>Vilket vill du träna på idag?</Text>
      </LinearGradient>

      {/* Category Tabs */}
      <View style={styles.categoryContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScrollContent}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryTab,
                selectedCategory === category.id && styles.activeCategoryTab
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              <Ionicons 
                name={category.icon as any} 
                size={20} 
                color={selectedCategory === category.id ? '#fff' : '#666'} 
              />
              <Text style={[
                styles.categoryTabText,
                selectedCategory === category.id && styles.activeCategoryTabText
              ]}>
                {category.title}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Scenarios List */}
      <ScrollView style={styles.scenariosList} showsVerticalScrollIndicator={false}>
        <View style={styles.scenariosContainer}>
          {scenarios[selectedCategory as keyof typeof scenarios]?.map(renderScenarioCard)}
        </View>
        
        {/* Motivational Footer */}
        <View style={styles.motivationFooter}>
          <Text style={styles.motivationIcon}>⚽</Text>
          <Text style={styles.motivationText}>
            "Varje stor spelare började med att lära sig grunderna. Du är på rätt väg!"
          </Text>
          <Text style={styles.motivationAuthor}>- Pep Guardiola</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
    marginTop: 4,
  },
  categoryContainer: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E1E8ED',
  },
  categoryScrollContent: {
    paddingHorizontal: 20,
  },
  categoryTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    backgroundColor: '#F5F5F5',
  },
  activeCategoryTab: {
    backgroundColor: '#00B04F',
  },
  categoryTabText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  activeCategoryTabText: {
    color: '#fff',
  },
  scenariosList: {
    flex: 1,
  },
  scenariosContainer: {
    padding: 20,
  },
  scenarioCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  completedCard: {
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#00B04F',
  },
  cardHeader: {
    marginBottom: 12,
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  scenarioTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    flex: 1,
  },
  completedText: {
    color: '#7F8C8D',
  },
  newBadge: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  newBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  dailyBadge: {
    backgroundColor: '#FF9500',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  dailyBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  cardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 12,
  },
  difficultyText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  categoryText: {
    fontSize: 12,
    color: '#7F8C8D',
  },
  scenarioDescription: {
    fontSize: 14,
    color: '#7F8C8D',
    lineHeight: 20,
    marginBottom: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardStats: {
    flexDirection: 'row',
    flex: 1,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  statText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  playButton: {
    // Play button styles are handled by the icon
  },
  motivationFooter: {
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#fff',
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  motivationIcon: {
    fontSize: 32,
    marginBottom: 12,
  },
  motivationText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#2C3E50',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 8,
  },
  motivationAuthor: {
    fontSize: 14,
    color: '#7F8C8D',
    fontWeight: '600',
  },
});

export default PlayScreen;