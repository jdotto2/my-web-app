/**
 * TODO: [JD]
 * Consider solutions like RabbitMQ
 * to decouple mqtt data processing
 * from writing data to influxdb for
 * cleaner/scable code
 */

const {Point} = require('@influxdata/influxdb3-client');
const database = require('./database');
const { database_client, database_bucket } = database;
const mqtt = require('mqtt');
const path = require('path');
const dotenv = require('dotenv');

const envPath = path.resolve(__dirname, '../.env');
dotenv.config({ path: envPath });

// mqtt broker connection options
const options = {
    port: process.env.BROKER_PORT,
    host: process.env.BROKER_URL,
    username: process.env.BROKER_USERNAME,
    password: process.env.BROKER_PASSWORD,
    protocol: 'mqtts',
    rejectUnauthorized: true
}

// connect to mqtt broker
const mqtt_client = mqtt.connect(options);
mqtt_client.subscribe('data/#');

// set callbacks for connection and new data
mqtt_client.on('connect', () => {
    console.log('Connected to mqtt broker');
});

// write new data to influxdb [consider decoupling]
mqtt_client.on('message', (topic, message) => {

    console.log(`Received message on topic: ${topic}`);
    console.log(`Message: ${message.toString()}`);

    if (topic === 'data/temperature') {
        let data = JSON.parse(message);
        let temperature = parseFloat(data.temp.toFixed(2));
        let device_time = new Date(Date.parse(data.time));
    
        const temperaturePoint = new Point('temperature')
            .setTag('location', 'bedroom')
            .setFloatField('temperature', temperature)
            .setTimestamp(device_time);
        database_client.write(temperaturePoint, database_bucket);
        console.log("Temperature Point Written");
    }
    
    if (topic === 'data/lights') {
        let data = JSON.parse(message);
        let light_status = parseInt(data.lights);
        let device_time = new Date(Date.parse(data.time));
    
        const lightStatusPoint = new Point('lights')
            .setTag('location', 'bedroom')
            .setIntegerField('status', light_status)
            .setTimestamp(device_time);
        database_client.write(lightStatusPoint, database_bucket);
        console.log("Light Point Written");
    }
    
});