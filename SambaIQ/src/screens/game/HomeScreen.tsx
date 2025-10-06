import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Dimensions, 
  TouchableOpacity,
  SafeAreaView,
  ScrollView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import ProgressHeader from '../../components/common/ProgressHeader';
import LevelUpModal from '../../components/common/LevelUpModal';
import { UserProgress } from '../../data/progression';
import PremiumTheme from '../../styles/PremiumTheme';

const { width, height } = Dimensions.get('window');

interface HomeScreenProps {
  navigation: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  // Mock user progress - In real app, this would come from AsyncStorage/Supabase
  const [userProgress, setUserProgress] = useState<UserProgress>({
    total_xp: 1250,
    current_level: 5,
    daily_streak: {
      current_streak: 12,
      longest_streak: 25,
      last_activity: new Date().toISOString(),
      streak_rewards: []
    },
    tactical_iq: {
      positioning: 78,
      passing: 82,
      defending: 75,
      attacking: 70,
      overall: 76
    },
    badges_earned: [
      { id: 'first_goal', name: 'First Goal', description: '', icon: '⚽', rarity: 'bronze', category: 'achievement', requirement: '' },
      { id: 'week_warrior', name: 'Week Warrior', description: '', icon: '🔥', rarity: 'silver', category: 'achievement', requirement: '' },
    ],
    scenarios_mastered: ['scenario_1', 'scenario_2'],
    quotes_collected: ['maldini_defense', 'xavi_passing'],
    friends_count: 8,
    leaderboard_position: 47
  });

  const [showLevelUp, setShowLevelUp] = useState(false);
  const [levelUpData, setLevelUpData] = useState({
    newLevel: 5,
    newTitle: 'Squad Regular',
    xpGained: 100,
    badgeEarned: {
      name: 'Squad Regular',
      icon: '👕',
      rarity: 'silver'
    },
    unlockedContent: ['Leadership Scenarios', 'Captain Decisions']
  });

  const [dailyChallenge, setDailyChallenge] = useState({
    title: "Perfekt Pass",
    description: "Gör 5 korrekta passnningar idag",
    progress: 3,
    total: 5,
    reward: "50 XP + Badge"
  });

  const quickActions = [
    {
      id: 'continue',
      title: 'Fortsätt Lära',
      subtitle: 'Nästa scenario väntar',
      icon: 'play-circle',
      color: '#00B04F',
      action: () => navigation.navigate('Play')
    },
    {
      id: 'daily',
      title: 'Dagens Utmaning',
      subtitle: dailyChallenge.title,
      icon: 'calendar',
      color: '#FF6B35',
      action: () => navigation.navigate('Play', { type: 'daily' })
    },
    {
      id: 'friends',
      title: 'Utmana Vänner',
      subtitle: 'Se vem som är bäst',
      icon: 'people',
      color: '#9B59B6',
      action: () => navigation.navigate('Friends')
    },
    {
      id: 'test_levelup',
      title: '🎉 Test Level Up',
      subtitle: 'Se level up animation',
      icon: 'star',
      color: '#FFD700',
      action: () => setShowLevelUp(true)
    }
  ];

  const recentAchievements = [
    { id: 1, name: "Streak Master", icon: "🔥", description: "7 dagar i rad" },
    { id: 2, name: "Pass Expert", icon: "⚡", description: "10 perfekta pass" },
    { id: 3, name: "Goal Scorer", icon: "⚽", description: "Första målet" }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Progress Header - Duolingo Style */}
        <ProgressHeader 
          userProgress={userProgress}
          onProfilePress={() => navigation.navigate('Profile')}
        />

