import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import WeatherStatus from './weatherStatus';


const Weather = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Weather</Text>
      <WeatherStatus/>
      <View style={styles.buttonContainer}>
        <Button
          title='Home'
          onPress={() => navigation.navigate('Home')}
        />
      </View>   
    </View>
  );
}

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
    margin: 30,
    padding: 10,
  },
  titleText: {
    fontSize: 50,
    fontWeight: 'bold',
    margin: 30,
  },
});

export default Weather;