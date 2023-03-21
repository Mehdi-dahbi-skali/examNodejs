const express = require("express");
const app = express();
const session = require("express-session");
const Route = require("./Routes/Route");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(express.json()) 


app.use(bodyParser.json());
app.use(cors());
app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers',
               'Origin, -Requested-With, Content-Type, Accept, Authorization'
    );
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { 
      httpOnly: true
    }
  }))

app.use(express.static("./public"))
app.use(Route);

app.listen(3000,()=>{
    console.log("Hello now listning for request !!");
})