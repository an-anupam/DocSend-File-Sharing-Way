require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');
// const cors = require('cors');

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

const connectDB = require('./config/db');
connectDB();

//CORS
// const corsOptions = {
//   origin: process.env.ALLOWED_CLIENTS.split(',')
//   //["http://localhost:3000", "http://localhost:5500", "http://localhost:3500" ]
// }

// ALLOWED_CLIENTS = "http://localhost:3000", "http://localhost:5500", "http://localhost:3500"

// app.use(cors(corsOptions));

//Template Engine
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

//Routes
app.get('/', (req, res) => res.send('Hello From the server!'));
app.use('/api/files', require('./routes/files'));
app.use('/files', require('./routes/show'));
app.use('/files/download', require('./routes/download'));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
