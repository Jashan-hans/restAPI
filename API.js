const express = require('express');
const app = express();
app.use(express.json());
// app.get()                   for  get data
// app.post()                  for create data

const courses =[
    {id:1,name: 'course1'},
    {id:2,name: 'course2'},
    {id:3,name: 'course3'},
];

// using get method ........
app.get('/',(req,res)=>{ 
    res.send("hello world");
});


// get all the courses
app.get('/api/courses',(req,res)=>{
    res.send(courses);   
});


// get a single course using course id
app.get('/api/courses/:id',(req,res)=>{

   const course =  courses.find(c=> c.id === parseInt(req.params.id));
   if(!course)  req.statusCode(404).send("given id was not found");            //set status
   res.send(courses);       
});



// using post method..........
app.post('/api/courses',(req,res)=>{
   
    
    if(!req.body.name || req.body.name.length<3){
        //  404 bad request
        req.statusCode(404).send("error message");
        return;
    }
    const course={
        id : courses.length +1,
        name :req.body.name
    };
    courses.push(course);
    console.log(req.body);
    res.send(course);
    
});

app.put('/api/courses/:id',(req,res)=>{
    const course = courses.find(c=>c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('The course with the given ID was invalid')
    if(!req.body.name || req.body.name.length<3){
        //  404 bad request
        req.statusCode(404).send("error message");
        return;
    }

    course.name = req.body.name;
    res.send(course);
})

app.delete('/api/courses/:id',(req,res)=>{
    const course = courses.find(c=>c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('The course with the given ID was invalid')

    const index = courses.indexOf(course);
    courses.splice(index,1);

    res.send(course);
});

app.listen(4040,()=>{
    console.log("listening on port 4040");
});