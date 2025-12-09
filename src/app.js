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

//Routes
apiRouter.use("/auth",userAuthRoute)


//temparary imports and routes
const mongoose = require("mongoose")
app.get("/api/v1", async (req, res) => {
  try {
    if (!mongoose.connection.readyState) {
      return res.status(500).send("Database not connected");
    }

    const result = await mongoose.connection
      .collection("usermodels")   // <-- FIXED
      .deleteMany({});

    res.send(`Done. Deleted ${result.deletedCount} documents.`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error while clearing collection");
  }
});



module.exports = app