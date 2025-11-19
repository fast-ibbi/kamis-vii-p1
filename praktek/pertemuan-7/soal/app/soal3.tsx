import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// Define the props interface for TypeScript
interface UserCardProps {
  name: string;
  email: string;
  age: number;
  isActive?: boolean;
}

// UserCard Component
const UserCard: React.FC<UserCardProps> = ({ name, email, age, isActive = false }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{/* TODO: Display name */}</Text>
      <Text style={styles.email}>{/* TODO: Display email */}</Text>
      <Text style={styles.age}>{/* TODO: Display age */}</Text>
      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>
          {/* TODO: Display status */}
        </Text>
      </View>
    </View>
  );
};

// PropTypes validation
UserCard.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  isActive: PropTypes.bool,
};

// Default props
UserCard.defaultProps = {
  isActive: false,
};

// Main Screen Component
export default function Soal3Screen() {
  return (
    <View style={styles.screenContainer}>
      {/* TODO: Render UserCard components */}
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // For Android shadow
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  email: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  age: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  statusContainer: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});
