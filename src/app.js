const express = require("express");
const connectDB = require("./config/database")
const User = require("./models/user");
const app = express();

// app.get("/user/ab?c", (req, res) => {
//   res.send({ fname: "Rajeev", lname: "Kumar" });
// });

// app.get("/user/ab+c", (req, res) => {
//   res.send({ fname: "Rajeev", lname: "Kumar" });
// });

// app.get("/user/a(bc)?d", (req, res) => {
//   res.send({ fname: "Rajeev", lname: "Kumar" });
// });

// app.get("/user/a(bc)+d", (req, res) => {
//   res.send({ fname: "Rajeev", lname: "Kumar" });
// });

// app.get("/user/ab*cd", (req, res) => {
//   res.send({ fname: "Rajeev", lname: "Kumar" });
// });

// app.get(/a/, (req, res) => {
//   res.send({ fname: "Rajeev", lname: "Kumar" });
// });

// app.get("/user/:userid", (req, res) => {
//   console.log(req.params);
//   res.send({ fname: "Rajeev", lname: "Kumar" });
// });

// app.get("/user/:userid/:fname/:pwd", (req, res) => {
//   console.log(req.params);
//   res.send({ fname: "Rajeev", lname: "Kumar" });
// });

// app.get("/user", (req, res) => {
//   console.log(req.query);
//   res.send("This will show query params");
// });

// app.get("/user", (req, res) => {
//   res.send("This is a get request.");
// });

// app.post("/user", (req, res) => {
//   res.send("data saved to the database successfully");
// });

// app.delete("/user", (req, res) => {
//   res.send("data deleted successfully");
// });

// app.use("/test", (req, res) => {
//   res.send("this is a test page");
// });

// app.use("/hello", (req, res) => {
//   res.send("Hello from hello page");
// });

// app.use("/", (req, res) => {
//   res.send("Hello from___________________home page");
// });

// app.use("/user2", [
//   (req, res, next) => {
//     console.log("This is 1st request handler");
//     next();
//     // res.send("1st response");
//   },
//   (req, res, next) => {
//     console.log("This is 2nd request handler");
//     // res.send("2nd response");
//     next();
//   },
//   [
//     (req, res, next) => {
//       console.log("this is 3rd request handler");
//       // res.send("3rd response");
//       next();
//     },
//     (req, res, next) => {
//       console.log("this is 4th request handler");
//       // res.send("4th response");
//       next();
//     },
//   ],
//   [
//     [
//       (req, res, next) => {
//         console.log("this is 5th request handler");
//         res.send("5th response");
//         // next();
//       },
//     ],
//   ],
// ]);

// app.get("/user", (req,res)=>{
//   throw new Error("I am throwing error manually dude!!")
// })

// app.use("/", (err,req,res,next)=>{
//   if(err){
//   res.status(500).send(err.message)
//   }
// })

app.use(express.json());
app.post("/signup", async (req,res)=>{

  // const user = new User({
  //   firstName: "Rajeev",
  //   lastName: "Kumar",
  //   emailId: "rajeev@kumar.com",
  //   password: "Rajiv@123"
  // })

  const user = new User(req.body)

  try {
    await user.save();
    res.send("User saved successfuly")
  } catch (error) {
    res.status(400).send("There is some problem in saving the data: " + error.message)
  }
})


app.get("/feed",async (req,res)=>{
  try{
    const users = await User.findById(req.body.id)
    res.send(users)
  }catch(err){
    res.status(400).send("something went wrong")
  }
 
})

connectDB().then(()=>{
    console.log("Database connection established successfully")
    app.listen(7777, () => {
      console.log("Server is listening on port 7777");
    });
  }).catch((err)=>{
  console.error("There is some problem in establishing DB connection", err.message)
})


