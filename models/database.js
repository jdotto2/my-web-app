const {InfluxDBClient} = require('@influxdata/influxdb3-client');
const path = require('path');
const dotenv = require('dotenv');

const envPath = path.resolve(__dirname, '../.env');
dotenv.config({ path: envPath });

// database connection parameters
const url = process.env.DATABASE_URL;
const token = process.env.DATABASE_TOKEN;
let database_org = process.env.DATABASE_ORG;
let database_bucket = process.env.DATABASE_BUCKET;

// connect to database
const database_client = new InfluxDBClient({host: url, token: token});

 database = {
  database_client,
  database_bucket
 }

module.exports = database;