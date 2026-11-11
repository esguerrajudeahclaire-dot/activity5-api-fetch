
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ApiDisplay() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>API Posts</Text>
      <Text>Posts will appear here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
});
