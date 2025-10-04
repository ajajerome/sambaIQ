import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Animated
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface QuestionOption {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
}

interface QuestionScreenProps {
  question: string;
  context: string;
  options: QuestionOption[];
  onCorrectAnswer: () => void;
  coaching: {
    quote: string;
    tip: string;
  };
}

const QuestionScreen: React.FC<QuestionScreenProps> = ({
  question,
  context,
  options,
  onCorrectAnswer,
  coaching
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleOptionSelect = (optionId: string) => {
    const option = options.find(opt => opt.id === optionId);
    if (!option || showResult) return;

    setSelectedOption(optionId);
    setIsCorrect(option.isCorrect);
    setShowResult(true);

    // Auto proceed to practical part after correct answer
    if (option.isCorrect) {
      setTimeout(() => {
        onCorrectAnswer();
      }, 2500);
    }
  };

  const getOptionStyle = (option: QuestionOption) => {
    if (!showResult) return styles.option;
    
    if (selectedOption === option.id) {
      return option.isCorrect ? styles.correctOption : styles.wrongOption;
    }
    
    if (option.isCorrect) {
      return styles.correctOption;
    }
    
    return styles.fadedOption;
  };

  const getOptionIcon = (option: QuestionOption) => {
    if (!showResult) return null;
    
    if (selectedOption === option.id) {
      return option.isCorrect ? 'checkmark-circle' : 'close-circle';
    }
    
    if (option.isCorrect) {
      return 'checkmark-circle';
    }
    
    return null;
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#2C3E50', '#34495E']}
        style={styles.gradient}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>🧠 Taktisk Fråga</Text>
          <Text style={styles.context}>{context}</Text>
        </View>

        {/* Question */}
        <View style={styles.questionContainer}>
          <Text style={styles.question}>{question}</Text>
        </View>

        {/* Options */}
        <View style={styles.optionsContainer}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={option.id}
              style={getOptionStyle(option)}
              onPress={() => handleOptionSelect(option.id)}
              disabled={showResult}
            >
              <View style={styles.optionContent}>
                <Text style={styles.optionLetter}>{String.fromCharCode(65 + index)}</Text>
                <Text style={styles.optionText}>{option.text}</Text>
                {getOptionIcon(option) && (
                  <Ionicons 
                    name={getOptionIcon(option) as any} 
                    size={24} 
                    color={option.isCorrect ? '#00B04F' : '#FF3B30'}
                  />
                )}
              </View>
              
              {showResult && selectedOption === option.id && (
                <Text style={styles.explanation}>{option.explanation}</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Result Section */}
        {showResult && isCorrect && (
          <View style={styles.resultSection}>
            <Text style={styles.successText}>🎉 Rätt svar!</Text>
            <Text style={styles.coachingQuote}>{coaching.quote}</Text>
            <Text style={styles.nextStepText}>Nu visar vi det i praktiken! 🎮</Text>
          </View>
        )}

        {showResult && !isCorrect && (
          <View style={styles.resultSection}>
            <Text style={styles.tryAgainText}>🤔 Försök igen!</Text>
            <TouchableOpacity 
              style={styles.retryButton}
              onPress={() => {
                setSelectedOption(null);
                setShowResult(false);
                setIsCorrect(false);
              }}
            >
              <Text style={styles.retryButtonText}>Prova Igen</Text>
            </TouchableOpacity>
          </View>
        )}
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    paddingTop: 40,
    paddingBottom: 30,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  context: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  questionContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 20,
    borderRadius: 15,
    marginBottom: 30,
  },
  question: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    lineHeight: 28,
  },
  optionsContainer: {
    flex: 1,
  },
  option: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  correctOption: {
    backgroundColor: 'rgba(0, 176, 79, 0.2)',
    borderColor: '#00B04F',
  },
  wrongOption: {
    backgroundColor: 'rgba(255, 59, 48, 0.2)',
    borderColor: '#FF3B30',
  },
  fadedOption: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionLetter: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    width: 32,
    height: 32,
    textAlign: 'center',
    lineHeight: 32,
    borderRadius: 16,
    marginRight: 15,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
    lineHeight: 22,
  },
  explanation: {
    marginTop: 10,
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    fontStyle: 'italic',
    lineHeight: 20,
  },
  resultSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginVertical: 20,
  },
  successText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00B04F',
    marginBottom: 10,
  },
  tryAgainText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF9500',
    marginBottom: 15,
  },
  coachingQuote: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  nextStepText: {
    fontSize: 16,
    color: '#FFD700',
    fontWeight: '600',
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 20,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default QuestionScreen;