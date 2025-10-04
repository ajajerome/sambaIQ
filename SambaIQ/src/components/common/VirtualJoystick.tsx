import React, { useState, useRef } from 'react';
import { View, StyleSheet, PanResponder, Animated } from 'react-native';

interface VirtualJoystickProps {
  onMove: (direction: { x: number; y: number }) => void;
  onStop: () => void;
  size?: number;
}

const VirtualJoystick: React.FC<VirtualJoystickProps> = ({ 
  onMove, 
  onStop, 
  size = 120 
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const knobAnim = useRef(new Animated.ValueXY()).current;
  const knobRadius = size * 0.3;
  const containerRadius = size * 0.5;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,

    onPanResponderGrant: () => {
      setIsDragging(true);
      knobAnim.setOffset({
        x: (knobAnim.x as any)._value,
        y: (knobAnim.y as any)._value,
      });
    },

    onPanResponderMove: (evt, gestureState) => {
      const { dx, dy } = gestureState;
      
      // Beräkna avstånd från center
      const distance = Math.sqrt(dx * dx + dy * dy);
      const maxDistance = containerRadius - knobRadius;
      
      let finalX = dx;
      let finalY = dy;
      
      // Begränsa till cirkel
      if (distance > maxDistance) {
        const angle = Math.atan2(dy, dx);
        finalX = Math.cos(angle) * maxDistance;
        finalY = Math.sin(angle) * maxDistance;
      }
      
      // Uppdatera knob position
      knobAnim.setValue({ x: finalX, y: finalY });
      
      // Skicka normaliserade värden (-1 till 1)
      const normalizedX = finalX / maxDistance;
      const normalizedY = finalY / maxDistance;
      
      onMove({ x: normalizedX, y: normalizedY });
    },

    onPanResponderRelease: () => {
      setIsDragging(false);
      knobAnim.flattenOffset();
      
      // Animera tillbaka till center
      Animated.spring(knobAnim, {
        toValue: { x: 0, y: 0 },
        useNativeDriver: false,
        tension: 150,
        friction: 8,
      }).start();
      
      onStop();
    },
  });

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {/* Outer Circle */}
      <View style={[styles.outerCircle, { 
        width: size, 
        height: size,
        borderRadius: size / 2 
      }]} />
      
      {/* Knob */}
      <Animated.View
        style={[
          styles.knob,
          {
            width: knobRadius * 2,
            height: knobRadius * 2,
            borderRadius: knobRadius,
            transform: knobAnim.getTranslateTransform(),
          },
          isDragging && styles.knobActive
        ]}
        {...panResponder.panHandlers}
      >
        <View style={styles.knobInner} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  outerCircle: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    position: 'absolute',
  },
  knob: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  knobActive: {
    backgroundColor: '#00B04F',
  },
  knobInner: {
    width: '50%',
    height: '50%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 999,
  },
});

export default VirtualJoystick;