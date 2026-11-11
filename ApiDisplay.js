
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ApiDisplay() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/posts?_limit=5'
        );

        const result = await response.json();
        setPosts(result);

      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>API Posts</Text>
      <Text>Fetched posts: {posts.length}</Text>
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
