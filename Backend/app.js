const express = require('express');
const bodyParser = require('body-parser');
const documentsRoutes = require('./routes/documents-routes');
const usersRoutes = require('./routes/users-routes')
const doctorsRoutes = require('./routes/doctors-routes')
const HtppError = require('./models/htpp-error');
const mongoose = require('mongoose');
const app= express();
const fs = require('fs');
const path = require('path');

app.use(bodyParser.json());
app.use('/uploads/images',express.static(path.join('uploads','images')));

app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Headers',
  'Origin,X-Requested-With,Content-Type,Authorization, Accept');
  res.setHeader('Access-Control-Allow-Methods','GET,POST,PATCH,DELETE');
  next();

})
app.use('/api/documents',documentsRoutes);
app.use('/api/users',usersRoutes);
app.use('/api/doctors',doctorsRoutes);


app.use((req,res,next)=>{
  const error = new HtppError("Couldnt find this route",404);
  throw error;
})

app.use((err,req,res,next)=>{
  if (req.file) {
    fs.unlink(req.file.path,(err)=>{
      console.log(err);
    })
  }
  if (res.headerSent) {
    return next(err);
  }
  res.status(err.code || 500);
  res.json({message: err.message || "An unknown error occured"});
});

mongoose.connect('mongodb+srv://testUser:testUser@cluster0.q4nuk.mongodb.net/medicarddb?retryWrites=true&w=majority', {
   useNewUrlParser: true,
   useUnifiedTopology: true,
   ssl: true
 })
.then(() => {
  console.log('hi');
    app.listen(5000);
  }
)
.catch(err => {
  console.log(err);
});
