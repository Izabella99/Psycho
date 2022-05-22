const express=require("express");
const mongoose=require("mongoose");
const morgan=require("morgan");
const cors=require("cors");
require("dotenv").config();

//app
const app=express();

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




//model
const Professors=mongoose.model('Professors',ProfessorsSchema);
const Students=mongoose.model('Students',StudentsSchema);
const Requests=mongoose.model('Requests',RequestsSchema);


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
