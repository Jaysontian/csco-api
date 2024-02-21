const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const loginRouter = require('./routes/api/login'); // import login routes
const postRouter = require('./routes/api/post'); // import post routes
const imageRouter = require('./routes/api/upload'); // import image routes
const userRouter = require('./routes/api/getUserData'); // import user routes
const searchRouter = require('./routes/api/search'); // import search routes

const path = require('path')

const app = express();
const PORT = 4000;

app.use(cors()); // Middleware since backend and frontend are different folders
app.use(express.json()); // JSON Parser



// Use the routers
app.use('/api/logins', loginRouter);
app.use('/api/posts', postRouter); 
app.use('/api/user-page', userRouter);
app.use('/api/search', searchRouter);
app.use('/api/image', imageRouter);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Connect to MongoDB (make sure MongoDB is installed and running)
const URI = process.env.MONGO_URI; // MongoDB URI defined in .env
mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Launch backend
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Establish connection with MongoDB
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongo Connection Error'))
db.once('open', ()=>{
  console.log('Connected to Mongo!')
})


