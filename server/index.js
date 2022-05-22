const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser').json();

//app
const app = express();

//db
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connected'))
  .catch((err) => console.log('DB connection error:', err));

//middleware
app.use(morgan('dev'));
app.use(cors({ origin: true, credentials: true }));

//port
const port = process.env.PORT || 3001;

//listener
const server = app.listen(port, () =>
  console.log('Server is running on port', port)
);

//schema
const Schema = mongoose.Schema;
const ProfessorsSchema = new Schema({
  email: String,
  name: String,
  field: String,
  nr_places: Number,
  nr_places_available: Number,
});

const StudentsSchema = new Schema({
  nume: String,
  email: String,
  nr_matricol: Number,
  forma_de_inavatamant: String,
  specializare: String,
  topic: String,
});

const RequestsSchema = new Schema({
  studentName: String,
  professorName: String,
  nr_matricol: Number,
  date: Date,
  status: String,
});

//model
const Professors = mongoose.model('Professors', ProfessorsSchema);
const Students = mongoose.model('Students', StudentsSchema);
const Requests = mongoose.model('Requests', RequestsSchema);

//Routes
app.get('/api/professors', (req, res) => {
  Professors.find({})
    .then((data) => {
      console.log('Data: ', data);
      res.json(data);
    })
    .catch((error) => {
      console.log('error: ', error);
    });
});

app.post('/api/professor', bodyParser, (req, res) => {
  const email = req.body.email;
  Professors.find({ email })
    .then((data) => {
      console.log('Data: ', data);
      res.json(data);
    })
    .catch((error) => {
      console.log('error: ', error);
    });
});

app.get('/api/students', (req, res) => {
  Students.find({})
    .then((data) => {
      console.log('Data: ', data);
      res.json(data);
    })
    .catch((error) => {
      console.log('error: ', error);
    });
});

app.post('/api/student', bodyParser, (req, res) => {
  const email = req.body.email;
  Students.find({ email })
    .then((data) => {
      console.log('Data: ', data);
      res.json(data);
    })
    .catch((error) => {
      console.log('error: ', error);
    });
});

app.get('/api/requests', (req, res) => {
  Requests.find({})
    .then((data) => {
      console.log('Data: ', data);
      res.json(data);
    })
    .catch((error) => {
      console.log('error: ', error);
    });
});

app.post('/api/requests', bodyParser, (req, res) => {
  console.log(req.body);

  let date_ob = new Date();

  // current date
  // adjust 0 before single digit date
  let day = ('0' + date_ob.getDate()).slice(-2);

  // current month
  let month = ('0' + (date_ob.getMonth() + 1)).slice(-2);

  // current year
  let year = date_ob.getFullYear();

  const date = year + '-' + month + '-' + day;

  Requests.create({
    studentName: req.body.studentName,
    professorName: req.body.professorName,
    date,
    status: req.body.status,
  })
    .then((data) => {
      console.log('Data inserted: ', data);
      res.json(data);
    })
    .catch((error) => {
      console.log('error: ', error);
    });
});

app.patch('/api/requests', bodyParser, (req, res) => {
  console.log(req.body);

  Requests.updateOne(
    {
      studentName: req.body.studentName,
    },
    {
      status: req.body.status,
    }
  )
    .then((data) => {
      console.log('Data inserted: ', data);
      res.json(data);
    })
    .catch((error) => {
      console.log('error: ', error);
    });
});
