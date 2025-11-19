import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function Soal5Screen() {
  // TODO: Implement state variables and handlers

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>User Registration Form</Text>

        {/* Name Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            placeholderTextColor="#999"
          />
        </View>

        {/* Email Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#999"
          />
        </View>

        {/* Phone Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Phone</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
            placeholderTextColor="#999"
          />
        </View>

        {/* Password Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            secureTextEntry={true}
            autoCapitalize="none"
            placeholderTextColor="#999"
          />
        </View>

        {/* Confirm Password Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirm your password"
            secureTextEntry={true}
            autoCapitalize="none"
            placeholderTextColor="#999"
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={styles.submitButton}
          activeOpacity={0.7}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>

        {/* Real-time Preview */}
        <View style={styles.previewContainer}>
          <Text style={styles.previewTitle}>Live Preview</Text>
          
          <View style={styles.previewItem}>
            <Text style={styles.previewLabel}>Name:</Text>
            <Text style={styles.previewValue}>{/* TODO: Display name */}</Text>
          </View>

          <View style={styles.previewItem}>
            <Text style={styles.previewLabel}>Email:</Text>
            <Text style={styles.previewValue}>{/* TODO: Display email */}</Text>
          </View>

          <View style={styles.previewItem}>
            <Text style={styles.previewLabel}>Phone:</Text>
            <Text style={styles.previewValue}>{/* TODO: Display phone */}</Text>
          </View>

          <View style={styles.previewItem}>
            <Text style={styles.previewLabel}>Password:</Text>
            <Text style={styles.previewValue}>
              {/* TODO: Display password */}
            </Text>
          </View>

          <View style={styles.previewItem}>
            <Text style={styles.previewLabel}>Confirm Password:</Text>
            <Text style={styles.previewValue}>
              {/* TODO: Display confirm password */}
            </Text>
          </View>

          {/* Password Match Indicator */}
          <View style={styles.matchIndicator}>
            <Text style={styles.matchText}>
              {/* TODO: Display password match status */}
            </Text>
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
  formContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D1D6',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
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
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  previewContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#D1D1D6',
  },
  previewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  previewItem: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  previewLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    width: 150,
  },
  previewValue: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  matchIndicator: {
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  matchText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  matchSuccess: {
    color: '#34C759',
  },
  matchError: {
    color: '#FF3B30',
  },
});
