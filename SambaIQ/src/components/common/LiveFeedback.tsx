import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

interface LiveFeedbackProps {
  positionQuality: number; // 0-100
  threatLevel: number;     // 0-100
  hints: string[];
  onHintRequest: () => void;
}

const LiveFeedback: React.FC<LiveFeedbackProps> = ({
  positionQuality,
  threatLevel,
  hints,
  onHintRequest
}) => {
  const [currentHint, setCurrentHint] = useState(0);
  const fadeAnim = new Animated.Value(1);

  const getQualityColor = (quality: number) => {
    if (quality >= 80) return '#00D4AA'; // Excellent
    if (quality >= 60) return '#FFD700'; // Good  
    if (quality >= 40) return '#FF9500'; // OK
    return '#FF3B30'; // Needs work
  };

  const getQualityText = (quality: number) => {
    if (quality >= 80) return 'Excellent! 🔥';
    if (quality >= 60) return 'Good positioning 👍';
    if (quality >= 40) return 'Getting closer...';
    return 'Keep trying! 💪';
  };

  const getThreatText = (threat: number) => {
    if (threat < 20) return 'Säker position! 🛡️';
    if (threat < 50) return 'Bra täckning 👌';
    if (threat < 80) return 'Viss risk... 🤔';
    return 'Farlig position! ⚠️';
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (hints.length > 1) {
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
          }),
        ]).start();
        
        setCurrentHint((prev) => (prev + 1) % hints.length);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [hints.length]);

  return (
    <View style={styles.container}>
      {/* Position Quality Meter */}
      <View style={styles.meterContainer}>
        <Text style={styles.meterLabel}>Position Quality</Text>
        <View style={styles.meterBackground}>
          <Animated.View 
            style={[
              styles.meterFill,
              { 
                width: `${positionQuality}%`,
                backgroundColor: getQualityColor(positionQuality)
              }
            ]}
          />
        </View>
        <Text style={[styles.qualityText, { color: getQualityColor(positionQuality) }]}>
          {getQualityText(positionQuality)}
        </Text>
      </View>

      {/* Threat Level */}
      <View style={styles.threatContainer}>
        <View style={styles.threatIndicator}>
          <Ionicons 
            name={threatLevel > 50 ? "warning" : "shield-checkmark"} 
            size={16} 
            color={threatLevel > 50 ? "#FF3B30" : "#00D4AA"} 
          />
          <Text style={[
            styles.threatText,
            { color: threatLevel > 50 ? "#FF3B30" : "#00D4AA" }
          ]}>
            {getThreatText(threatLevel)}
          </Text>
        </View>
      </View>

      {/* Coaching Hints */}
      {hints.length > 0 && (
        <Animated.View style={[styles.hintContainer, { opacity: fadeAnim }]}>
          <LinearGradient
            colors={['rgba(0, 0, 0, 0.8)', 'rgba(0, 0, 0, 0.6)']}
            style={styles.hintBackground}
          >
            <Text style={styles.hintText}>{hints[currentHint]}</Text>
          </LinearGradient>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
    zIndex: 100,
  },
  meterContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  meterLabel: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 6,
  },
  meterBackground: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 6,
  },
  meterFill: {
    height: '100%',
    borderRadius: 4,
  },
  qualityText: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  threatContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 12,
    padding: 8,
    marginBottom: 8,
  },
  threatIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  threatText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 6,
  },
  hintContainer: {
    marginTop: 8,
  },
  hintBackground: {
    borderRadius: 12,
    padding: 12,
  },
  hintText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default LiveFeedback;