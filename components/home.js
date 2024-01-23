import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';


const Home = ({ navigation }) => {
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [currentWeekNumber, setCurrentWeekNumber] = useState('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const timeString = `${now.getHours()}:${now.getMinutes()}`;
      const dateString = now.toLocaleDateString('sv-SE', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
      const weekNumber = getWeekNumber(now);

      setCurrentTime(timeString);
      setCurrentDate(dateString);
      setCurrentWeekNumber(weekNumber);
    };

    const intervalId = setInterval(updateDateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const getWeekNumber = (date) => {
    const target = new Date(date.valueOf());
    const dayNumber = (date.getUTCDay() + 6) % 7;
    target.setUTCDate(target.getUTCDate() - dayNumber + 3);
    const firstThursday = target.valueOf();
    target.setUTCMonth(0, 1);

    if (target.getUTCDay() !== 4) {
      target.setUTCMonth(0, 1 + ((4 - target.getUTCDay()) + 7) % 7);
    }

    return Math.ceil((firstThursday - target) / (7 * 24 * 3600 * 1000)) + 1;
  };

  return (
    <View style={styles.container}>
        <Text style={styles.titleText}> Home Page </Text>
      <View style={styles.timeContainer}>
        <Text style={styles.text}>{`Vecka ${currentWeekNumber}`}</Text>
        <Text style={styles.text}>{currentDate}</Text>
        <Text style={styles.text}>{currentTime}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Go to News"
          onPress={() => navigation.navigate('News')}
        />
        </View>
        <View style={styles.buttonContainer}>
        <Button
          title="Go to Weather"
          onPress={() => navigation.navigate('Weather')}
        />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'orange',
    margin: 10,
    padding: 10,
  },
  timeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'yellow',
    margin: 20,
  },
  text: {
    margin: 10,
  },
  titleText: {
    fontSize: 50,
    fontWeight: 'bold',
    margin: 20,
  },
});

export default Home;