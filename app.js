const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {cors: {origin: '*'}});
const bodyParser = require('body-parser');

const { createMqttClient } = require('./models/mqttData');
const { receiveSensorData } = require('./controllers/sensorDataController');

createMqttClient(io);

require('dotenv').config();
const port = process.env.PORT;

const HomeController = require('./controllers/homeController');
const ProjectsController = require('./controllers/projectsController');

app.use(express.static('public'));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.get('/', HomeController.getHomePage);
app.get('/projects', ProjectsController.getProjectsPage);
app.get('/project1', ProjectsController.getProject1Page);
app.get('/project2', ProjectsController.getProject2Page);
app.post('/sensor-data', (req, res) => receiveSensorData(req, res, io));

server.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
