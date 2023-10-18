require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT;

app.get('/', (req, res) => {
  res.send('Initial my-web-app configuration...');
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
