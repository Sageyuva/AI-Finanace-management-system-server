const express = require("express")
const app = express()
const cors = require("cors")
//middleware
app.use(express.json())
app.use(cors())
//routes
app.get("/", (req, res) => res.send("Hello World!"))

module.exports = app