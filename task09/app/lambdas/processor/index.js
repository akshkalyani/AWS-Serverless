const axios = require('axios');
const AWS = require('aws-sdk');

// Initialize DynamoDB client
const dynamoDb = new AWS.DynamoDB.DocumentClient();

// The Open-Meteo API URL (adjust latitude and longitude as needed)
const OPEN_METEO_URL = 'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m';

exports.handler = async (event) => {
  try {
    // Step 1: Fetch weather data from Open-Meteo API
    const response = await axios.get(OPEN_METEO_URL);

    // Extract relevant data from the response
    const { current, hourly } = response.data;
    const currentTime = current.time;
    const temperature = current.temperature_2m;
    const windSpeed = current.wind_speed_10m;

    // Step 2: Prepare the data to be stored in DynamoDB
    const weatherData = {
      id: currentTime, // Assuming id as the timestamp of the weather data
      Category: 'Current', // You can use this to categorize the data
      Temperature: temperature,
      WindSpeed: windSpeed,
      Timestamp: currentTime, // Using the current time as the timestamp
    };

    // Step 3: Write the data to DynamoDB
    const params = {
      TableName: 'Weather', // Ensure this table exists in your DynamoDB
      Item: weatherData
    };

    await dynamoDb.put(params).promise();

    // Step 4: Return a success response
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Weather data successfully stored in DynamoDB',
        data: weatherData
      }),
    };

  } catch (error) {
    // Handle any errors (e.g., API request failure, DynamoDB write failure)
    console.error('Error occurred:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Failed to retrieve or store weather data',
        error: error.message
      }),
    };
  }
};
