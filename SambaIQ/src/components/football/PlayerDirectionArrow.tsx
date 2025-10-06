import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import Svg, { Path, Defs, Marker, Polygon } from 'react-native-svg';

interface PlayerDirectionArrowProps {
  fromX: number; // Player position
  fromY: number;
  toX: number; // Target/direction
  toY: number;
  pitchWidth: number;
  pitchHeight: number;
  color?: string;
  animated?: boolean;
  visible?: boolean;
}

const PlayerDirectionArrow: React.FC<PlayerDirectionArrowProps> = ({
  fromX,
  fromY, 
  toX,
  toY,
  pitchWidth,
  pitchHeight,
  color = '#FFD700',
  animated = true,
  visible = true
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible && animated) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(animatedValue, {
            toValue: 1,
            duration: 800,
            useNativeDriver: false,
          }),
          Animated.timing(animatedValue, {
            toValue: 0.3,
            duration: 400,
            useNativeDriver: false,
          }),
        ])
      ).start();
    }
  }, [visible, animated]);

  if (!visible) return null;

  // Konvertera procent till actual coordinates
  const startX = (fromX / 100) * pitchWidth;
  const startY = (fromY / 100) * pitchHeight;
  const endX = (toX / 100) * pitchWidth;
  const endY = (toY / 100) * pitchHeight;

  // Beräkna riktning
  const angle = Math.atan2(endY - startY, endX - startX) * (180 / Math.PI);
  
  // Förkorta pilen så den inte går helt till målet
  const distance = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2);
  const shortenedDistance = Math.min(distance * 0.6, 60); // Max 60px long
  
  const shortEndX = startX + Math.cos(angle * Math.PI / 180) * shortenedDistance;
  const shortEndY = startY + Math.sin(angle * Math.PI / 180) * shortenedDistance;

  return (
    <Svg 
      width={pitchWidth} 
      height={pitchHeight} 
      style={{ position: 'absolute', pointerEvents: 'none' }}
    >
      <Defs>
        <Marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="9"
          refY="3.5"
          orient="auto"
        >
          <Polygon
            points="0 0, 10 3.5, 0 7"
            fill={color}
            stroke={color}
          />
        </Marker>
      </Defs>
      
      <Animated.G opacity={animatedValue}>
        <Path
          d={`M ${startX} ${startY} L ${shortEndX} ${shortEndY}`}
          stroke={color}
          strokeWidth={4}
          strokeDasharray="8,4"
          markerEnd="url(#arrowhead)"
        />
      </Animated.G>
    </Svg>
  );
};

export default PlayerDirectionArrow;