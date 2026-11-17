
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable
} from 'react-native';

export default function ApiDisplay() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  const fetchPosts = async () => {
    try {
      setError('');

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
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const refreshPosts = () => {
    setRefreshing(true);
    fetchPosts();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>API Posts</Text>

      <Text style={styles.subtitle}>
        Latest posts from JSONPlaceholder
      </Text>

      <Pressable
        style={styles.button}
        onPress={refreshPosts}
        disabled={refreshing}
      >
        <Text style={styles.buttonText}>
          {refreshing ? 'Refreshing...' : 'Refresh Posts'}
        </Text>
      </Pressable>

      {loading && <Text>Loading...</Text>}

      {error !== '' && <Text style={styles.error}>
        Error: {error}
      </Text>}

      {!loading && error === '' && (
        <View>
          {posts.map((post) => (
            <View key={post.id} style={styles.card}>
              <Text style={styles.postId}>
                Post #{post.id}
              </Text>

              <Text style={styles.postTitle}>
                {post.title}
              </Text>

              <Text style={styles.body}>
                {post.body}
              </Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 30,
  },

  subtitle: {
    fontSize: 15,
    color: '#777777',
    marginBottom: 20,
  },

  button: {
    backgroundColor: '#344B3A',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  error: {
    color: 'red',
    marginBottom: 15,
  },

  card: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },

  postId: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 5,
  },

  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  body: {
    fontSize: 15,
    color: '#444444',
  },
});
