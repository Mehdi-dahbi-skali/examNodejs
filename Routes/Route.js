const express = require("express");
const fs = require("fs");
const router = express.Router();

const bd=JSON.parse(fs.readFileSync("./db.json").toString());
let idCounter;
let orderCounter;
let tasks;
let IdUser;
idCounter = parseInt(fs.readFileSync("./idCounter.txt").toString())
orderCounter =parseInt(fs.readFileSync("./orderCounter.txt").toString())
IdUser =parseInt(fs.readFileSync("./idUsers.txt").toString())

router.get('/task',(req,res)=>{
    if(req.session.userId==undefined){
        req.session.userId=IdUser;
        IdUser++;
        fs.writeFileSync("./idUsers.txt",IdUser+"");
        res.end();
        
    }
    else
        {
            tasks=bd.Tasks.filter(element=>element.SessionId == IdUser);
        }    
    console.log(IdUser);   
    res.send(tasks);
})

router.post("/create",function(req,res){
        const {name}= req.body
        if(!name){
            return res.status(400).send({message:"name is required !!!"});
        }
        idCounter++;
        orderCounter++;
        

    const dataToSave={
        SessionId:IdUser,
        id: idCounter,
        name:name,
        order:orderCounter
       };

       bd.Tasks.push(dataToSave);
    fs.promises.writeFile("./db.json",JSON.stringify(bd,null,4))
    .then(()=>{
        fs.writeFileSync("./idCounter.txt",idCounter+"")
        fs.writeFileSync("./orderCounter.txt",orderCounter+"")
        res.writeHead(201, {"Content-Type": "application/json"});
        return res.json({dataToSave})
    })
    .catch(err=>{
        console.log(err)
        idCounter--;
        IdUser--;
        orderCounter--;
        res.writeHead(500, {"Content-Type": "application/json"});
        res.write(JSON.stringify({message:"please try again later"}));
        return res.end();
    })
    res.end();
})

router.get("/refrech",(req,res)=>{
    req.session.destroy();
    res.send();
})

module.exports = router;