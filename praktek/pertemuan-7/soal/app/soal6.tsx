import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

// Define the profile interface
interface Profile {
  firstName: string;
  lastName: string;
  email: string;
  bio: string;
  birthDate: string;
}

export default function Soal6Screen() {
  // TODO: Implement state and handlers

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Profile Editor</Text>

        {/* Computed Full Name Display */}
        <View style={styles.fullNameContainer}>
          <Text style={styles.fullNameLabel}>Full Name:</Text>
          <Text style={styles.fullNameValue}>{/* TODO: Display full name */}</Text>
        </View>

        {/* First Name Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your first name"
            placeholderTextColor="#999"
          />
        </View>

        {/* Last Name Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your last name"
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

        {/* Birth Date Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Birth Date</Text>
          <TextInput
            style={styles.input}
            placeholder="YYYY-MM-DD"
            placeholderTextColor="#999"
          />
        </View>

        {/* Bio Input (multiline) */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Bio</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Tell us about yourself..."
            multiline={true}
            numberOfLines={4}
            textAlignVertical="top"
            placeholderTextColor="#999"
          />
        </View>

        {/* Save Profile Button */}
        <TouchableOpacity
          style={styles.saveButton}
          activeOpacity={0.7}
        >
          <Text style={styles.saveButtonText}>Save Profile</Text>
        </TouchableOpacity>

        {/* Profile Preview */}
        <View style={styles.previewContainer}>
          <Text style={styles.previewTitle}>Profile Preview</Text>
          
          <View style={styles.previewItem}>
            <Text style={styles.previewLabel}>Full Name:</Text>
            <Text style={styles.previewValue}>{/* TODO: Display full name */}</Text>
          </View>

          <View style={styles.previewItem}>
            <Text style={styles.previewLabel}>First Name:</Text>
            <Text style={styles.previewValue}>
              {/* TODO: Display first name */}
            </Text>
          </View>

          <View style={styles.previewItem}>
            <Text style={styles.previewLabel}>Last Name:</Text>
            <Text style={styles.previewValue}>
              {/* TODO: Display last name */}
            </Text>
          </View>

          <View style={styles.previewItem}>
            <Text style={styles.previewLabel}>Email:</Text>
            <Text style={styles.previewValue}>
              {/* TODO: Display email */}
            </Text>
          </View>

          <View style={styles.previewItem}>
            <Text style={styles.previewLabel}>Birth Date:</Text>
            <Text style={styles.previewValue}>
              {/* TODO: Display birth date */}
            </Text>
          </View>

          <View style={styles.previewItem}>
            <Text style={styles.previewLabel}>Bio:</Text>
            <Text style={styles.previewValue}>
              {/* TODO: Display bio */}
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
  fullNameContainer: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  fullNameLabel: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 5,
  },
  fullNameValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
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
  textArea: {
    height: 100,
    paddingTop: 12,
  },
  saveButton: {
    backgroundColor: '#34C759',
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
  saveButtonText: {
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
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  previewLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 4,
  },
  previewValue: {
    fontSize: 14,
    color: '#333',
  },
});
