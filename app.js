const express = require('express');
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());

const path = require('path');

const db = require("./db");
const colCharacters = "characters";
const colWeapons = "weapons";


//allows files in the 'public' directory to be used by index.html
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    
    res.sendFile(path.join(__dirname, 'index.html'));
    
});

app.get('/getCharacters', (req, res) => {
   
    db.getDB().collection(colCharacters).find({}).toArray((err, documents) => {
    
        if (err) 
            console.log(err);
        else {
            //console.log(documents);
            res.json(documents);
        }
    
    })

});

app.get('/getCharacters/:id', (req, res) => {
    
    var characterID = req.params.id;

    db.getDB().collection(colCharacters).findOne({_id : db.getPrimaryKey(characterID)}, function(err,document) {
        if (err)
            console.log(err);
        else {
            addProfBonus(document);
            addFields(document, "class", "sec-class", "class-name", "/");
            addFields(document, "lvl", "sec-lvl", "total-level", "/");
            //allClasses(document);
            //allLevels(document);
            console.log(document);
            res.json(document);
        } 
    })
});

//app.put('/:id', (req, res) => {
//    const characterID = req.params.id;
//    const userInput
//})

app.get('/getWeapons/:name', (req, res) => {
    
    var weaponName = req.params.name;

    db.getDB().collection(colWeapons).findOne({"name" : weaponName}, function(err,document) {
        if (err)
            console.log(err);
        else {
            addFields(document, "category", "class", "weaponType", " "),
            addFields(document, "numberOfDamageDice", "damageDie", "damage", "d")
            console.log(document);
            res.json(document);
        } 
    })
});



db.connect((err)=>{
    if(err){
        console.log('unable to connect to database');
        process.exit(1);
    }
    else{
        app.listen(3000, ()=>{
            console.log('connected to database, app listening at port 3000');
        });
    }
})

function addProfBonus(document) {
    let newField = "prof-bonus";
    let totalLevel = 0;
    if(document.hasOwnProperty('sec-lvl')) {
        totalLevel = document["lvl"] + document["sec-lvl"];
    }
    else {
        totalLevel = document["lvl"];
    }
    
    let profBonus = deriveProficiencyBonus(totalLevel);

    document[newField] = profBonus;

    return document;
}

function deriveProficiencyBonus(totalLevel) {
    if (totalLevel >= 1 && totalLevel < 5 ) {
        return 2;
    }
    else if (totalLevel >= 5 && totalLevel < 9 ) {
        return 3;
    }
    else if (totalLevel >= 9 && totalLevel < 13 ) {
        return 4;
    }
    else if (totalLevel >= 13 && toString < 17 ) {
        return 5;
    }
    else if (totalLevel >= 17) {
        return 6;
    }
    else {
        return 0;
    }
}


function addFields(document, mainField, secField, newField, delimiter) {

    let newFieldValue = "";

    if(document.hasOwnProperty(secField)) {
        newFieldValue = document[mainField] + delimiter + document[secField];
    }

    else {
        newFieldValue = document[mainField];
    }

    document[newField] = newFieldValue;

    return document;
    
}

/* function allLevels(document) {
    let newField = "total-level";
    let allLevels = "";
    if(document.hasOwnProperty('sec-lvl')) {
        allLevels = document["lvl"] + "/" + document["sec-lvl"];
    }
    else {
        allLevels = document["lvl"];
    }
    
    
    document[newField] = allLevels;

    return document;
} */