const express = require("express")
const app = express()
const cors = require("cors")
//middleware
app.use(express.json())
app.use(cors())
//define base url
const baseUrl = process.env.BASE_URL
const apiRouter = express.Router()
app.use(baseUrl,apiRouter)
//import Routes
const userAuthRoute = require("./Routes/userAuthRoute")
apiRouter.use("/auth",userAuthRoute)
//routes


module.exports = app