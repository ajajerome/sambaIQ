import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ShootButtonProps {
  onShoot: () => void;
  disabled?: boolean;
}

const ShootButton: React.FC<ShootButtonProps> = ({ onShoot, disabled }) => {
  return (
    <TouchableOpacity
      style={[styles.shootButton, disabled && styles.disabled]}
      onPress={onShoot}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <View style={styles.buttonContent}>
        <Ionicons name="football" size={24} color="#fff" />
        <Text style={styles.shootText}>SKOTT</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  shootButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FF3B30',
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
    backgroundColor: 'rgba(255, 59, 48, 0.5)',
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  buttonContent: {
    alignItems: 'center',
  },
  shootText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 2,
  },
});

export default ShootButton;