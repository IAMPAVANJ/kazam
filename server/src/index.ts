const express = require('express');
const dotenv = require('dotenv');
const cors = require("cors");
const helmet = require('helmet');
const Auth = require("./routes/authRoutes");
const Todo = require("./routes/todoRoutes");
const cookieParser = require('cookie-parser');
const ConnectDB = require("./DBConnect/DbConnect");
const optionalPort = 8000
const PORT = optionalPort || 8080;
dotenv.config();


const app = express();
app.use(helmet());
app.use(cors({origin:true, credentials:true}));
app.use(express.json());
app.use(cookieParser());
app.use("/user",Auth);
app.use("/user",Todo);


app.listen(PORT,()=>{
    ConnectDB();
    console.log(`server is up at ${PORT}`);
})