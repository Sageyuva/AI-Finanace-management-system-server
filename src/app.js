const express = require("express")
const cors = require("cors")


//initialize app
const app = express()


//middleware
app.use(cors())
app.use(express.json())

//baseUrl
const baseurl = process.env.BASE_URL

const apiRouter = express.Router();
app.use(baseurl,apiRouter);

//userAuthRoutes
const UserRoute = require("./Routes/userRoute")
apiRouter.use("/user",UserRoute);

//routes
app.get(baseurl, (req, res) => {
  res.send("Hello World!");
});


module.exports = app