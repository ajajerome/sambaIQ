import React, { useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  TouchableOpacity, 
  Animated,
  Dimensions 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

const { width, height } = Dimensions.get('window');

interface LevelUpModalProps {
  visible: boolean;
  onClose: () => void;
  newLevel: number;
  newTitle: string;
  xpGained: number;
  badgeEarned?: {
    name: string;
    icon: string;
    rarity: string;
  };
  unlockedContent?: string[];
}

const LevelUpModal: React.FC<LevelUpModalProps> = ({
  visible,
  onClose,
  newLevel,
  newTitle,
  xpGained,
  badgeEarned,
  unlockedContent = []
}) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const confettiAnim = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    if (visible) {
      // Haptic feedback
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      
      // Entrance animation
      Animated.sequence([
        Animated.parallel([
          Animated.spring(scaleAnim, {
            toValue: 1,
            tension: 50,
            friction: 8,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
        ]),
        // Confetti animation
        Animated.timing(confettiAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        })
      ]).start();
    } else {
      // Reset animations
      scaleAnim.setValue(0);
      fadeAnim.setValue(0);
      confettiAnim.setValue(0);
    }
  }, [visible]);

  const handleClose = () => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      })
    ]).start(() => onClose());
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return '#FFD700';
      case 'diamond': return '#B9F2FF';
      case 'gold': return '#FFD700';
      case 'silver': return '#C0C0C0';
      default: return '#CD7F32';
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        {/* Confetti Effects */}
        <Animated.View 
          style={[
            styles.confetti,
            {
              opacity: confettiAnim,
              transform: [{
                translateY: confettiAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-50, height]
                })
              }]
            }
          ]}
        >
          {Array.from({ length: 20 }).map((_, i) => (
            <Text key={i} style={[styles.confettiPiece, { left: Math.random() * width }]}>
              {['⚽', '🏆', '⭐', '🔥', '💎'][Math.floor(Math.random() * 5)]}
            </Text>
          ))}
        </Animated.View>

        <Animated.View
          style={[
            styles.container,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }]
            }
          ]}
        >
          <LinearGradient
            colors={['#00D4AA', '#007A5E']}
            style={styles.modal}
          >
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.levelUpText}>LEVEL UP!</Text>
              <Text style={styles.newLevelNumber}>{newLevel}</Text>
              <Text style={styles.newLevelTitle}>{newTitle}</Text>
            </View>

            {/* XP Gained */}
            <View style={styles.xpSection}>
              <Ionicons name="star" size={24} color="#FFD700" />
              <Text style={styles.xpGained}>+{xpGained} XP</Text>
            </View>

            {/* Badge Earned */}
            {badgeEarned && (
              <View style={styles.badgeSection}>
                <Text style={styles.badgeTitle}>NEW BADGE EARNED!</Text>
                <View style={[styles.badge, { borderColor: getRarityColor(badgeEarned.rarity) }]}>
                  <Text style={styles.badgeIcon}>{badgeEarned.icon}</Text>
                  <Text style={styles.badgeName}>{badgeEarned.name}</Text>
                </View>
              </View>
            )}

            {/* Unlocked Content */}
            {unlockedContent.length > 0 && (
              <View style={styles.unlockedSection}>
                <Text style={styles.unlockedTitle}>UNLOCKED:</Text>
                {unlockedContent.map((item, index) => (
                  <View key={index} style={styles.unlockedItem}>
                    <Ionicons name="lock-open" size={16} color="#FFD700" />
                    <Text style={styles.unlockedText}>{item}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Continue Button */}
            <TouchableOpacity style={styles.continueButton} onPress={handleClose}>
              <Text style={styles.continueText}>Continue Training!</Text>
              <Ionicons name="arrow-forward" size={20} color="#00D4AA" />
            </TouchableOpacity>
          </LinearGradient>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  confetti: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  confettiPiece: {
    position: 'absolute',
    fontSize: 20,
  },
  container: {
    width: width * 0.85,
    maxWidth: 400,
  },
  modal: {
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  levelUpText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 2,
    marginBottom: 8,
  },
  newLevelNumber: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  newLevelTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  xpSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    marginBottom: 20,
  },
  xpGained: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
    marginLeft: 8,
  },
  badgeSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  badgeTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
    letterSpacing: 1,
  },
  badge: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    minWidth: 120,
  },
  badgeIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  badgeName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  unlockedSection: {
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  unlockedTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
    letterSpacing: 1,
  },
  unlockedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 6,
    minWidth: 200,
  },
  unlockedText: {
    fontSize: 14,
    color: '#FFFFFF',
    marginLeft: 8,
    flex: 1,
  },
  continueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    marginTop: 10,
  },
  continueText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00D4AA',
    marginRight: 8,
  },
});

export default LevelUpModal;