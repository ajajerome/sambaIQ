import React, { useRef, useState } from 'react';
import { View, StyleSheet, PanResponder, Dimensions } from 'react-native';
import Svg, { Path, Circle, Line } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

interface Point {
  x: number;
  y: number;
}

interface DrawingCanvasProps {
  width: number;
  height: number;
  onDrawingComplete: (path: string, type: 'line' | 'circle' | 'arrow') => void;
  disabled?: boolean;
  children?: React.ReactNode;
}

const DrawingCanvas: React.FC<DrawingCanvasProps> = ({
  width,
  height,
  onDrawingComplete,
  disabled = false,
  children
}) => {
  const [currentPath, setCurrentPath] = useState<string>('');
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState<Point | null>(null);
  const pathRef = useRef<string>('');

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => !disabled,
    onMoveShouldSetPanResponder: () => !disabled && isDrawing,

    onPanResponderGrant: (event) => {
      if (disabled) return;
      
      const { locationX, locationY } = event.nativeEvent;
      const point = { x: locationX, y: locationY };
      
      setStartPoint(point);
      setIsDrawing(true);
      
      // Start new path
      pathRef.current = `M${locationX},${locationY}`;
      setCurrentPath(pathRef.current);
    },

    onPanResponderMove: (event) => {
      if (disabled || !isDrawing) return;
      
      const { locationX, locationY } = event.nativeEvent;
      
      // Add line to current point
      pathRef.current += ` L${locationX},${locationY}`;
      setCurrentPath(pathRef.current);
    },

    onPanResponderRelease: () => {
      if (disabled || !isDrawing) return;
      
      setIsDrawing(false);
      
      // Analyze the drawn path to determine type
      const drawingType = analyzeDrawing(pathRef.current, startPoint);
      
      // Call callback with completed drawing
      onDrawingComplete(pathRef.current, drawingType);
      
      // Clear current path
      setCurrentPath('');
      pathRef.current = '';
      setStartPoint(null);
    }
  });

  const analyzeDrawing = (path: string, start: Point | null): 'line' | 'circle' | 'arrow' => {
    if (!start || !path) return 'line';
    
    // Extract points from path
    const points = extractPointsFromPath(path);
    if (points.length < 2) return 'line';
    
    const firstPoint = points[0];
    const lastPoint = points[points.length - 1];
    
    // Check if it's roughly a circle (end point close to start point)
    const distance = Math.sqrt(
      Math.pow(lastPoint.x - firstPoint.x, 2) + 
      Math.pow(lastPoint.y - firstPoint.y, 2)
    );
    
    if (distance < 50 && points.length > 10) {
      return 'circle';
    }
    
    // Check if it's roughly straight (arrow/line)
    const totalDistance = Math.sqrt(
      Math.pow(lastPoint.x - firstPoint.x, 2) + 
      Math.pow(lastPoint.y - firstPoint.y, 2)
    );
    
    // If the path is relatively straight, consider it a line/arrow
    if (totalDistance > 80) {
      return 'arrow';
    }
    
    return 'line';
  };

  const extractPointsFromPath = (path: string): Point[] => {
    const points: Point[] = [];
    const commands = path.split(/[ML]/);
    
    commands.forEach(command => {
      const coords = command.trim().split(',');
      if (coords.length === 2) {
        const x = parseFloat(coords[0]);
        const y = parseFloat(coords[1]);
        if (!isNaN(x) && !isNaN(y)) {
          points.push({ x, y });
        }
      }
    });
    
    return points;
  };

  return (
    <View style={[styles.container, { width, height }]} {...panResponder.panHandlers}>
      <Svg width={width} height={height} style={StyleSheet.absoluteFillObject}>
        {children}
        
        {/* Current drawing path */}
        {currentPath && (
          <Path
            d={currentPath}
            stroke="#007AFF"
            strokeWidth={4}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={0.8}
          />
        )}
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
});

export default DrawingCanvas;