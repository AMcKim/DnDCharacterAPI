const MongoClient = require("mongodb").MongoClient;
const ObjectID = require('mongodb').ObjectID;
//const ObjectName = require('mongodb').DBRef;
const dbname = "player";
const url = "mongodb://localhost:27017"; //mongodb://127.0.0.1:27017
const mongoOptions = {useNewUrlParser: true};

const state = {
    db : null
};

const connect = (cb) =>{
    if(state.db){
        cb();
    }
    else{
        MongoClient.connect(url, mongoOptions, (err, client)=>{
            if(err)
                cb(err);
            else{
                state.db = client.db(dbname);
                cb();
            }
        });
    }
}

const getPrimaryKey = (_id)=>{
    return ObjectID(_id);
}

//const getName = (name)=> {
    //return ObjectName(name);
//}

const getDB = ()=>{
    return state.db;
}

module.exports = {getDB, connect, getPrimaryKey};