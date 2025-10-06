import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Animated,
  StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Rect, Circle, Line, Text as SvgText } from 'react-native-svg';
// import * as ScreenOrientation from 'expo-screen-orientation'; // Temporary disabled - causing crash
import VirtualJoystick from '../../components/common/VirtualJoystick';
import ShootButton from '../../components/common/ShootButton';
import PassButton from '../../components/common/PassButton';
import QuestionScreen from '../../components/common/QuestionScreen';
// import PremiumPitch from '../../components/football/PremiumPitch'; // Temporary disabled
import { scenarios, ScenarioType } from '../../data/scenarios';

const { width, height } = Dimensions.get('window');
// Landscape orientation - use full width for pitch
const PITCH_WIDTH = Math.max(width, height) - 60; // Större plan i landscape
const PITCH_HEIGHT = PITCH_WIDTH * 0.6; // Bättre ratio för landscape

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
  
  // Hämta scenario från data
  const scenario: ScenarioType = scenarios[scenarioId as keyof typeof scenarios] || scenarios['scenario_1'];

  const [playerPosition, setPlayerPosition] = useState(scenario.setup.playerPosition);
  const [gameState, setGameState] = useState<'question' | 'playing' | 'shooting' | 'success' | 'fail'>(
    scenario.type === 'theory_practice' ? 'question' : 'playing'
  );
  const [showSolution, setShowSolution] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [ballPosition, setBallPosition] = useState(scenario.setup.ballPosition);

  // Animated values för smooth rörelse
  const playerAnim = useRef(new Animated.ValueXY(scenario.setup.playerPosition)).current;
  const ballAnim = useRef(new Animated.ValueXY(scenario.setup.ballPosition)).current;
  const moveIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Uppdatera playerPosition när animationen ändras
    const playerListenerId = playerAnim.addListener(({ x, y }) => {
      setPlayerPosition({ x, y });
      
      // Uppdatera boll position för att följa spelaren (när inte shooting)
      if (gameState === 'playing') {
        setBallPosition({ x, y });
        ballAnim.setValue({ x, y });
      }
    });

    // Uppdatera ballPosition när boll animationen ändras
    const ballListenerId = ballAnim.addListener(({ x, y }) => {
      setBallPosition({ x, y });
    });

    return () => {
      playerAnim.removeListener(playerListenerId);
      ballAnim.removeListener(ballListenerId);
      if (moveIntervalRef.current) {
        clearInterval(moveIntervalRef.current);
      }
    };
  }, [gameState]);

  const handleShoot = () => {
    if (gameState !== 'playing' || scenario.type !== 'shooting') return;
    
    setGameState('shooting');
    
    // Stoppa spelaren
    if (moveIntervalRef.current) {
      clearInterval(moveIntervalRef.current);
      moveIntervalRef.current = null;
    }
    setIsMoving(false);
    
    // Beräkna riktning mot målet (höger sida av planen)
    const goalX = 85; // Mål position
    const goalY = 50; // Center av målet
    
    // Animera bollen mot målet
    Animated.timing(ballAnim, {
      toValue: { x: goalX, y: goalY },
      duration: 800,
      useNativeDriver: false,
    }).start(() => {
      // När bollen når målet
      setGameState('success');
      setShowSolution(true);
    });
  };

  const handlePass = () => {
    if (gameState !== 'playing' || scenario.type !== 'passing') return;
    
    setGameState('shooting'); // Använd samma state för animation
    
    // Stoppa spelaren  
    if (moveIntervalRef.current) {
      clearInterval(moveIntervalRef.current);
      moveIntervalRef.current = null;
    }
    setIsMoving(false);
    
    // Passa till lagkamrat
    const teammate = scenario.setup.teammates?.[0];
    if (teammate) {
      // Animera bollen till lagkamraten
      Animated.timing(ballAnim, {
        toValue: { x: teammate.position.x, y: teammate.position.y },
        duration: 600,
        useNativeDriver: false,
      }).start(() => {
        // När bollen når lagkamraten - animera skott mot mål
        setTimeout(() => {
          Animated.timing(ballAnim, {
            toValue: { x: 85, y: 50 }, // Mål
            duration: 400,
            useNativeDriver: false,
          }).start(() => {
            setGameState('success');
            setShowSolution(true);
          });
        }, 200);
      });
    }
  };

  const isPlayerNearBall = () => {
    const distance = Math.sqrt(
      Math.pow(playerPosition.x - ballPosition.x, 2) + 
      Math.pow(playerPosition.y - ballPosition.y, 2)
    );
    return distance < 8; // Spelaren måste vara nära bollen för att skjuta
  };

  const handleJoystickMove = (direction: { x: number; y: number }) => {
    if (gameState !== 'playing') return;
    
    setIsMoving(true);
    
    // Clear any existing interval
    if (moveIntervalRef.current) {
      clearInterval(moveIntervalRef.current);
    }
    
    // FIFA Mobile style movement improvements
    const deadZone = 0.15; // Mindre känslighet i center
    const magnitude = Math.sqrt(direction.x * direction.x + direction.y * direction.y);
    
    if (magnitude < deadZone) {
      setIsMoving(false);
      return;
    }
    
    // Normalize direction och applicera smooth acceleration
    const normalizedX = direction.x / magnitude;
    const normalizedY = direction.y / magnitude;
    
    // Speed baserat på avstånd från center (längre ut = snabbare)
    const speedMultiplier = Math.min(magnitude * 1.5, 1.0);
    
    // Start continuous movement
    moveIntervalRef.current = setInterval(() => {
      const currentX = (playerAnim.x as any)._value;
      const currentY = (playerAnim.y as any)._value;
      
      // FIFA Mobile style: Variable speed och smooth movement  
      const baseSpeed = 1.5;
      const currentSpeed = baseSpeed * speedMultiplier;
      
      // Landscape orientation: X = höger/vänster, Y = upp/ner
      const newX = Math.max(5, Math.min(95, currentX + (normalizedX * currentSpeed)));
      const newY = Math.max(10, Math.min(90, currentY + (normalizedY * currentSpeed)));
      
      playerAnim.setValue({ x: newX, y: newY });
    }, 16); // ~60fps
  };

  const handleJoystickStop = () => {
    setIsMoving(false);
    if (moveIntervalRef.current) {
      clearInterval(moveIntervalRef.current);
      moveIntervalRef.current = null;
    }
  };

  const handleQuestionCorrect = () => {
    // Övergång från fråga till praktisk del
    setGameState('playing');
  };

  const handlePositionComplete = () => {
    // Kontrollera om spelaren är inom target area för positioning scenarios
    if (scenario.type === 'theory_practice') {
      const targetArea = scenario.setup.targetArea;
      const distance = Math.sqrt(
        Math.pow(playerPosition.x - targetArea.x, 2) +
        Math.pow(playerPosition.y - targetArea.y, 2)
      );

      if (distance <= targetArea.radius) {
        setGameState('success');
        setShowSolution(true);
      }
    }
  };

  // Auto-check positioning för theory_practice scenarios
  useEffect(() => {
    if (gameState === 'playing' && scenario.type === 'theory_practice') {
      const timer = setTimeout(() => {
        handlePositionComplete();
      }, 1500); // Sakta ner till 1.5s för att ge tid att förstå
      return () => clearTimeout(timer);
    }
  }, [playerPosition, gameState, scenario.type]);

  // TODO: Add landscape orientation when ScreenOrientation is working
  // useEffect(() => {
  //   const setLandscape = async () => {
  //     await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
  //   };
  //   setLandscape();
  //   return () => {
  //     ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
  //   };
  // }, []);

  const resetScenario = () => {
    setPlayerPosition(scenario.setup.playerPosition);
    setBallPosition(scenario.setup.ballPosition);
    playerAnim.setValue(scenario.setup.playerPosition);
    ballAnim.setValue(scenario.setup.ballPosition);
    setGameState(scenario.type === 'theory_practice' ? 'question' : 'playing');
    setShowSolution(false);
  };

  const nextScenario = () => {
    // Smart navigation - gå till nästa scenario i landscape mode
    const currentScenarioId = scenario.id;
    let nextId;
    if (currentScenarioId === 'scenario_1') nextId = 'scenario_2';
    else if (currentScenarioId === 'scenario_2') nextId = 'scenario_3';
    else nextId = 'scenario_1'; // Cycle tillbaka

    // Navigera till nästa scenario utan att lämna landscape mode
    navigation.replace('Game', { scenarioId: nextId });
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
      
      {/* Lagkamrater (gröna) */}
      {scenario.setup.teammates?.map((teammate) => (
        <Circle
          key={teammate.id}
          cx={PITCH_WIDTH * teammate.position.x / 100}
          cy={PITCH_HEIGHT * teammate.position.y / 100}
          r={12}
          fill="#00B04F"
          stroke="#fff"
          strokeWidth={2}
        />
      ))}
      
          {/* Försvarare (röda) */}
          {scenario.setup.opponents?.map((opponent) => (
            <Circle
              key={opponent.id}
              cx={PITCH_WIDTH * opponent.position.x / 100}
              cy={PITCH_HEIGHT * opponent.position.y / 100}
              r={12}
              fill="#FF3B30"
              stroke="#fff"
              strokeWidth={2}
            />
          ))}

          {/* Markings för theory_practice scenarios */}
          {scenario.setup.markings?.map((marking, index) => {
            if (marking.type === 'zone') {
              return (
                <Rect
                  key={`marking-${index}`}
                  x={PITCH_WIDTH * (marking.x - (marking.width || 0) / 2) / 100}
                  y={PITCH_HEIGHT * (marking.y - (marking.height || 0) / 2) / 100}
                  width={PITCH_WIDTH * (marking.width || 10) / 100}
                  height={PITCH_HEIGHT * (marking.height || 10) / 100}
                  fill={`${marking.color}40`}
                  stroke={marking.color}
                  strokeWidth={2}
                  strokeDasharray="5,5"
                />
              );
            }
            // Andra markings kan läggas till här
            return null;
          })}

          {/* Boll (separat från spelare) */}
          <Circle
            cx={PITCH_WIDTH * ballPosition.x / 100}
            cy={PITCH_HEIGHT * ballPosition.y / 100}
            r={8}
            fill="#fff"
            stroke="#000"
            strokeWidth={1}
          />

          {/* Direction arrows for passing scenarios */}
          {scenario.type === 'passing' && scenario.setup.teammates && gameState === 'playing' && (
            scenario.setup.teammates.map((teammate) => {
              // Draw arrow from player to teammate
              const playerX = PITCH_WIDTH * playerPosition.x / 100;
              const playerY = PITCH_HEIGHT * playerPosition.y / 100;
              const teammateX = PITCH_WIDTH * teammate.position.x / 100;
              const teammateY = PITCH_HEIGHT * teammate.position.y / 100;
              
              return (
                <Line
                  key={`arrow-${teammate.id}`}
                  x1={playerX}
                  y1={playerY}
                  x2={teammateX}
                  y2={teammateY}
                  stroke="#00B04F"
                  strokeWidth={3}
                  strokeDasharray="8,4"
                  opacity={0.7}
                />
              );
            })
          )}
      
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
      <StatusBar hidden={true} /> {/* Hide status bar in landscape gaming */}

      {/* Theory Phase - Question Screen */}
      {gameState === 'question' && scenario.type === 'theory_practice' && scenario.question && (
        <QuestionScreen
          question={scenario.question.text}
          context={scenario.question.context}
          options={scenario.question.options}
          onCorrectAnswer={handleQuestionCorrect}
          coaching={scenario.coaching}
        />
      )}

      {/* Practice Phase - Game Screen */}
      {gameState !== 'question' && (
        <>
          {/* Compact Header för Landscape */}
      <View style={styles.compactHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={20} color="#fff" />
        </TouchableOpacity>
        
        <View style={styles.headerInfo}>
          <Text style={styles.scenarioTitle}>{scenario.title}</Text>
          <Text style={styles.scenarioXP}>{scenario.xp} XP</Text>
        </View>
        
        <TouchableOpacity onPress={resetScenario} style={styles.resetButton}>
          <Ionicons name="refresh" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Main Game Area - Landscape Optimized */}
      <View style={styles.gameArea}>
          {/* Football Pitch - Temporary Fallback */}
          <View style={styles.pitchContainer}>
            <Svg width={PITCH_WIDTH} height={PITCH_HEIGHT} style={styles.pitch}>
              {/* Basic pitch background */}
              <Rect
                x={0}
                y={0}
                width={PITCH_WIDTH}
                height={PITCH_HEIGHT}
                fill="#00B04F"
                stroke="#fff"
                strokeWidth={2}
              />
              
              {/* Center line */}
              <Line
                x1={0}
                y1={PITCH_HEIGHT / 2}
                x2={PITCH_WIDTH}
                y2={PITCH_HEIGHT / 2}
                stroke="#fff"
                strokeWidth={2}
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

              {/* Lagkamrater */}
              {scenario.setup.teammates?.map((teammate) => (
                <Circle
                  key={teammate.id}
                  cx={PITCH_WIDTH * teammate.position.x / 100}
                  cy={PITCH_HEIGHT * teammate.position.y / 100}
                  r={12}
                  fill="#00B04F"
                  stroke="#fff"
                  strokeWidth={2}
                />
              ))}

              {/* Opponents */}
              {scenario.setup.opponents?.map((opponent) => (
                <Circle
                  key={opponent.id}
                  cx={PITCH_WIDTH * opponent.position.x / 100}
                  cy={PITCH_HEIGHT * opponent.position.y / 100}
                  r={12}
                  fill="#FF3B30"
                  stroke="#fff"
                  strokeWidth={2}
                />
              ))}

              {/* Ball */}
              <Circle
                cx={PITCH_WIDTH * ballPosition.x / 100}
                cy={PITCH_HEIGHT * ballPosition.y / 100}
                r={8}
                fill="#fff"
                stroke="#000"
                strokeWidth={1}
              />
            </Svg>
          
          {/* Overlay Instructions - Minimalistic */}
          {gameState === 'playing' && (
            <View style={styles.instructionOverlay}>
              <Text style={styles.quickHint}>
                {scenario.type === 'shooting' ? '🕹️➡️⚽ Styr → Skjut' : '🕹️➡️🎯 Styr → Passa'}
              </Text>
            </View>
          )}
          
          {gameState === 'shooting' && (
            <View style={styles.instructionOverlay}>
              <Text style={styles.quickHint}>⚽ Bollen på väg...</Text>
            </View>
          )}
        </View>
        
        {/* Controls Overlay */}
        <View style={styles.controlsOverlay}>
          {/* Joystick (bottom left) */}
          <View style={styles.joystickOverlay}>
            <VirtualJoystick
              onMove={handleJoystickMove}
              onStop={handleJoystickStop}
              size={110} // Mindre i landscape
            />
          </View>
          
          {/* Action Buttons (bottom right) */}
          <View style={styles.actionButtonsOverlay}>
            {scenario.type === 'shooting' && (
              <ShootButton
                onShoot={handleShoot}
                disabled={!isPlayerNearBall() || gameState !== 'playing'}
              />
            )}
            {scenario.type === 'passing' && (
              <PassButton
                onPass={handlePass}
                disabled={!isPlayerNearBall() || gameState !== 'playing'}
              />
            )}
          </View>
        </View>
      </View>

      {/* Success Modal - Landscape Optimized */}
      {gameState === 'success' && (
        <View style={styles.successOverlay}>
          <View style={styles.successModalLandscape}>
            <View style={styles.successContent}>
              <Text style={styles.successEmoji}>🎉</Text>
              <Text style={styles.successTitle}>
                {scenario.type === 'shooting' ? 'MÅÅÅL!' : 'PERFEKT PASS!'}
              </Text>
              <Text style={styles.successExplanation}>{scenario.correctSolution.explanation}</Text>
            </View>
            
            <View style={styles.rewardContent}>
              <Text style={styles.rewardText}>+{scenario.xp} XP</Text>
              <Text style={styles.coachingQuote}>{scenario.coaching.quote}</Text>
            </View>
            
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.nextButton} onPress={nextScenario}>
                <Text style={styles.nextButtonText}>Nästa Scenario</Text>
                <Ionicons name="arrow-forward" size={18} color="#fff" />
              </TouchableOpacity>
              
            <TouchableOpacity style={styles.repeatButton} onPress={resetScenario}>
              <Text style={styles.repeatButtonText}>Spela Igen</Text>
              <Ionicons name="refresh" size={18} color="#00B04F" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )}
  </>
)}
</SafeAreaView>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D4F3C', // Mörkare grön för gaming mood
  },
  compactHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: 'rgba(0, 176, 79, 0.9)',
  },
  backButton: {
    padding: 8,
  },
  headerInfo: {
    alignItems: 'center',
  },
  scenarioTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  scenarioXP: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  resetButton: {
    padding: 8,
  },
  gameArea: {
    flex: 1,
    position: 'relative',
  },
  pitchContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  instructionOverlay: {
    position: 'absolute',
    top: 10,
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  quickHint: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  controlsOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 30,
    paddingBottom: 20,
  },
  joystickOverlay: {
    // Position handled by controlsOverlay
  },
  actionButtonsOverlay: {
    // Position handled by controlsOverlay  
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
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successModalLandscape: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    margin: 20,
    maxWidth: '80%',
    maxHeight: '70%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  successContent: {
    flex: 2,
    alignItems: 'center',
  },
  rewardContent: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  actionButtons: {
    flex: 1,
    alignItems: 'center',
  },
  successEmoji: {
    fontSize: 40,
    marginBottom: 10,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00B04F',
    marginBottom: 10,
  },
  successExplanation: {
    fontSize: 14,
    color: '#2C3E50',
    textAlign: 'center',
    lineHeight: 20,
  },
  rewardText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 10,
  },
  coachingQuote: {
    fontSize: 12,
    fontStyle: 'italic',
    color: '#2C3E50',
    textAlign: 'center',
    lineHeight: 16,
  },
  nextButton: {
    backgroundColor: '#00B04F',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    marginBottom: 10,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 5,
  },
  repeatButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#00B04F',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
  },
  repeatButtonText: {
    color: '#00B04F',
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 5,
  },
});

export default GameScreen;