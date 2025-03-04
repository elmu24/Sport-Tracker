import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

// Creating ProgressCircle
export function ProgressCircle({ rings, size, children }) {
  // Defining size 
  const center = size / 2;
  
  // Layout for component
  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        {rings.map((ring, index) => {
          const strokeWidth = ring.strokeWidth;
          const radius = (size - strokeWidth) / 2 - (index * 20); // Space rings apart
          const circumference = radius * 2 * Math.PI;
          const strokeDashoffset = circumference - (ring.progress * circumference);

          return (
            <React.Fragment key={index}>
              <Circle
                stroke="#333"
                fill="none"
                cx={center}
                cy={center}
                r={radius}
                strokeWidth={strokeWidth}
              />
              <Circle
                stroke={ring.color}
                fill="none"
                cx={center}
                cy={center}
                r={radius}
                strokeWidth={strokeWidth}
                strokeDasharray={`${circumference} ${circumference}`}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                transform={`rotate(-90 ${center} ${center})`}
              />
            </React.Fragment>
          );
        })}
      </Svg>
      <View style={[styles.content, { width: size, height: size }]}>
        {children}
      </View>
    </View>
  );
}

// Style of component 
const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  content: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});