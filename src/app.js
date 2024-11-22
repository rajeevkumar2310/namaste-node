const express = require("express");
const connectDB = require("./config/database")
const cookieParser = require("cookie-parser");
const authRouter = require("./routers/auth");
const profileRouter = require("./routers/profile");
const userRouter = require("./routers/user");
const requestRouter = require("./routers/request");
const app = express();
const cors = require("cors")

app.use(cors({origin: "http://localhost:5173",
  credentials: true
}))

app.use(cookieParser());
app.use(express.json());

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);

connectDB().then(()=>{
    console.log("Database connection established successfully")
    app.listen(7777, () => {
      console.log("Server is listening on port 7777");
    });
  }).catch((err)=>{
  console.error("There is some problem in establishing DB connection", err.message)
})


