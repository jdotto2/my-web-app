const { InfluxDB, Point } = require('@influxdata/influxdb-client');
const mqtt = require('mqtt');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const token = process.env.DATABASE_TOKEN;
const url = process.env.DATABASE_URL;

const client = new InfluxDB({ url, token });

const org = process.env.DATABASE_ORG;
const bucket = process.env.DATABASE_BUCKET;
const mqttSubTopic = process.env.MQTT_SUB_TOPIC;
const createMqttClient = (io) => {
  // mqtt broker connection options
  const options = {
    port: process.env.BROKER_PORT,
    host: process.env.BROKER_URL,
    username: process.env.BROKER_USERNAME,
    password: process.env.BROKER_PASSWORD,
    protocol: 'mqtts',
    rejectUnauthorized: true,
  };

  // connect to mqtt broker
  const mqttClient = mqtt.connect(options);
  mqttClient.subscribe(mqttSubTopic);

  // set callbacks for connection and new data
  mqttClient.on('connect', () => {
    console.log('Connected to mqtt broker');
  });

  // write new data to InfluxDB [consider decoupling]
  mqttClient.on('message', (topic, message) => {

    if (topic === 'data/temperature') {
      let data = JSON.parse(message);
      let temp = 32 + parseFloat(data.temp) * 1.8;
      temp = Number(temp.toFixed(1));
      let device_time = data.time;

      let writeClient = client.getWriteApi(org, bucket, 'ns');
      let point = new Point('temperature')
        .tag('location', 'High-end-Suite')
        .floatField('temperature', temp);
      writeClient.writePoint(point);
      writeClient.flush();

      // emit real-time data to the frontend via websocket (socket.io library)
      const socketdata = {
        temperature: temp,
        timestamp: device_time,
      };

      io.emit('temperature', socketdata);
    }

    if (topic === 'data/lights') {
      let data = JSON.parse(message);
      let light_status = parseInt(data.lights);
      let device_time = new Date(Date.parse(data.time));

      let writeClient = client.getWriteApi(org, bucket, 'ns');
      let point = new Point('lights')
        .tag('location', 'High-end-Suite')
        .intField('status', light_status);
      writeClient.writePoint(point);
      writeClient.flush();
    }
  });
};

module.exports = { createMqttClient };
