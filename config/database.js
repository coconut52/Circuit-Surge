// config for connecting to the database I set up on atlas


const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => console.log('Database connected'));
mongoose.connection.on('error', (err) => console.log('Database connection error:', err));

module.exports = mongoose;