import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import axios from 'axios';

const newsDetails = ({ route }) => {
  const { news } = route.params;
  const [detailedNews, setDetailedNews] = useState(null);

  useEffect(() => {
    const getDetailedNews = async () => {
      try {
        const resp = await axios.get(`https://newsapi.org/v2/top-headlines?sources=${news.id}&apiKey=90bbee7dd73f462f938cad226de85049&language=en`);
        setDetailedNews(resp.data.articles[0]);
      } catch (error) {
        console.error('Error fetching detailed news data:', error);
      }
    };

    getDetailedNews();
  }, [news.id]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{news.name}</Text>
      {detailedNews && (
        <>
          <Image style={styles.image} source={{ uri: detailedNews.urlToImage }} />
          <Text style={styles.description}>{detailedNews.description}</Text>
        </>
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
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
  },
});

export default newsDetails;
