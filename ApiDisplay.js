
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ApiDisplay() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/posts?_limit=5'
        );

        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }

        const result = await response.json();
        setPosts(result);

      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>API Posts</Text>

      {loading && <Text>Loading...</Text>}

      {error !== '' && <Text>{error}</Text>}

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
