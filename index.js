const express=require('express')
const mongoose=require('mongoose')
const {User }=require('./schema')
const App=express()
const bodyparser=require('body-parser')
App.use(bodyparser.json())
const cors = require('cors')
App.use(cors())


const port = process.env.PORT || 2000
async function connectiontoDB() {
    try {
        await mongoose.connect(`mongodb+srv://Hema__:hema123@cluster0.doyohtd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
            //const port = 4000
        App.listen(port, function() {
            console.log(`Listening to port ${port}`)
        })
    } catch (error) {
        console.log("couldn'/t establish connection")
    }
}
connectiontoDB()
App.post('/user', async function(request, response) {
    try {
        await User.create({
            "name": request.body.name,
            "email": request.body.email,
            "password": request.body.password
        })
        response.status(201).json({ //status code is 200 when we create new 
            "Status": "Success",
            "message": "entry created"
        })
    } catch (error) {
        response.status(500).json({ //status code is 500 when we get a error ,because it is internal serverr error
            "Status": "Failure",
            "Msg": "couldn'\t add value"
        })
    }

})



