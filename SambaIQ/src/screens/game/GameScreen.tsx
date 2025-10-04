import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity,
  Dimensions,
  Animated,
  PanResponder
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Rect, Circle, Line, Text as SvgText } from 'react-native-svg';

const { width, height } = Dimensions.get('window');
const PITCH_WIDTH = width - 40;
const PITCH_HEIGHT = PITCH_WIDTH * 0.68; // Standard fotbollsplan proportioner

interface GameScreenProps {
  navigation: any;
  route: {
    params: {
      scenarioId: string;
    };
  };
}

const GameScreen: React.FC<GameScreenProps> = ({ navigation, route }) => {
  const { scenarioId } = route.params;
  
  // Mock scenario data - i produktion kommer detta från AI/Supabase
  const [scenario] = useState({
    id: scenarioId,
    title: 'Ditt Första Mål',
    description: 'Du har bollen framför målet. Målvakten är på fel sida. Dra din spelare mot det tomma hörnet för att göra mål!',
    setup: {
      playerPosition: { x: 50, y: 70 }, // Procent av plan
      ballPosition: { x: 50, y: 70 },
      goalkeeperPosition: { x: 30, y: 95 },
      targetArea: { x: 70, y: 95, radius: 15 }
    },
    correctSolution: {
      targetX: 70,
      targetY: 95,
      explanation: 'Perfekt! Du såg att målvakten var på fel sida och sköt mot det tomma hörnet. Det här är smart fotboll!'
    },
    coaching: {
      quote: "Som Messi sa: 'Det handlar om att fatta rätt beslut på rätt tid.'",
      tip: 'Titta alltid var målvakten är innan du skjuter!'
    }
  });

  const [playerPosition, setPlayerPosition] = useState(scenario.setup.playerPosition);
  const [gameState, setGameState] = useState<'playing' | 'success' | 'fail'>('playing');
  const [showSolution, setShowSolution] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Animated values för smooth rörelse
  const playerAnim = useRef(new Animated.ValueXY(scenario.setup.playerPosition)).current;
  const pitchRef = useRef<View>(null);

  useEffect(() => {
    // Uppdatera playerPosition när animationen ändras
    const listenerId = playerAnim.addListener(({ x, y }) => {
      setPlayerPosition({ x, y });
    });

    return () => {
      playerAnim.removeListener(listenerId);
    };
  }, []);

  const handlePlayerMove = (gestureState: any) => {
    // Enklare koordinat hantering utan measure
    const touchX = gestureState.moveX || gestureState.pageX || 0;
    const touchY = gestureState.moveY || gestureState.pageY || 0;
    
    // Approximera position relativt till screen
    const screenOffset = 100; // Ungefär var planen börjar
    const newX = Math.max(10, Math.min(90, ((touchX - 40) / PITCH_WIDTH) * 100));
    const newY = Math.max(10, Math.min(90, ((touchY - screenOffset) / PITCH_HEIGHT) * 100));
    
    // Direkt position update utan spring för bättre responsiveness
    playerAnim.setValue({ x: newX, y: newY });

    // Kolla om spelaren är nära målet
    const distance = Math.sqrt(
      Math.pow(newX - scenario.setup.targetArea.x, 2) + 
      Math.pow(newY - scenario.setup.targetArea.y, 2)
    );

    if (distance < scenario.setup.targetArea.radius && gameState === 'playing') {
      setGameState('success');
      setShowSolution(true);
    }
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    
    onPanResponderGrant: (evt, gestureState) => {
      setIsDragging(true);
      handlePlayerMove({ moveX: evt.nativeEvent.pageX, moveY: evt.nativeEvent.pageY });
    },
    
    onPanResponderMove: (evt, gestureState) => {
      handlePlayerMove({ moveX: evt.nativeEvent.pageX, moveY: evt.nativeEvent.pageY });
    },
    
    onPanResponderRelease: () => {
      setIsDragging(false);
    },
    
    onPanResponderTerminationRequest: () => false,
  });

  const resetScenario = () => {
    setPlayerPosition(scenario.setup.playerPosition);
    playerAnim.setValue(scenario.setup.playerPosition);
    setGameState('playing');
    setShowSolution(false);
  };

  const nextScenario = () => {
    // I produktion: navigera till nästa scenario eller tillbaka till PlayScreen
    navigation.goBack();
  };

  const renderFootballPitch = () => (
    <Svg width={PITCH_WIDTH} height={PITCH_HEIGHT} style={styles.pitch}>
      {/* Gräsplan bakgrund */}
      <Rect
        x={0}
        y={0}
        width={PITCH_WIDTH}
        height={PITCH_HEIGHT}
        fill="#00B04F"
        stroke="#fff"
        strokeWidth={2}
      />
      
      {/* Mittlinje */}
      <Line
        x1={0}
        y1={PITCH_HEIGHT / 2}
        x2={PITCH_WIDTH}
        y2={PITCH_HEIGHT / 2}
        stroke="#fff"
        strokeWidth={2}
      />
      
      {/* Mittcirkel */}
      <Circle
        cx={PITCH_WIDTH / 2}
        cy={PITCH_HEIGHT / 2}
        r={PITCH_WIDTH * 0.15}
        fill="none"
        stroke="#fff"
        strokeWidth={2}
      />
      
      {/* Målområde (övre) */}
      <Rect
        x={PITCH_WIDTH * 0.35}
        y={0}
        width={PITCH_WIDTH * 0.3}
        height={PITCH_HEIGHT * 0.15}
        fill="none"
        stroke="#fff"
        strokeWidth={2}
      />
      
      {/* Målområde (nedre) */}
      <Rect
        x={PITCH_WIDTH * 0.35}
        y={PITCH_HEIGHT * 0.85}
        width={PITCH_WIDTH * 0.3}
        height={PITCH_HEIGHT * 0.15}
        fill="none"
        stroke="#fff"
        strokeWidth={2}
      />
      
      {/* Mål (nedre) */}
      <Rect
        x={PITCH_WIDTH * 0.42}
        y={PITCH_HEIGHT * 0.95}
        width={PITCH_WIDTH * 0.16}
        height={PITCH_HEIGHT * 0.05}
        fill="none"
        stroke="#fff"
        strokeWidth={3}
      />
      
      {/* Målvakt */}
      <Circle
        cx={PITCH_WIDTH * scenario.setup.goalkeeperPosition.x / 100}
        cy={PITCH_HEIGHT * scenario.setup.goalkeeperPosition.y / 100}
        r={12}
        fill="#FF6B35"
        stroke="#fff"
        strokeWidth={2}
      />
      
      {/* Boll */}
      <Circle
        cx={PITCH_WIDTH * scenario.setup.ballPosition.x / 100}
        cy={PITCH_HEIGHT * scenario.setup.ballPosition.y / 100}
        r={6}
        fill="#fff"
        stroke="#000"
        strokeWidth={1}
      />
      
      {/* Spelare (animerad) */}
      <Animated.View
        style={[
          styles.player,
          {
            left: playerAnim.x.interpolate({
              inputRange: [0, 100],
              outputRange: [0, PITCH_WIDTH - 24],
            }),
            top: playerAnim.y.interpolate({
              inputRange: [0, 100], 
              outputRange: [0, PITCH_HEIGHT - 24],
            }),
          }
        ]}
      >
        <View style={styles.playerCircle}>
          <Text style={styles.playerText}>⚽</Text>
        </View>
      </Animated.View>
      
      {/* Target area (synlig när man lyckas) */}
      {showSolution && (
        <Circle
          cx={PITCH_WIDTH * scenario.setup.targetArea.x / 100}
          cy={PITCH_HEIGHT * scenario.setup.targetArea.y / 100}
          r={scenario.setup.targetArea.radius * PITCH_WIDTH / 100}
          fill="rgba(255, 255, 255, 0.3)"
          stroke="#fff"
          strokeWidth={2}
          strokeDasharray="5,5"
        />
      )}
    </Svg>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#2C3E50" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{scenario.title}</Text>
        <TouchableOpacity onPress={resetScenario}>
          <Ionicons name="refresh" size={24} color="#2C3E50" />
        </TouchableOpacity>
      </View>

      {/* Instruktioner */}
      <View style={styles.instructionContainer}>
        <Text style={styles.instructionText}>{scenario.description}</Text>
        {gameState === 'playing' && (
          <Text style={styles.hintText}>💡 Dra spelaren med fingret!</Text>
        )}
      </View>

      {/* Fotbollsplan */}
      <View style={styles.pitchContainer}>
        <View
          ref={pitchRef}
          style={styles.pitchWrapper}
          {...panResponder.panHandlers}
        >
          {renderFootballPitch()}
        </View>
      </View>

      {/* Success Modal */}
      {gameState === 'success' && (
        <View style={styles.successOverlay}>
          <View style={styles.successModal}>
            <Text style={styles.successEmoji}>🎉</Text>
            <Text style={styles.successTitle}>MÅÅÅL!</Text>
            <Text style={styles.successExplanation}>{scenario.correctSolution.explanation}</Text>
            
            <View style={styles.coachingSection}>
              <Text style={styles.coachingQuote}>{scenario.coaching.quote}</Text>
              <Text style={styles.coachingTip}>{scenario.coaching.tip}</Text>
            </View>
            
            <View style={styles.rewardSection}>
              <Text style={styles.rewardText}>+50 XP</Text>
              <Text style={styles.badgeText}>🏆 Första Mål Badge!</Text>
            </View>
            
            <TouchableOpacity style={styles.nextButton} onPress={nextScenario}>
              <Text style={styles.nextButtonText}>Nästa Scenario</Text>
              <Ionicons name="arrow-forward" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E1E8ED',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  instructionContainer: {
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  instructionText: {
    fontSize: 16,
    color: '#2C3E50',
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: 8,
  },
  hintText: {
    fontSize: 14,
    color: '#7F8C8D',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  pitchContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  pitchWrapper: {
    backgroundColor: '#00B04F',
    borderRadius: 8,
  },
  pitch: {
    backgroundColor: '#00B04F',
    borderRadius: 8,
  },
  player: {
    position: 'absolute',
    width: 24,
    height: 24,
  },
  playerCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  playerText: {
    fontSize: 12,
    color: '#fff',
  },
  successOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successModal: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 30,
    margin: 20,
    alignItems: 'center',
    maxWidth: width * 0.9,
  },
  successEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#00B04F',
    marginBottom: 16,
  },
  successExplanation: {
    fontSize: 16,
    color: '#2C3E50',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
  },
  coachingSection: {
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    width: '100%',
  },
  coachingQuote: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 8,
  },
  coachingTip: {
    fontSize: 14,
    color: '#00B04F',
    textAlign: 'center',
    fontWeight: '600',
  },
  rewardSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  rewardText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 4,
  },
  badgeText: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  nextButton: {
    backgroundColor: '#00B04F',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 16,
    borderRadius: 25,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
});

export default GameScreen;