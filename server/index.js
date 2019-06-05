const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');

app.use(morgan('dev'));

// Body parsing middleware:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static middleware:
app.use(express.static(path.join(__dirname, '../public')));

// API routes:
app.use('/api', require('./api'));

//sending index.html to requesting client
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error');
});

const port = process.env.PORT || 3000; // this can be very useful if you deploy to Heroku!
app.listen(port, function() {
  console.log(`Your server, listening on port ${port}`);
});

module.exports = app;