        {/* Level Up Modal */}
        <LevelUpModal
          visible={showLevelUp}
          onClose={() => setShowLevelUp(false)}
          newLevel={levelUpData.newLevel}
          newTitle={levelUpData.newTitle}
          xpGained={levelUpData.xpGained}
          badgeEarned={levelUpData.badgeEarned}
          unlockedContent={levelUpData.unlockedContent}
        />
        {/* Header */}
        <LinearGradient
          colors={PremiumTheme.gradients.card}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.greeting}>Hej Champion! 👋</Text>
              <Text style={styles.motivationText}>Redo för dagens fotbollsträning?</Text>
            </View>
            <TouchableOpacity style={styles.profileButton}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>⚽</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Stats Bar */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>Nivå {userProgress.current_level}</Text>
              <Text style={styles.statLabel}>Din nivå</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{userProgress.total_xp} XP</Text>
              <Text style={styles.statLabel}>Total XP</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{userProgress.daily_streak.current_streak} 🔥</Text>
              <Text style={styles.statLabel}>Dagars streak</Text>
            </View>
          </View>

          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <Text style={styles.progressLabel}>Framsteg till nivå {userProgress.current_level + 1}</Text>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${Math.min((userProgress.total_xp % 1000) / 1000 * 100, 100)}%` }
                ]} 
              />
            </View>
          </View>
        </LinearGradient>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Snabbval</Text>
          {quickActions.map((action) => (
            <TouchableOpacity
              key={action.id}
              style={styles.actionCard}
              onPress={action.action}
            >
              <View style={[styles.actionIcon, { backgroundColor: action.color }]}>
                <Ionicons name={action.icon as any} size={24} color="#fff" />
              </View>
              <View style={styles.actionContent}>
                <Text style={styles.actionTitle}>{action.title}</Text>
                <Text style={styles.actionSubtitle}>{action.subtitle}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Daily Challenge */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dagens Utmaning</Text>
          <View style={styles.challengeCard}>
            <View style={styles.challengeHeader}>
              <View style={styles.challengeIcon}>
                <Text style={styles.challengeEmoji}>🎯</Text>
              </View>
              <View style={styles.challengeInfo}>
                <Text style={styles.challengeTitle}>{dailyChallenge.title}</Text>
                <Text style={styles.challengeDescription}>{dailyChallenge.description}</Text>
              </View>
            </View>
            
            <View style={styles.challengeProgress}>
              <View style={styles.challengeProgressBar}>
                <View 
                  style={[
                    styles.challengeProgressFill,
                    { width: `${(dailyChallenge.progress / dailyChallenge.total) * 100}%` }
                  ]}
                />
              </View>
              <Text style={styles.challengeProgressText}>
                {dailyChallenge.progress}/{dailyChallenge.total}
              </Text>
            </View>
            
            <View style={styles.challengeReward}>
              <Text style={styles.challengeRewardText}>Belöning: {dailyChallenge.reward}</Text>
            </View>
          </View>
        </View>

        {/* Recent Achievements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Senaste Prestationer</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {recentAchievements.map((achievement) => (
              <View key={achievement.id} style={styles.achievementCard}>
                <Text style={styles.achievementIcon}>{achievement.icon}</Text>
                <Text style={styles.achievementName}>{achievement.name}</Text>
                <Text style={styles.achievementDescription}>{achievement.description}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Inspiring Quote */}
        <View style={styles.section}>
          <View style={styles.quoteCard}>
            <Text style={styles.quoteIcon}>💭</Text>
            <Text style={styles.quote}>
              "Fotboll spelas med hjärnan. Dina ben är bara verktyg för att genomföra det hjärnan tänkt ut."
            </Text>
            <Text style={styles.quoteAuthor}>- Johan Cruyff</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PremiumTheme.background,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  motivationText: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
    marginTop: 4,
  },
  profileButton: {
    // Profile button styles
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  statLabel: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.8,
    marginTop: 4,
  },
  progressContainer: {
    // Progress container styles
  },
  progressLabel: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#fff',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 16,
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
  },
  actionSubtitle: {
    fontSize: 14,
    color: '#7F8C8D',
    marginTop: 2,
  },
  challengeCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  challengeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  challengeIcon: {
    marginRight: 12,
  },
  challengeEmoji: {
    fontSize: 32,
  },
  challengeInfo: {
    flex: 1,
  },
  challengeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  challengeDescription: {
    fontSize: 14,
    color: '#7F8C8D',
    marginTop: 4,
  },
  challengeProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  challengeProgressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#ECF0F1',
    borderRadius: 4,
    overflow: 'hidden',
    marginRight: 12,
  },
  challengeProgressFill: {
    height: '100%',
    backgroundColor: '#00B04F',
  },
  challengeProgressText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C3E50',
  },
  challengeReward: {
    backgroundColor: '#E8F5E8',
    padding: 8,
    borderRadius: 6,
  },
  challengeRewardText: {
    fontSize: 12,
    color: '#00B04F',
    fontWeight: '600',
    textAlign: 'center',
  },
  achievementCard: {
    backgroundColor: '#fff',
    width: 120,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginRight: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  achievementIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  achievementName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 10,
    color: '#7F8C8D',
    textAlign: 'center',
  },
  quoteCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  quoteIcon: {
    fontSize: 32,
    marginBottom: 12,
  },
  quote: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#2C3E50',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 12,
  },
  quoteAuthor: {
    fontSize: 14,
    color: '#7F8C8D',
    fontWeight: '600',
  },
});

export default HomeScreen;