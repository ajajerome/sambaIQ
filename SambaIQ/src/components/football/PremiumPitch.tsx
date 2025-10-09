import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { 
  Defs, 
  LinearGradient, 
  Stop, 
  RadialGradient,
  Rect, 
  Circle, 
  Line, 
  Ellipse,
  Path
} from 'react-native-svg';

interface PremiumPitchProps {
  width: number;
  height: number;
  children?: React.ReactNode;
}

const PremiumPitch: React.FC<PremiumPitchProps> = ({ width, height, children }) => {
  return (
    <View style={styles.container}>
      <Svg width={width} height={height} style={styles.pitch}>
        <Defs>
          {/* Grass Gradient - Professional Football Look */}
          <LinearGradient id="grassGradient" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor="#2E8B57" stopOpacity="1" />
            <Stop offset="50%" stopColor="#228B22" stopOpacity="1" />
            <Stop offset="100%" stopColor="#006400" stopOpacity="1" />
          </LinearGradient>
          
          {/* Pitch Shadow Gradient */}
          <RadialGradient id="pitchShadow" cx="50%" cy="50%" r="70%">
            <Stop offset="0%" stopColor="transparent" stopOpacity="0" />
            <Stop offset="70%" stopColor="transparent" stopOpacity="0" />
            <Stop offset="100%" stopColor="#000000" stopOpacity="0.15" />
          </RadialGradient>
          
          {/* Goal Area Gradient */}
          <LinearGradient id="goalGradient" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor="rgba(255, 255, 255, 0.2)" stopOpacity="1" />
            <Stop offset="100%" stopColor="rgba(255, 255, 255, 0.05)" stopOpacity="1" />
          </LinearGradient>
          
          {/* Center Circle Gradient */}
          <RadialGradient id="centerGradient" cx="50%" cy="50%" r="50%">
            <Stop offset="0%" stopColor="rgba(255, 255, 255, 0.1)" stopOpacity="1" />
            <Stop offset="100%" stopColor="rgba(255, 255, 255, 0.3)" stopOpacity="1" />
          </RadialGradient>
        </Defs>

        {/* Main Pitch Background with Gradient */}
        <Rect
          x={0}
          y={0}
          width={width}
          height={height}
          fill="url(#grassGradient)"
          rx={8}
          ry={8}
        />
        
        {/* Pitch Shadow/Depth Effect */}
        <Rect
          x={0}
          y={0}
          width={width}
          height={height}
          fill="url(#pitchShadow)"
          rx={8}
          ry={8}
        />

        {/* Professional Pitch Markings */}
        
        {/* Outer Border with Premium Style */}
        <Rect
          x={4}
          y={4}
          width={width - 8}
          height={height - 8}
          fill="none"
          stroke="#FFFFFF"
          strokeWidth={3}
          rx={4}
          ry={4}
          opacity={0.9}
        />

        {/* Center Line with Glow Effect */}
        <Line
          x1={0}
          y1={height / 2}
          x2={width}
          y2={height / 2}
          stroke="#FFFFFF"
          strokeWidth={3}
          opacity={0.9}
        />
        
        {/* Center Line Glow */}
        <Line
          x1={0}
          y1={height / 2}
          x2={width}
          y2={height / 2}
          stroke="#FFFFFF"
          strokeWidth={6}
          opacity={0.3}
        />

        {/* Enhanced Center Circle */}
        <Circle
          cx={width / 2}
          cy={height / 2}
          r={width * 0.12}
          fill="url(#centerGradient)"
          stroke="#FFFFFF"
          strokeWidth={2.5}
          opacity={0.8}
        />
        
        {/* Center Spot */}
        <Circle
          cx={width / 2}
          cy={height / 2}
          r={4}
          fill="#FFFFFF"
          opacity={0.9}
        />

        {/* Enhanced Goal Areas */}
        
        {/* Top Goal Area (Penalty Box) */}
        <Rect
          x={width * 0.25}
          y={0}
          width={width * 0.5}
          height={height * 0.18}
          fill="url(#goalGradient)"
          stroke="#FFFFFF"
          strokeWidth={2.5}
          opacity={0.8}
        />
        
        {/* Top Goal Area (6-yard box) */}
        <Rect
          x={width * 0.35}
          y={0}
          width={width * 0.3}
          height={height * 0.1}
          fill="none"
          stroke="#FFFFFF"
          strokeWidth={2}
          opacity={0.8}
        />

        {/* Bottom Goal Area (Penalty Box) */}
        <Rect
          x={width * 0.25}
          y={height * 0.82}
          width={width * 0.5}
          height={height * 0.18}
          fill="url(#goalGradient)"
          stroke="#FFFFFF"
          strokeWidth={2.5}
          opacity={0.8}
        />
        
        {/* Bottom Goal Area (6-yard box) */}
        <Rect
          x={width * 0.35}
          y={height * 0.9}
          width={width * 0.3}
          height={height * 0.1}
          fill="none"
          stroke="#FFFFFF"
          strokeWidth={2}
          opacity={0.8}
        />

        {/* Premium Goal Posts */}
        
        {/* Top Goal */}
        <Rect
          x={width * 0.42}
          y={-2}
          width={width * 0.16}
          height={6}
          fill="#FFFFFF"
          rx={3}
          ry={3}
        />
        
        {/* Bottom Goal */}
        <Rect
          x={width * 0.42}
          y={height - 4}
          width={width * 0.16}
          height={6}
          fill="#FFFFFF"
          rx={3}
          ry={3}
        />

        {/* Corner Arcs */}
        <Path
          d={`M ${width * 0.05} 0 A 15 15 0 0 1 0 ${height * 0.05}`}
          fill="none"
          stroke="#FFFFFF"
          strokeWidth={2}
          opacity={0.7}
        />
        <Path
          d={`M ${width * 0.95} 0 A 15 15 0 0 0 ${width} ${height * 0.05}`}
          fill="none"
          stroke="#FFFFFF"
          strokeWidth={2}
          opacity={0.7}
        />
        <Path
          d={`M 0 ${height * 0.95} A 15 15 0 0 1 ${width * 0.05} ${height}`}
          fill="none"
          stroke="#FFFFFF"
          strokeWidth={2}
          opacity={0.7}
        />
        <Path
          d={`M ${width} ${height * 0.95} A 15 15 0 0 0 ${width * 0.95} ${height}`}
          fill="none"
          stroke="#FFFFFF"
          strokeWidth={2}
          opacity={0.7}
        />

        {/* Penalty Spots */}
        <Circle
          cx={width / 2}
          cy={height * 0.12}
          r={3}
          fill="#FFFFFF"
          opacity={0.9}
        />
        <Circle
          cx={width / 2}
          cy={height * 0.88}
          r={3}
          fill="#FFFFFF"
          opacity={0.9}
        />

        {children}
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  pitch: {
    backgroundColor: 'transparent',
    borderRadius: 12,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
});

export default PremiumPitch;