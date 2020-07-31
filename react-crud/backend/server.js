const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


mongoose.connect("mongodb://localhost:27017/test?readPreference=primary&appname=MongoDB%20Compass&ssl=false", {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

const connection = mongoose.connection; 
connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', function() {
  // we're connected!
  console.log('MongoDB database connection is successfull'); 
});

const userRouter = require("./routes/users");
app.use('/users', userRouter);

const taskRouter = require("./routes/tasks");
app.use('/tasks', taskRouter);


 app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});   