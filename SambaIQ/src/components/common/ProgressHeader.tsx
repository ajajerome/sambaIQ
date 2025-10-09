import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { UserProgress, progressionLevels, calculateLevel, getXPToNextLevel } from '../../data/progression';

interface ProgressHeaderProps {
  userProgress: UserProgress;
  onProfilePress?: () => void;
}

const ProgressHeader: React.FC<ProgressHeaderProps> = ({ userProgress, onProfilePress }) => {
  const currentLevel = calculateLevel(userProgress.total_xp);
  const currentLevelData = progressionLevels.find(l => l.level === currentLevel);
  const nextLevelData = progressionLevels.find(l => l.level === currentLevel + 1);
  const xpToNext = getXPToNextLevel(userProgress.total_xp);
  
  const progressPercentage = nextLevelData 
    ? ((userProgress.total_xp - (currentLevelData?.xpRequired || 0)) / 
       (nextLevelData.xpRequired - (currentLevelData?.xpRequired || 0))) * 100
    : 100;

  const getStreakColor = (streak: number) => {
    if (streak >= 30) return '#FFD700'; // Gold
    if (streak >= 14) return '#C0C0C0'; // Silver  
    if (streak >= 7) return '#CD7F32';  // Bronze
    return '#00D4AA'; // Default
  };

  const getStreakIcon = (streak: number) => {
    if (streak >= 30) return '👑';
    if (streak >= 14) return '🔥';
    if (streak >= 7) return '⚡';
    return '📅';
  };

  return (
    <TouchableOpacity onPress={onProfilePress} activeOpacity={0.9}>
      <LinearGradient
        colors={['#1a1a1a', '#2d2d2d']}
        style={styles.container}
      >
        {/* Top Row - Level & Streak */}
        <View style={styles.topRow}>
          <View style={styles.levelContainer}>
            <Text style={styles.levelNumber}>{currentLevel}</Text>
            <Text style={styles.levelTitle}>{currentLevelData?.title || 'Rookie'}</Text>
          </View>
          
          <View style={styles.streakContainer}>
            <Text style={styles.streakIcon}>{getStreakIcon(userProgress.daily_streak.current_streak)}</Text>
            <View>
              <Text style={[styles.streakNumber, { color: getStreakColor(userProgress.daily_streak.current_streak) }]}>
                {userProgress.daily_streak.current_streak}
              </Text>
              <Text style={styles.streakLabel}>Day Streak</Text>
            </View>
          </View>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressSection}>
          <View style={styles.progressInfo}>
            <Text style={styles.xpText}>{userProgress.total_xp.toLocaleString()} XP</Text>
            {nextLevelData && (
              <Text style={styles.xpToNext}>
                {xpToNext.toLocaleString()} to {nextLevelData.title}
              </Text>
            )}
          </View>
          
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBarBackground}>
              <Animated.View 
                style={[
                  styles.progressBarFill,
                  { width: `${Math.min(progressPercentage, 100)}%` }
                ]}
              />
            </View>
            <Text style={styles.progressPercentage}>{Math.round(progressPercentage)}%</Text>
          </View>
        </View>

        {/* Bottom Row - Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Ionicons name="trophy" size={16} color="#FFD700" />
            <Text style={styles.statNumber}>{userProgress.badges_earned.length}</Text>
            <Text style={styles.statLabel}>Badges</Text>
          </View>
          
          <View style={styles.statItem}>
            <Ionicons name="checkmark-circle" size={16} color="#00D4AA" />
            <Text style={styles.statNumber}>{userProgress.scenarios_mastered.length}</Text>
            <Text style={styles.statLabel}>Mastered</Text>
          </View>
          
          <View style={styles.statItem}>
            <Ionicons name="people" size={16} color="#007AFF" />
            <Text style={styles.statNumber}>{userProgress.leaderboard_position || '-'}</Text>
            <Text style={styles.statLabel}>Rank</Text>
          </View>
          
          <View style={styles.statItem}>
            <Ionicons name="analytics" size={16} color="#FF6B35" />
            <Text style={styles.statNumber}>{userProgress.tactical_iq.overall}</Text>
            <Text style={styles.statLabel}>Tactical IQ</Text>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
    padding: 20,
    borderRadius: 16,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  levelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  levelNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#00D4AA',
    marginRight: 12,
  },
  levelTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    maxWidth: 150,
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  streakIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  streakNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  streakLabel: {
    fontSize: 12,
    color: '#CCCCCC',
  },
  progressSection: {
    marginBottom: 16,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  xpText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  xpToNext: {
    fontSize: 14,
    color: '#CCCCCC',
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBarBackground: {
    flex: 1,
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 4,
    marginRight: 12,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#00D4AA',
    borderRadius: 4,
  },
  progressPercentage: {
    fontSize: 12,
    fontWeight: '600',
    color: '#00D4AA',
    minWidth: 35,
    textAlign: 'right',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    minWidth: 60,
  },
  statNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 4,
  },
  statLabel: {
    fontSize: 11,
    color: '#CCCCCC',
    marginTop: 2,
  },
});

export default ProgressHeader;