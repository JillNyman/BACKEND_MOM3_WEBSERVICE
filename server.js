const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

//Skapa förbindelse med mongoDB (compass)
mongoose.connect("mongodb://127.0.0.1:27017/work").then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.log("Error connecting to database: " + error);
})

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

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
app.get("/work", async (req, res) => {
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

//Radera post, DELETE
app.delete("/curriculums/:id", async(req, res) => {

    try{
        let id = req.params._id;
        let result = await Curriculum.findByIdAndDelete(id);
        if(result){
            res.status(200).send({message: "Posten raderad."});
        } else {
            res.status(404).send({message: "Posten hittades inte."});
        }
    } catch (error) {
        res.status(500).send({message: "Ett fel uppstod.", error});
    }  
   
});

//Uppdatera post, PUT
app.put("/curriculums/:id", async(req, res) => {

    try{
        let id = req.params._id;
        let updatedPost = req.body;
        let result = await Curriculum.findByIdAndUpdate(id, updatedPost, {new: true});
        if(result){
            res.status(200).send({message: "Posten uppdaterad."});
        } else {
            res.status(404).send({message: "Posten hittades inte."});
        }
    } catch (error) {
        res.status(500).send({message: "Ett fel uppstod vid uppdatering.", error});
    }   

});

app.listen(port, () => {
    console.log("Server is running on port: " + port);
});