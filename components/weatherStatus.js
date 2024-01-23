import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, Text, View, } from 'react-native';

const WeatherStatus = () => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const apiKey = 'eaf1ad46937f612bcd543b4b098f4c75';
        const city = 'Huddinge';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        const response = await fetch(apiUrl);
        const data = await response.json();

        if (response.ok) {
          const weatherData = {
            temperature: `${Math.ceil(data.main.temp)}°C`,
            feelsLike: `${Math.ceil(data.main.feels_like)}°C`,
            wind: `${data.wind.speed} m/s`,
            pressure: `${data.main.pressure} hPa`,
            icon: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
          };
          setWeather(weatherData);
        } else {
          console.error(`Failed to fetch weather. Status: ${response.status}`);
        }
      } catch (error) {
        console.error('Error fetching weather:', error);
      }
    };

    fetchWeather();
  }, []);

  return (
    <View>
      {weather ? (
        <View>
          <Image source={{ uri: weather.icon }} style={{ width: 260, height: 190 }} />
          <Text style={styles.text}>Temperature: {weather.temperature}</Text>
          <Text style={styles.text}>Details:</Text>
          <Text style={styles.text2}>Feels like: {weather.feelsLike}</Text>
          <Text style={styles.text2}>Wind: {weather.wind}</Text>
          <Text style={styles.text2}>Pressure: {weather.pressure}</Text>
        </View>
      ) : (
        <Text>Loading weather...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
text: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text2: {
    fontSize: 20,
    textAlign: 'center',
  },
});

export default WeatherStatus;