require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
// import contactRoutes from './routes/contactRoutes.js';
const contactRoutes = require('./routes/contactRoutes');   
const feedbackRoutes = require('./routes/feedbackRoutes'); 

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/api/auth', authRoutes);

app.use('/api/auth', authRoutes);

app.use('/api/contact', contactRoutes);

app.use('/api/feedback', feedbackRoutes);


app.get('/', (req, res) => {
  res.send('API is running');
});


const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});