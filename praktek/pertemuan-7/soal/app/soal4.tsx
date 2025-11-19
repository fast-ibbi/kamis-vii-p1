import React from 'react';
import { Animated, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Soal4Screen() {
  // TODO: Implement state and handlers

  return (
    <ScrollView contentContainerStyle={styles.screenContainer}>
      {/* Counter Display */}
      <View style={styles.counterContainer}>
        <Text style={styles.label}>Counter Value:</Text>
        <Text style={styles.countText}>
          {/* TODO: Display count */}
        </Text>
      </View>

      {/* Control Buttons */}
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>Increment (+1)</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>
              Decrement (-1)
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, styles.buttonAddFive]}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>Add 5 (+5)</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.buttonReset]}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>Reset (0)</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* History Section */}
      <View style={styles.historyContainer}>
        <Text style={styles.historyTitle}>History (Last 5 Actions):</Text>
        <Text style={styles.historyEmpty}>{/* TODO: Display history */}</Text>
      </View>

      {/* Status Indicator */}
      <View style={styles.statusContainer}>
        <Text style={styles.statusLabel}>Status: </Text>
        <Text style={styles.statusValue}>
          {/* TODO: Display status */}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    alignItems: 'center',
  },
  counterContainer: {
    marginVertical: 30,
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
  },
  countText: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  buttonsContainer: {
    width: '100%',
    marginVertical: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  button: {
    flex: 1,
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#D1D1D6',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonTextDisabled: {
    color: '#8E8E93',
  },
  buttonAddFive: {
    backgroundColor: '#34C759',
  },
  buttonReset: {
    backgroundColor: '#FF9500',
  },
  historyContainer: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginVertical: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  historyEmpty: {
    fontSize: 14,
    color: '#8E8E93',
    fontStyle: 'italic',
  },
  historyItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  historyText: {
    fontSize: 14,
    color: '#333',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  statusLabel: {
    fontSize: 16,
    color: '#333',
  },
  statusValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
