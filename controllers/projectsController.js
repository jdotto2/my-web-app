const ProjectsController = {
    getProjectsPage: (req, res) => {
      res.render('projects');
    },
    getProject1Page: (req, res) => {
        res.render('project1');
      },
    getProject2Page: (req, res) => {
    res.render('project2');
    }, 
  };
  
  module.exports = ProjectsController;