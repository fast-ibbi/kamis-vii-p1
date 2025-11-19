import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// Define the props interface
interface GreetingProps {
  name?: string;
  age?: number;
  city?: string;
}

// Greeting Component with destructuring and default props
const Greeting: React.FC<GreetingProps> = ({ 
  name = 'Guest', 
  age = 0, 
  city = 'Unknown' 
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.greetingText}>
        {/* TODO: Display greeting */}
      </Text>
    </View>
  );
};

// Main Screen Component
export default function Soal1Screen() {
  return (
    <View style={styles.screenContainer}>
      {/* TODO: Render Greeting components */}
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  container: {
    marginVertical: 10,
  },
  greetingText: {
    fontSize: 18,
    color: 'blue',
  },
});
