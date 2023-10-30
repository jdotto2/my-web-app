/**
 * TODO: [JD]
 * Consider solutions like RabbitMQ
 * to decouple mqtt data processing
 * from writing data to influxdb for
 * cleaner/scable code
 */

const { Point } = require('@influxdata/influxdb-client');
const database = require('./database');
const { write_api, database_org } = database;
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

    if(topic === 'data/temperature'){
        let data = JSON.parse(message);
        let temperature = parseFloat(data.temp.toFixed(2));
        let device_time = new Date(Date.parse(data.time));
        
        const temperaturePoint = new Point('room_state')
            .tag('location', 'bedroom')
            .floatField('temperature', temperature)
            .timestamp(device_time);
        write_api.writePoint(temperaturePoint);
    }

    if(topic === 'data/lights'){
        let data = JSON.parse(message);
        let light_status = parseInt(data.lights);
        let device_time = new Date(Date.parse(data.time));
        
        const lightStatusPoint = new Point('room_state')
            .tag('location', 'bedroom')
            .intField('lights', light_status)
            .timestamp(device_time);
        write_api.writePoint(lightStatusPoint);
    }
});