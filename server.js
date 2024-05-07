const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

//Skapa förbindelse med mongoDB (compass)
mongoose.connect("mongodb://127.0.0.1:27017/work").then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.log("Error connecting to database: " + error);
})

//Skapa schema (collection till databasen work)
const CurriculumSchema = mongoose.Schema({
    companyname: String, 
    jobtitle: String,
    startdate: String,
    enddate: String,
    description: String
    
});

//Skapa model
const Curriculum = mongoose.model("Curriculum", CurriculumSchema);

//Routes
//Databasen
app.get("/work", async (req, res) => {//<---
    res.json({message: "Welcome to this API"});
});

//Tabellen, alltså kollektionen: GET
app.get("/curriculums", async(req, res) => {
    try{
        let result = await Curriculum.find({});

        return res.json(result);
    } catch(error){
        return res.status(500).json(error);
    }
})

//POST till collection
app.post("/curriculums", async(req, res) => {
    let curriculum1 = new Curriculum ( {
        companyname: req.body.companyname, 
        jobtitle: req.body.jobtitle,
        startdate: req.body.startdate,
        enddate: req.body.enddate,
        description: req.body.description
    });
    try{
        //curriculum1.save();
        let result = await Curriculum.create(curriculum1);//(req.body);

        return res.json(result);
    }
    catch(error){
        return res.status(400).json(error);
    }    
});

/*app.post('/delete-item',function(res,req){
    db.collection('item').deleteOne({_id:new mongodb.ObjectId(req.body.id)},function(){
      res.send("success")
    })
  })*/

  //Radera post, DELETE
app.delete("/curriculums/:id", async(req, res) => {
    let id = req.params.id;
    const job = await Curriculum.deleteOne({_id: id});
    return res.json(job);
});

//Uppdatera post, PUT
app.put("/curriculums/:id", async(req, res) => {
    let curriculum2 = new Curriculum({

  
    _id: req.params.id,

    companyname: req.body.companyname,
    jobtitle: req.body.jobtitle,
    startdate: req.body.startdate,
    enddate: req.body.enddate,
    description: req.body.description
})

    let updatedPost = await Curriculum.save(curriculum2);
    return res.json(updatedPost);

})

/*Curriculum.findByIdAndDelete(id.req.body, function (err, docs) {
    if(!err){
        console.log(docs);
    } else{
        console.log(err);
    }
});*/

//Skapa ny post i collection
/*async function createJob() {
    //objekt som representerar arbete
    let curriculum1 = {
        companyname: req.body.companyname, 
        jobtitle: req.body.jobtitle,
        startdate: req.body.startdate,
        enddate: req.body.enddate,
        description: req.body.description
    };
try{
    await Curriculum.create(curriculum1);
} catch(error){
    return "There was an error: " + error;
}
}*/

async function getJobs(){
    try {
        let result = await Curriculum.find();
        console.log(result);
    } catch(error){
        return "There was an error: " + error;
    }
}

//createJob();
getJobs();



app.listen(port, () => {
    console.log("Server is running on port: " + port);
});