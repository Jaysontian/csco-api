const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const loginRouter = require('./routes/api/login'); // Import routes
const postRouter = require('./routes/api/post'); // Import routes
const imageRouter = require('./routes/api/upload'); // Import routes
const userRouter = require('./routes/api/getUserData');
const searchRouter = require('./routes/api/search');

const path = require('path')

const app = express();
const PORT = 4000;

app.use(cors()); // Middleware since backend and frontend are different folders
app.use(express.json()); // JSON Parser



// Define routes and controllers here...
app.use('/api/logins', loginRouter); // Use the login routes
app.use('/api/posts', postRouter); // Use the post routes
app.use('/api/user-page', userRouter);
app.use('/api/search', searchRouter);
app.use('/api/image', imageRouter);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Connect to MongoDB (make sure MongoDB is installed and running)
const URI = process.env.MONGO_URI;
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


