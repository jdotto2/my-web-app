require('dotenv').config();
const port = process.env.PORT;

const express = require('express');
const HomeController = require('./controllers/homeController');
const ProjectsController = require('./controllers/projectsController');
const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.get('/', HomeController.getHomePage);
app.get('/projects', ProjectsController.getProjectsPage);
app.get('/project1', ProjectsController.getProject1Page);
app.get('/project2', ProjectsController.getProject2Page);

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
