import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

const newsPage = ({ navigation }) => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getNewsData = async () => {
      try {
        const resp = await axios.get('https://newsapi.org/v2/top-headlines/sources?apiKey=90bbee7dd73f462f938cad226de85049&language=en');
        setNewsData(resp.data.sources);
      } catch (error) {
        console.error('Error fetching news data:', error);
      } finally {
        setLoading(false);
      }
    };

    getNewsData();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.newsItem}
      onPress={() => navigation.navigate('newsDetails', { news: { id: item.id, name: item.name } })}
    >
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={newsData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  newsItem: {
    borderBottomWidth: 1,
    padding: 10,
  },
});

export default newsPage;