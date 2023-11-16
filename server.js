const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const photosRouter = require('./routes/api/photos'); // Import routes
const loginRouter = require('./routes/api/login'); // Import routes


const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors()); // Middleware since backend and frontend are different folders
app.use(express.json()); // JSON Parser

// Define routes and controllers here...
app.use('/api/photos', photosRouter); // Use the photos routes
app.use('/api/logins', loginRouter); // Use the photos routes

// Connect to MongoDB (make sure MongoDB is installed and running)
mongoose.connect('mongodb+srv://rishabhsharma:w4CtshF5dHiELuGM@cluster0.echuaqk.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongo Connection Error'))
db.once('open', ()=>{
  console.log('Connected to Mongo!')
})


