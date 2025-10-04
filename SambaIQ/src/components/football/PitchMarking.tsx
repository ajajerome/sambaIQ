import React from 'react';
import Svg, { Path, Circle, Rect, Polygon } from 'react-native-svg';

interface PitchMarkingProps {
  type: 'arrow' | 'zone' | 'target' | 'path' | 'block';
  x: number; // Position på plan (0-100%)
  y: number;
  direction?: number; // Riktning i grader (0-360)
  width?: number; // För zoner
  height?: number;
  color?: string;
  animated?: boolean;
}

const PitchMarking: React.FC<PitchMarkingProps> = ({ 
  type, 
  x, 
  y, 
  direction = 0, 
  width = 10, 
  height = 10, 
  color = '#FFD700',
  animated = false 
}) => {
  
  const renderArrow = () => (
    <Polygon
      points="0,5 15,0 12,3 8,3 8,7 12,7 15,10"
      fill={color}
      stroke="#000"
      strokeWidth={1}
      transform={`rotate(${direction} 7.5 5)`}
    />
  );

  const renderZone = () => (
    <Rect
      x={-width/2}
      y={-height/2}
      width={width}
      height={height}
      fill="rgba(255, 215, 0, 0.3)"
      stroke={color}
      strokeWidth={2}
      strokeDasharray="5,3"
    />
  );

  const renderTarget = () => (
    <Circle
      r={8}
      fill="transparent"
      stroke={color}
      strokeWidth={3}
      strokeDasharray="4,2"
    />
  );

  const renderPath = () => (
    <Path
      d={`M 0 0 Q ${width/2} ${-height/2} ${width} 0`}
      fill="none"
      stroke={color}
      strokeWidth={3}
      strokeDasharray="6,4"
      markerEnd="url(#arrowhead)"
    />
  );

  const renderBlock = () => (
    <Rect
      x={-width/2}
      y={-height/2}
      width={width}
      height={height}
      fill="rgba(255, 59, 48, 0.4)"
      stroke="#FF3B30"
      strokeWidth={2}
    />
  );

  const getMarking = () => {
    switch (type) {
      case 'arrow': return renderArrow();
      case 'zone': return renderZone();
      case 'target': return renderTarget();
      case 'path': return renderPath();
      case 'block': return renderBlock();
      default: return renderTarget();
    }
  };

  return (
    <g transform={`translate(${x}, ${y})`}>
      {getMarking()}
    </g>
  );
};

export default PitchMarking;