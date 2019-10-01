// implement your API here

const express = require("express"); 

const server = express(); 

const db = require("./data/db.js"); 
server.use(express.json()); 

// test servers responsive 
// server.get("/", (req, res) => {
//     res.send("It's working")
// })


// .post()
server.post("/api/users", (req, res) => {
    const dbData = req.body; 

    // if else logic goes here 
    if(!dbData.name || !dbData.bio) {
        res.status(400).json({errorMessage: "Please provide name and bio for the user."})
    } else {   
        db
        .insert(dbData)
        .then(dbparam => {
            res.status(200).json(dbparam)
        })
        .catch(error => {
            res.status(500).json({error, error: "There was an error while saving the user to the date base"})
        })
    }
})

// .get()
server.get("/api/users", (req, res) => {

    db 
    .find()
    .then(users => {
        res.status(users).json(users)
    })
    .catch(error => {
        console.log(error, {message: "user not found"})
    })

}) 

// .get() with ID
server.get("/api/users/:id", (req, res) => {
    const {id} = req.params.id; 
    if(!id) {
        res.status(404).json({message: "The user with the specified ID does not exits"})
    } else {
        bd 
        .findById(id)
        .then(idUser => {
            res.status(200).json(idUser)
        })
        .catch(error => {
            res.status(500).json(error, {error: "The user information could not be retrieved"})
        })
    }
})

// .delete()
server.delete("/api/users/:id", (req, res) => {
    const {id} = req.params.id 

    if(!id) {
        res.status(404).json({message: "The user with the specified ID does not exits"})
    } else {
        bd
        .remove(id)
        .then(userRemove => {
            res.status(200).json(userRemove)
        })
        .catch(error => {
            res.status(500).json(error, {errorMessage: "Plase provide name and bio for the user"})
        })
    } 
})

// .put() 
// server.update("/api/users/:id", (req, res) => {
//     const {id} = req.params.id

//     if(!id) {

//     }
// })







const port = 8000;
server.listen(port, () => console.log('server running'));