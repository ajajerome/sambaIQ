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
  size = 140 // FIFA Mobile style size
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const knobAnim = useRef(new Animated.ValueXY()).current;
  const opacityAnim = useRef(new Animated.Value(0.6)).current;
  
  const knobRadius = size * 0.25; // Smaller knob like FIFA
  const containerRadius = size * 0.5;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,

    onPanResponderGrant: () => {
      setIsDragging(true);
      
      // Fade in when active (FIFA style)
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: false,
      }).start();
      
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
      
      // Fade out när inactive (FIFA style)
      Animated.timing(opacityAnim, {
        toValue: 0.6,
        duration: 200,
        useNativeDriver: false,
      }).start();
      
      // Animera tillbaka till center
      Animated.spring(knobAnim, {
        toValue: { x: 0, y: 0 },
        useNativeDriver: false,
        tension: 200,
        friction: 8,
      }).start();
      
      onStop();
    },
  });

  return (
    <Animated.View 
      style={[
        styles.container, 
        { 
          width: size, 
          height: size,
          opacity: opacityAnim 
        }
      ]}
    >
      {/* Outer Ring - FIFA Mobile style */}
      <View style={[styles.outerRing, { 
        width: size, 
        height: size,
        borderRadius: size / 2 
      }]} />
      
      {/* Inner guidance circle */}
      <View style={[styles.innerRing, { 
        width: size * 0.7, 
        height: size * 0.7,
        borderRadius: size * 0.35 
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
        <View style={styles.knobCenter} />
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  outerRing: {
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    position: 'absolute',
  },
  innerRing: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    position: 'absolute',
  },
  knob: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(0, 176, 79, 0.8)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  knobActive: {
    backgroundColor: '#00B04F',
    borderColor: '#fff',
    transform: [{ scale: 1.1 }],
  },
  knobCenter: {
    width: 8,
    height: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 4,
  },
});

export default VirtualJoystick;