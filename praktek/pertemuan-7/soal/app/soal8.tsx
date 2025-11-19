import React from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

// Conversion functions
const toCelsius = (fahrenheit: number): number => {
  return ((fahrenheit - 32) * 5) / 9;
};

const toFahrenheit = (celsius: number): number => {
  return (celsius * 9) / 5 + 32;
};

// Scale names
const scaleNames: { [key: string]: string } = {
  c: 'Celsius',
  f: 'Fahrenheit',
};

// Props interface for TemperatureInput
interface TemperatureInputProps {
  scale: 'c' | 'f';
  temperature: string;
  onTemperatureChange: (temperature: string) => void;
}

// Child Component: TemperatureInput
const TemperatureInput: React.FC<TemperatureInputProps> = ({
  scale,
  temperature,
  onTemperatureChange,
}) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>
        Enter temperature in {scaleNames[scale]}:
      </Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          value={temperature}
          onChangeText={onTemperatureChange}
          keyboardType="numeric"
          placeholder="0"
          placeholderTextColor="#999"
        />
        <Text style={styles.unit}>°{scale.toUpperCase()}</Text>
      </View>
    </View>
  );
};

// Props interface for BoilingVerdict
interface BoilingVerdictProps {
  celsius: number;
}

// Child Component: BoilingVerdict
const BoilingVerdict: React.FC<BoilingVerdictProps> = ({ celsius }) => {
  const isBoiling = celsius >= 100;
  
  return (
    <View style={[
      styles.verdictContainer,
      isBoiling ? styles.verdictBoiling : styles.verdictNotBoiling
    ]}>
      <Text style={styles.verdictIcon}>
        {isBoiling ? '���' : '❄️'}
      </Text>
      <Text style={[
        styles.verdictText,
        isBoiling ? styles.verdictTextBoiling : styles.verdictTextNotBoiling
      ]}>
        {isBoiling
          ? 'The water would boil.'
          : 'The water would not boil.'}
      </Text>
      <Text style={styles.verdictDetail}>
        Water boils at 100°C (212°F)
      </Text>
    </View>
  );
};

// Parent Component: Calculator
export default function Soal8Screen() {
  // TODO: Implement state and handlers

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Temperature Converter</Text>
        <Text style={styles.subtitle}>Lifting State Up Example</Text>

        {/* Temperature Inputs */}
        <View style={styles.inputsSection}>
          {/* TODO: Add TemperatureInput components */}
        </View>

        {/* Boiling Verdict */}
        {/* TODO: Add BoilingVerdict component */}

        {/* Info Section */}
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>How it works:</Text>
          <Text style={styles.infoText}>
            • The parent component (Calculator) manages the temperature state
          </Text>
          <Text style={styles.infoText}>
            • Two child components (TemperatureInput) receive and update the shared state
          </Text>
          <Text style={styles.infoText}>
            • The third child (BoilingVerdict) displays whether water would boil
          </Text>
          <Text style={styles.infoText}>
            • When you type in one input, the other automatically updates
          </Text>
        </View>

        {/* Conversion Formulas */}
        <View style={styles.formulaSection}>
          <Text style={styles.formulaTitle}>Conversion Formulas:</Text>
          <View style={styles.formulaItem}>
            <Text style={styles.formulaLabel}>Celsius to Fahrenheit:</Text>
            <Text style={styles.formulaText}>°F = (°C × 9/5) + 32</Text>
          </View>
          <View style={styles.formulaItem}>
            <Text style={styles.formulaLabel}>Fahrenheit to Celsius:</Text>
            <Text style={styles.formulaText}>°C = (°F - 32) × 5/9</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    fontStyle: 'italic',
  },
  inputsSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputContainer: {
    marginVertical: 10,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#007AFF',
    paddingHorizontal: 15,
  },
  input: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    paddingVertical: 12,
  },
  unit: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
    marginLeft: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 15,
  },
  verdictContainer: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  verdictBoiling: {
    backgroundColor: '#FFE5E5',
    borderWidth: 2,
    borderColor: '#FF3B30',
  },
  verdictNotBoiling: {
    backgroundColor: '#E5F3FF',
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  verdictIcon: {
    fontSize: 48,
    marginBottom: 10,
  },
  verdictText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  verdictTextBoiling: {
    color: '#FF3B30',
  },
  verdictTextNotBoiling: {
    color: '#007AFF',
  },
  verdictDetail: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  infoSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 20,
  },
  formulaSection: {
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  formulaTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  formulaItem: {
    marginBottom: 12,
  },
  formulaLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 4,
  },
  formulaText: {
    fontSize: 16,
    fontFamily: 'monospace',
    color: '#007AFF',
    fontWeight: 'bold',
  },
});
