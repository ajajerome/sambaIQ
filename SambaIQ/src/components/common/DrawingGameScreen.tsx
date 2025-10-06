import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Rect, Circle, Line, Path } from 'react-native-svg';
import DrawingCanvas from './DrawingCanvas';
import QuestionScreen from './QuestionScreen';
import { scenarios, ScenarioType } from '../../data/scenarios';
import PremiumTheme from '../../styles/PremiumTheme';

const { width, height } = Dimensions.get('window');
const PITCH_WIDTH = Math.min(width - 40, 400);
const PITCH_HEIGHT = PITCH_WIDTH * 0.6;

interface DrawingGameScreenProps {
  navigation: any;
  route: {
    params: {
      scenarioId: string;
    };
  };
}

const DrawingGameScreen: React.FC<DrawingGameScreenProps> = ({ navigation, route }) => {
  const { scenarioId } = route.params;
  const scenario: ScenarioType = scenarios[scenarioId as keyof typeof scenarios] || scenarios['scenario_1'];

  const [gameState, setGameState] = useState<'question' | 'drawing' | 'animating' | 'success' | 'fail'>(
    scenario.type === 'theory_practice' ? 'question' : 'drawing'
  );
  const [drawnPaths, setDrawnPaths] = useState<Array<{path: string, type: 'line' | 'circle' | 'arrow'}>>([]);
  const [showSolution, setShowSolution] = useState(false);

  const handleQuestionCorrect = () => {
    setGameState('drawing');
  };

  const handleDrawingComplete = (path: string, type: 'line' | 'circle' | 'arrow') => {
    console.log('Drawing completed:', { path, type });
    
    // Add the new drawing to our collection
    setDrawnPaths(prev => [...prev, { path, type }]);
    
    // Analyze the drawing based on scenario type
    analyzeDrawing(path, type);
  };

  const analyzeDrawing = (path: string, type: 'line' | 'circle' | 'arrow') => {
    setGameState('animating');
    
    // Simulate AI analysis delay
    setTimeout(() => {
      // For now, always show success - later this will be real AI analysis
      setGameState('success');
      setShowSolution(true);
    }, 1000);
  };

  const clearDrawings = () => {
    setDrawnPaths([]);
    setShowSolution(false);
  };

  const resetScenario = () => {
    setDrawnPaths([]);
    setGameState(scenario.type === 'theory_practice' ? 'question' : 'drawing');
    setShowSolution(false);
  };

  const nextScenario = () => {
    const currentScenarioId = scenario.id;
    let nextId;
    if (currentScenarioId === 'scenario_1') nextId = 'scenario_2';
    else if (currentScenarioId === 'scenario_2') nextId = 'scenario_3';
    else nextId = 'scenario_1';

    navigation.replace('DrawingGame', { scenarioId: nextId });
  };

  const renderFootballPitch = () => (
    <>
      {/* Pitch background */}
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
      
      {/* Center circle */}
      <Circle
        cx={PITCH_WIDTH / 2}
        cy={PITCH_HEIGHT / 2}
        r={PITCH_WIDTH * 0.15}
        fill="none"
        stroke="#fff"
        strokeWidth={2}
      />
      
      {/* Goal areas */}
      <Rect
        x={PITCH_WIDTH * 0.35}
        y={0}
        width={PITCH_WIDTH * 0.3}
        height={PITCH_HEIGHT * 0.15}
        fill="none"
        stroke="#fff"
        strokeWidth={2}
      />
      
      <Rect
        x={PITCH_WIDTH * 0.35}
        y={PITCH_HEIGHT * 0.85}
        width={PITCH_WIDTH * 0.3}
        height={PITCH_HEIGHT * 0.15}
        fill="none"
        stroke="#fff"
        strokeWidth={2}
      />
      
      {/* Goals */}
      <Rect
        x={PITCH_WIDTH * 0.42}
        y={PITCH_HEIGHT * 0.95}
        width={PITCH_WIDTH * 0.16}
        height={PITCH_HEIGHT * 0.05}
        fill="none"
        stroke="#fff"
        strokeWidth={3}
      />
      
      {/* Players */}
      {/* Goalkeeper */}
      <Circle
        cx={PITCH_WIDTH * scenario.setup.goalkeeperPosition.x / 100}
        cy={PITCH_HEIGHT * scenario.setup.goalkeeperPosition.y / 100}
        r={12}
        fill="#FF6B35"
        stroke="#fff"
        strokeWidth={2}
      />
      
      {/* Teammates */}
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
        cx={PITCH_WIDTH * scenario.setup.ballPosition.x / 100}
        cy={PITCH_HEIGHT * scenario.setup.ballPosition.y / 100}
        r={8}
        fill="#fff"
        stroke="#000"
        strokeWidth={1}
      />
      
      {/* User drawings */}
      {drawnPaths.map((drawing, index) => (
        <Path
          key={index}
          d={drawing.path}
          stroke={drawing.type === 'circle' ? '#FFD700' : '#007AFF'}
          strokeWidth={drawing.type === 'circle' ? 3 : 4}
          fill={drawing.type === 'circle' ? 'rgba(255, 215, 0, 0.2)' : 'none'}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={drawing.type === 'arrow' ? '8,4' : undefined}
        />
      ))}
      
      {/* Target area (when solution is shown) */}
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
    </>
  );

  const getInstructionText = () => {
    switch (scenario.type) {
      case 'shooting':
        return '🎯 Rita linje från spelare till mål för att skjuta';
      case 'passing':
        return '⚽ Rita linje från spelare till lagkamrat för att passa';
      case 'theory_practice':
        return '🎯 Rita cirkel där du ska positionera dig';
      default:
        return '✏️ Rita ditt svar på planen';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Question Phase */}
      {gameState === 'question' && scenario.type === 'theory_practice' && scenario.question && (
        <QuestionScreen
          question={scenario.question.text}
          context={scenario.question.context}
          options={scenario.question.options}
          onCorrectAnswer={handleQuestionCorrect}
          coaching={scenario.coaching}
        />
      )}

      {/* Drawing Phase */}
      {gameState !== 'question' && (
        <>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Text style={styles.headerIcon}>←</Text>
            </TouchableOpacity>
            
            <View style={styles.headerInfo}>
              <Text style={styles.scenarioTitle}>{scenario.title}</Text>
              <Text style={styles.scenarioXP}>{scenario.xp} XP</Text>
            </View>
            
            <TouchableOpacity onPress={resetScenario} style={styles.resetButton}>
              <Text style={styles.headerIcon}>↻</Text>
            </TouchableOpacity>
          </View>

          {/* Instructions */}
          <View style={styles.instructionContainer}>
            <Text style={styles.instructionText}>{getInstructionText()}</Text>
            {gameState === 'animating' && (
              <Text style={styles.statusText}>🤖 AI analyserar din lösning...</Text>
            )}
          </View>

          {/* Drawing Canvas with Football Pitch */}
          <View style={styles.pitchContainer}>
            <DrawingCanvas
              width={PITCH_WIDTH}
              height={PITCH_HEIGHT}
              onDrawingComplete={handleDrawingComplete}
              disabled={gameState !== 'drawing'}
            >
              {renderFootballPitch()}
            </DrawingCanvas>
          </View>

          {/* Controls */}
          <View style={styles.controlsContainer}>
            <TouchableOpacity 
              style={styles.clearButton} 
              onPress={clearDrawings}
              disabled={drawnPaths.length === 0}
            >
              <Ionicons name="trash-outline" size={20} color="#fff" />
              <Text style={styles.buttonText}>Rensa</Text>
            </TouchableOpacity>
          </View>

          {/* Success Modal */}
          {gameState === 'success' && (
            <View style={styles.successOverlay}>
              <View style={styles.successModal}>
                <Text style={styles.successEmoji}>🎉</Text>
                <Text style={styles.successTitle}>
                  {scenario.type === 'shooting' ? 'MÅÅÅL!' : 
                   scenario.type === 'passing' ? 'PERFEKT PASS!' : 
                   'RÄTT POSITION!'}
                </Text>
                <Text style={styles.successExplanation}>
                  {scenario.correctSolution.explanation}
                </Text>
                <Text style={styles.rewardText}>+{scenario.xp} XP</Text>
                <Text style={styles.coachingQuote}>{scenario.coaching.quote}</Text>
                
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
    backgroundColor: PremiumTheme.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: PremiumTheme.surface,
    borderBottomWidth: 1,
    borderBottomColor: PremiumTheme.ui.cardBorder,
  },
  backButton: {
    padding: 8,
  },
  headerInfo: {
    alignItems: 'center',
  },
  headerIcon: {
    fontSize: 24,
    color: PremiumTheme.accent,
    fontWeight: 'bold',
  },
  scenarioTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: PremiumTheme.text.primary,
  },
  scenarioXP: {
    fontSize: 14,
    color: PremiumTheme.accent,
    fontWeight: '600',
  },
  resetButton: {
    padding: 8,
  },
  instructionContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  instructionText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
  statusText: {
    color: '#FFD700',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 5,
    fontStyle: 'italic',
  },
  pitchContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  clearButton: {
    backgroundColor: '#FF3B30',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
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
  successModal: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 30,
    margin: 20,
    alignItems: 'center',
    maxWidth: '90%',
  },
  successEmoji: {
    fontSize: 50,
    marginBottom: 15,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00B04F',
    marginBottom: 15,
  },
  successExplanation: {
    fontSize: 16,
    color: '#2C3E50',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 15,
  },
  rewardText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 10,
  },
  coachingQuote: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#2C3E50',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 25,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 15,
  },
  nextButton: {
    backgroundColor: '#00B04F',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
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

export default DrawingGameScreen;