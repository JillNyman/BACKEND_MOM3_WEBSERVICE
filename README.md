Detta repository är ett REST API byggt med Express. API:et hanterar ett CV, det vill säga min arbetslivserfarenhet. Funktionalitet för CRUD är implementerad.

Databas API:et använder mongoDB som databas. (Klona ner källkodsfilerna, kör kommando npm install för att installera nödvändiga npm-paket. Kör installations-skriptet install.js. Installations-skriptet skapar en collection m h a ett schema enligt nedanstående:)

const CurriculumSchema = mongoose.Schema({
    companyname: String, 
    jobtitle: String,
    startdate: String,
    enddate: String,
    description: String
})

Inget av värdena är obligatoriskt.

Användning För att nå API:et, använd "http://127.0.0.1:3000/curriculums" för GET och POST samt för PUT och DELETE: "localhost:2788/http://127.0.0.1:3000/curriculums/:id".

Vid hämtning från API:et returneras ett objekt i JSON-format enligt följande: { "_id": 1, "companyname": "Gröna Lund", "jobtitle": "HR-koordinator", "startdate": "2009-01-01", "enddate": "2013-10-06", "description": "schemaläggning, bemanning, parkansvarig" }
