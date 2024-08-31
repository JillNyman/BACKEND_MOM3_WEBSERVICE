const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

//Skapa förbindelse med mongoDB (compass)
mongoose.connect("mongodb://localhost:27017/work").then(() => {
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

//POST till kollection
app.post("/curriculums", async(req, res) => {
    /*let curriculum1 = new Curriculum ( {
        companyname: req.body.companyname, 
        jobtitle: req.body.jobtitle,
        startdate: req.body.startdate,
        enddate: req.body.enddate,
        description: req.body.description*/
        const { companyname, jobtitle, startdate, enddate, description } = req.body;

        if(!companyname || !jobtitle) {
            return res.status(400).json({ error: "Fälten FÖRETAG och TITEL är obligatoriska."});
        }

        let curriculum1 = new Curriculum({
            companyname: companyname.trim(),
            jobtitle: jobtitle.trim(),
            startdate: startdate ? startdate.trim() : null,
            enddate: enddate ? enddate.trim() : null,
            description: description ? description.trim() : null
        });
    
    try{
       
        let result = await Curriculum.create(curriculum1);
        if(result){
            console.log("Resultat:", result);
            res.status(200).send({message: "Posten tillagd!"});
            return;
    }
    }
    catch(error){
        return res.status(500).send({message: "Ett fel uppstod när posten skulle läggas till: ", error})
    }    
});

//Radera post, DELETE
app.delete('/curriculums/:id', async (req, res) => {

    try{
        let id = req.params.id;
        console.log("ID: ", id);
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).send({message: "Invalid ID format"});
        }
        //let result = await Curriculum.findBy(id);
        let result = await Curriculum.deleteOne({_id: id});
        if(result){
            console.log("Resultat: ", result);
            res.status(200).send({message: "Posten raderad."});
        } else {
            console.log("Resultat: ", result);
            res.status(404).send({message: "Posten hittades inte."});
        }
    } catch (error) {
        console.log("Resultat: ", result);
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