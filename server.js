const express = require('express');
const mongoose = require('mongoose');
// const photosRouter = require('./routes/api/photos'); // Import routes


const app = express();
const PORT = process.env.PORT || 6000;

// Define routes and controllers here...
// app.use('/api/photos', photosRouter); // Use the photos routes
app.use(express.json());
// app.use(cors());

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


