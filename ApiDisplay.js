
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView
} from 'react-native';

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
    <ScrollView style={styles.container}>
      <Text style={styles.title}>API Posts</Text>
      <Text style={styles.subtitle}>
  Latest posts from JSONPlaceholder
</Text>

      {loading && <Text>Loading...</Text>}

      {error !== '' && <Text>Error: {error}</Text>}

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
    marginBottom: 20,
    marginTop: 30,
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
  
  subtitle: {
  fontSize: 15,
  color: '#777777',
  marginBottom: 20,
},
});
