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
const Schema=mongoose.Schema;
const ProfessorsSchema=new Schema({
    email:String,
    name:String,
    field:String,
    nr_places:Number,
    nr_places_available:Number});

const StudentsSchema=new Schema({
    name:String,
    email:String,
    nr_matricol:Number,
    forma_de_invatamant:String,
    specializare:String,
    topic:String,
    coordinator:String});

const RequestsSchema=new Schema({
    studentName:String,
    professorName:String,
    nr_matricol:Number,
    date:Date,
    status:String,});




//model
const Professors = mongoose.model('Professors', ProfessorsSchema);
const Students = mongoose.model('Students', StudentsSchema);
const Requests = mongoose.model('Requests', RequestsSchema);

//Routes

// PROFESSORS

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

app.get('/api/availableProfessors', (req,res) => {
  Professors.find({nr_places_available: {$gte: 0}})
  .then((data) => {
    res.json(data);
  })
  .catch((error) => {
    console.log('error', error);
  })
})

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

app.post('/api/professors', bodyParser, (req, res) => {
  Professors.create({
    name: req.body.name,
    email: req.body.email,
    field: req.body.field,
    nr_places: req.body.nr_places,
    nr_places_available: req.body.nr_places_available
  })
  .then((response) => {
    console.log(typeof(req.body.nr_places));
    res.json(response);
  })
  .catch((error) => {
    console.log(error);
    res.json(error);
  })
});

app.delete('/api/professors/:id', (req,res) => {

  Professors.findOneAndRemove({ email: req.params.id })
  .then(() => {
    Professors.find({})
    .then((data) => res.json(data))
    .catch((error) => console.log("error", error));
  })
  .catch((error) => console.log("error", error));

})

// STUDENTS

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

app.patch('/api/students', bodyParser, (req,res) => {

  Students.updateOne(
  {
    nr_matricol: req.body.nr_matricol,
  },
  {
    coordinator: req.body.coordinator,
  })
  .then((data) => {
    console.log('Data inserted: ', data);
    res.json(data);
  })
  .catch((error) => {
    console.log('error: ', error);
  });

  Professors.updateOne(
  {
    name: req.body.coordinator,
  },
  {
    $inc: {nr_places_available: -1},
  })
  .then((data) => console.log("Updated professor successfully!"))
  .error((error) => console.log("error", error));

}) 

app.post('/api/students', bodyParser, (req, res) => {
  Students.create({
    name: req.body.name,
    email: req.body.email,
    nr_matricol: req.body.nr_matricol,
    forma_de_invatamant: req.body.forma_de_invatamant,
    specializare: req.body.specializare,
    topic: req.body.topic,
    coordinator: req.body.coordinator 
  })
  .then((response) => {
    console.log(response);
    res.json(response);
  })
  .catch((error) => {
    console.log(error);
    res.json(error);
  })
});

app.patch('/api/students', bodyParser, (req,res) => {

  Students.updateOne(
  {
    nr_matricol: req.body.nr_matricol,
  },
  {
    coordinator: req.body.coordinator,
  }
  )
  .then((data) => {
    console.log('Data inserted: ', data);
    res.json(data);
  })
  .catch((error) => {
    console.log('error: ', error);
  });

})

app.delete('/api/students/:id', (req,res) => {

  Students.findOneAndRemove({ nr_matricol: req.params.id })
  .then(() => {
    Students.find({})
    .then((data) => res.json(data))
    .catch((error) => console.log("error", error));
  })
  .catch((error) => console.log("error", error));

})

// REQUESTS

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