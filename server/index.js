const express=require("express");
const mongoose=require("mongoose");
const morgan=require("morgan");
const cors=require("cors");
require("dotenv").config();

//app
const app=express();
app.use(express.json());

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
    forma_de_inavatamant:String,
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
        })
    });
});