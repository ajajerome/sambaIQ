import React from 'react';
import Svg, { Circle, Rect, Line, Defs, RadialGradient, Stop } from 'react-native-svg';

interface HeatMapOverlayProps {
  width: number;
  height: number;
  playerPosition: { x: number; y: number };
  optimalPosition: { x: number; y: number };
  threatSources: Array<{ x: number; y: number }>;
}

const HeatMapOverlay: React.FC<HeatMapOverlayProps> = ({
  width,
  height,
  playerPosition,
  optimalPosition,
  threatSources
}) => {
  return (
    <Svg width={width} height={height} style={{ position: 'absolute', top: 0, left: 0 }}>
      <Defs>
        {/* Danger Zone Gradient */}
        <RadialGradient id="dangerZone" cx="50%" cy="50%" r="50%">
          <Stop offset="0%" stopColor="#FF3B30" stopOpacity="0.6" />
          <Stop offset="100%" stopColor="#FF3B30" stopOpacity="0.1" />
        </RadialGradient>
        
        {/* Safe Zone Gradient */}
        <RadialGradient id="safeZone" cx="50%" cy="50%" r="50%">
          <Stop offset="0%" stopColor="#00D4AA" stopOpacity="0.4" />
          <Stop offset="100%" stopColor="#00D4AA" stopOpacity="0.1" />
        </RadialGradient>
      </Defs>

      {/* Threat Zones */}
      {threatSources.map((threat, index) => (
        <Circle
          key={`threat-${index}`}
          cx={width * threat.x / 100}
          cy={height * threat.y / 100}
          r={40}
          fill="url(#dangerZone)"
        />
      ))}

      {/* Optimal Zone */}
      <Circle
        cx={width * optimalPosition.x / 100}
        cy={height * optimalPosition.y / 100}
        r={30}
        fill="url(#safeZone)"
      />
      
      {/* Ghost Player (Optimal Position) */}
      <Circle
        cx={width * optimalPosition.x / 100}
        cy={height * optimalPosition.y / 100}
        r={12}
        fill="#FFFFFF"
        opacity={0.6}
        stroke="#00D4AA"
        strokeWidth={2}
        strokeDasharray="4,4"
      />
    </Svg>
  );
};

interface ThreatLinesProps {
  width: number;
  height: number;
  threats: Array<{ x: number; y: number }>;
  goalPosition: { x: number; y: number };
}

const ThreatLines: React.FC<ThreatLinesProps> = ({
  width,
  height,
  threats,
  goalPosition
}) => {
  return (
    <Svg width={width} height={height} style={{ position: 'absolute', top: 0, left: 0 }}>
      {threats.map((threat, index) => (
        <Line
          key={`threat-line-${index}`}
          x1={width * threat.x / 100}
          y1={height * threat.y / 100}
          x2={width * goalPosition.x / 100}
          y2={height * goalPosition.y / 100}
          stroke="#FF3B30"
          strokeWidth={3}
          strokeDasharray="8,4"
          opacity={0.7}
        />
      ))}
    </Svg>
  );
};

export { HeatMapOverlay, ThreatLines };