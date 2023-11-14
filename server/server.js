const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 6000;

app.use(express.json());

// Connect to MongoDB (make sure MongoDB is installed and running)
mongoose.connect('mongodb://localhost:27017/vsco_clone', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define routes and controllers here...

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongo Connection Error'))
db.once('open', ()=>{
  console.log('Connected ')
})
