const {InfluxDB} = require('@influxdata/influxdb-client');
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
const database_client = new InfluxDB({url, token});
const write_api = database_client.getWriteApi(database_org, database_bucket, 'ns');
const query_api = database_client.getQueryApi(database_org);

 database = {
  database_client,
  write_api,
  query_api,
  database_bucket
 }

module.exports = database;