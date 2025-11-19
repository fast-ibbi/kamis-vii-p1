import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Define the props interface
interface CustomButtonProps {
  title?: string;
  onPress?: () => void;
  backgroundColor?: string;
  textColor?: string;
}

// CustomButton Component with destructuring and default props
const CustomButton: React.FC<CustomButtonProps> = ({
  title = 'Button',
  onPress = () => {},
  backgroundColor = '#007AFF',
  textColor = '#FFFFFF',
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.buttonText, { color: textColor }]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

// Main Screen Component
export default function Soal2Screen() {
  // TODO: Implement button press handler

  return (
    <View style={styles.screenContainer}>
      {/* TODO: Render CustomButton components */}
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
  button: {
    padding: 15,
    borderRadius: 8,
    marginVertical: 8,
    minWidth: 200,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
