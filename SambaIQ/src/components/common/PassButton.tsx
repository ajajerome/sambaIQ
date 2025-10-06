import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface PassButtonProps {
  onPass: () => void;
  disabled?: boolean;
}

const PassButton: React.FC<PassButtonProps> = ({ onPass, disabled }) => {
  return (
    <TouchableOpacity
      style={[styles.passButton, disabled && styles.disabled]}
      onPress={onPass}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <View style={styles.buttonContent}>
        <Ionicons name="arrow-forward" size={24} color="#fff" />
        <Text style={styles.passText}>PASS</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  passButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
    borderWidth: 3,
    borderColor: '#fff',
  },
  disabled: {
    backgroundColor: 'rgba(0, 122, 255, 0.5)',
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  buttonContent: {
    alignItems: 'center',
  },
  passText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 2,
  },
});

export default PassButton;