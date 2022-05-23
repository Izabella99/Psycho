const express=require("express");
const mongoose=require("mongoose");
const morgan=require("morgan");
const cors=require("cors");
const bodyParser = require('body-parser');
require("dotenv").config();

//app
const app=express();
app.use(express.json());
app.use(bodyParser.json());

//db
mongoose
    .connect(process.env.MONGO_URI,{
        useNewUrlParser: true, 
        useUnifiedTopology: true
    })
    .then(()=> console.log("DB connected"))
    .catch((err)=>console.log("DB connection error:",err));


//middleware
app.use(morgan("dev"));
app.use(cors({origin:true,credentials:true}));


//port
const port=process.env.PORT || 3001;

//listener
const server=app.listen(port,()=>
    console.log('Server is running on port',port)
)

//schema
const Schema=mongoose.Schema;
const ProfessorsSchema=new Schema({
    email:String,
    name:String,
    field:String,
    nr_places:Number,
    nr_places_available:Number});

const StudentsSchema=new Schema({
    nume:String,
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

const StudentsTeachersSchema = new Schema({
    studentEmail:String,
    professorEmail:String,
});

const GradesSchema = new Schema({
    studentEmail:String,
    professorEmail:String,
    criteria1Grade:Number,
    criteria2Grade:Number,
    criteria3Grade:Number,
    finalGrade: Number,
});

const CriteriaSchema = new Schema({
    criteria1: String,
    criteria2: String,
    criteria3: String,
});

//model
const Professors=mongoose.model('Professors',ProfessorsSchema);
const Students=mongoose.model('Students',StudentsSchema);
const Requests=mongoose.model('Requests',RequestsSchema);
const StudentsTeachers=mongoose.model('StudentsTeachers',StudentsTeachersSchema);
const Grades=mongoose.model('Grades',GradesSchema);
const Criteria=mongoose.model('Criteria',CriteriaSchema);

function f() {

    console.log("created");
}

setTimeout(f,5000);

app.get('/api/availableProfessors', (req,res) => {
  Professors.find({nr_places_available: {$gte: 0}})
  .then((data) => {
    res.json(data);
  })
  .catch((error) => {
    console.log('error', error);
  })
})

//Routes
app.get('/api/professors',(req,res)=>{
    
    Professors.find({ })
    .then((data)=> {
        console.log('Data: ',data);
        res.json(data);
    })
    .catch((error)=>{
        console.log('error: ',error)
    })
});

app.get('/api/students',(req,res)=>{
    
    Students.find({ })
    .then((data)=> {
        console.log('Data: ',data);
        res.json(data);
    })
    .catch((error)=>{
        console.log('error: ',error)
    })
});
app.get('/api/students',(req,res)=>{
    
    Students.find({ })
    .then((data)=> {
        console.log('Data: ',data);
        res.json(data);
    })
    .catch((error)=>{
        console.log('error: ',error)
    })
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

app.get('/api/requests',(req,res)=>{
    
    Requests.find({ })
    .then((data)=> {
        console.log('Data: ',data);
        res.json(data);
    })
    .catch((error)=>{
        console.log('error: ',error)
    })
    .catch((error) => {
      console.log('error: ', error);
    })
});
app.get('/api/requests',(req,res)=>{
    
    Requests.find({ })
    .then((data)=> {
        console.log('Data: ',data);
        res.json(data);
    })
    .catch((error)=>{
        console.log('error: ',error)
    })
});

//get students by coordinator name
app.get('/api/students/coordinator',(req,res)=>{
        //get professor by email
        Professors.find({email:req.query.coordinator})
        .then((data)=> {
            //get students by cooordinator
            Students.find({coordinator:data[0].name}).then((data2)=>{
                console.log('Data: ',data2);
                res.json(data2);

            }
            );
      });
});

//get students by coordinator name
app.get('/api/students/coordinator',(req,res)=>{
        //get professor by email
        Professors.find({email:req.query.coordinator})
        .then((data)=> {
            //get students by cooordinator
            Students.find({coordinator:data[0].name}).then((data2)=>{
                console.log('Data: ',data2);
                res.json(data2);

            }
            );
        })
        .catch((error)=>{
            console.log('error: ',error)
        })
});

//find all students by teacherEmail
app.get('/api/studentsByProfessor',(req,res)=>{
    console.log(req.query.teacherEmail);
    StudentsTeachers.find({professorEmail:req.query.professorEmail})
    .then((data)=> {
        //for each student email, find it in Students
        console.log('Data: ',data);
        let studentsEmails=[];
        data.forEach(element => {
            studentsEmails.push(element.studentEmail);
        }
        );
        console.log('studentsEmails: ',studentsEmails);
        Students.find({email:{$in:studentsEmails}})
        .then((data)=> {
            console.log('Data: ',data);
            res.json(data);
        })
        .catch((error)=>{
            console.log('error: ',error)
        })
});
}
);

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
    })
});
//find all students by teacherEmail
app.get('/api/studentsByProfessor',(req,res)=>{
    console.log(req.query.teacherEmail);
    StudentsTeachers.find({professorEmail:req.query.professorEmail})
    .then((data)=> {
        //for each student email, find it in Students
        console.log('Data: ',data);
        let studentsEmails=[];
        data.forEach(element => {
            studentsEmails.push(element.studentEmail);
        }
        );
        console.log('studentsEmails: ',studentsEmails);
        Students.find({email:{$in:studentsEmails}})
        .then((data)=> {
            console.log('Data: ',data);
            res.json(data);
        })
        .catch((error)=>{
            console.log('error: ',error)
        })
    })
    .catch((error)=>{
        console.log('error: ',error)
    })
});

//get first instance of criterias
app.get('/api/criteria',(req,res)=>{
    Criteria.findOne({})
    .then((data)=> {
        console.log('Data: ',data);
        res.json(data);
    })
    .catch((error)=>{
        console.log('error: ',error)
    })
});

//get first instance of criterias
app.get('/api/criteria',(req,res)=>{
    Criteria.findOne({})
    .then((data)=> {
        console.log('Data: ',data);
        res.json(data);
    })
    .catch((error)=>{
        console.log('error: ',error)
    })
});

//get grades by student email
app.get('/api/grades',(req,res)=>{
    Grades.find({studentEmail:req.query.studentEmail})
    .then((data)=> {
        console.log('Data: ',data);
        res.json(data);
    })
    .catch((error)=>{
        console.log('error: ',error)
    })
});

//save grades (or update if it is the case)
app.post('/api/grade',(req,res)=>{

    //delete all by student email
    Grades.deleteMany({studentEmail:req.body.studentEmail}).then(()=>{
        //save new grades
        Grades.create(req.body)
        .then((data)=> {
            console.log('Data: ',data);
            res.json(data);
        })
        .catch((error)=>{
            console.log('error: ',error)
        });
  })
});