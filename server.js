//configure dotenv
const dotenv = require("dotenv")
dotenv.config()

//import app and dbConfig
const app = require("./src/app")
const connectDB = require("./src/config/dbConfig")
connectDB()
app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`))