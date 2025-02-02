const express = require("express");
const http = require("http");
const app = express();
const fs = require('fs');
const multer  = require('multer');
const server = http.createServer(app);
const bodyParser = require('body-parser');
const path = require('path');


var storage = multer.diskStorage({
   destination: function (req, file, callback) {
       callback(null, path.join(__dirname, "files"));
   },
   filename: function (req, file, callback) {
       callback(null, file.originalname);
   }
});
const upload = multer({ storage: storage}).single('file');

let dati = {
    x:[],
    y:[]
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/", express.static(path.join(__dirname, "Public")));
//-------------------------------------------------
app.post('/lin/upload', (req, res) => {
   upload(req, res, (err) => {
       
   console.log(req.file.filename);    
   res.json({url: "./files/" + req.file.filename});    
 })
});
//----------------------------------------------------------
app.post("/lin/add", (req, res) => {
 
   const x=req.body.dati.x;
   const y=req.body.dati.y;
   
   

   

   dati.x.push(x);
   dati.y.push(y);
   res.json({result: "Ok"});

});
app.get("/lin/file",(req,res) => {
   let path="./files/fileDaEstrarre.csv";
   fs.readFile(path, (err, file) => {
      if (err) throw err;
      console.log(file);
      const base64File = file.toString('base64');
      res.json({file:base64File})
      //console.log(data); // Contenuto del file
    });
});
app.get("/lin", (req, res) => {

   res.json({dati: dati});

});
/*
app.put("/todo/complete", (req, res) => {

   const todo = req.body;

   try {

      todos = todos.map((element) => {

         if (element.id === todo.id) {

            element.completed = true;

         }

         return element;

      })

   } catch (e) {

      console.log(e);

   }

   res.json({result: "Ok"});

});
*/

app.delete("/lin/del", (req, res) => {

     dati = {
        x:[],
        y:[]
    };
   res.json({result: "Ok"});  

})

server.listen(80, () => {
  console.log("- server running");
});