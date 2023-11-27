const express = require('express');
const cors = require ("cors")
const mongoose  = require('mongoose');
const route = require('./routes/route.js');

const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())


mongoose.connect("mongodb+srv://Ranjitmongo:ranjitmongo@cluster0.ul51s.mongodb.net/taskdb", { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
  });
  app.use('/', route)

app.listen(4000,() => {
    console.log(" server started at port 4000")
})
