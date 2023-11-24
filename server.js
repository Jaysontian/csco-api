const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const photosRouter = require('./routes/api/photos'); // Import routes
const loginRouter = require('./routes/api/login'); // Import routes
const postRouter = require('./routes/api/post'); // Import routes
const userRoutes = require('./routes/api/getUserData');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors()); // Middleware since backend and frontend are different folders
app.use(express.json()); // JSON Parser

// Define routes and controllers here...
app.use('/api/photos', photosRouter); // Use the photos routes
app.use('/api/logins', loginRouter); // Use the login routes
app.use('/api/posts', postRouter); // Use the post routes
app.use('/api/user-page', userRoutes);



// Connect to MongoDB (make sure MongoDB is installed and running)
const URI = "mongodb+srv://rishabhsharma:w4CtshF5dHiELuGM@cluster0.echuaqk.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(URI, {
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


