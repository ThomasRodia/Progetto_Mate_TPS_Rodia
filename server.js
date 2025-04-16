const express = require("express");
const http = require("http");
const app = express();
const fs = require('fs');
const multer  = require('multer');
//const server = http.createServer(app);
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql2');
const connection = mysql.createConnection({
   host: "mysql-a50d56f-rodia-c843.k.aivencloud.com",
   user: "avnadmin",
   password: "",
   database: "defaultdb",
   port: 12578,
   ssl: {
       ca: fs.readFileSync(__dirname + '/ca.pem')
   }
   });
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
let datiStorico={
   data:"",
   x:[],
   y:[]
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/", express.static(path.join(__dirname, "Public")));
app.use("/assets", express.static(path.join(__dirname, "Public/assets")));

app.post('/lin/upload', (req, res) => {
   upload(req, res, (err) => {
   console.log(req);    
   console.log(req.file.filename);    
   res.json({url: "./files/" + req.file.filename});    
 })
});

app.post("/lin/add", (req, res) => {
 
   const x=req.body.dati.x;
   const y=req.body.dati.y;
   dati.x.push(x);
   dati.y.push(y);
   res.json({result: "Ok"});

});
app.post("/lin/delete", (req, res) => {
 console.log("sono dentro la delete")
 const indice = req.body.index;
 dati.x.splice(indice, 1);
 dati.y.splice(indice, 1);
 
console.info(dati);
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
app.get("/lin/storico", (req, res) => {

   res.json({dati: datiStorico});

});
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


app.delete("/lin/del", (req, res) => {

     dati = {
        x:[],
        y:[]
    };
   res.json({result: "Ok"});  

})
//-----------------------SQL-------------------------------------
const executeQuery = (sql, params, callback) => {
   connection.query(sql, params, (err, results) => {
       if (err) {
           console.error("Errore SQL:", err);
           callback(err, null);
       } else {
           callback(null, results);
       }
   });
};

// 🔹 Recupero dati dallo storico
app.get("/lin/getstorico", (req, res) => {
   const sql = "SELECT * FROM storico";

   executeQuery(sql, [], (err, results) => {
       if (err) {
           return res.status(500).json({ error: "Errore nel recupero dei dati" });
       }

       const formattedResults = results.map(row => ({
           data: row.data,
           x: row.x ? row.x.split(",") : [],
           y: row.y ? row.y.split(",") : []
       }));

       res.json(formattedResults);
   });
});

// 🔹 Creazione tabella storico
const createTable = () => {
   const sql = `
       CREATE TABLE IF NOT EXISTS storico (
           id INT AUTO_INCREMENT PRIMARY KEY, 
           data DATE,
           x TEXT,
           y TEXT
       )
   `;
   executeQuery(sql, [], (err, result) => {
       if (err) {
           console.error("Errore nella creazione della tabella:", err);
       } else {
           console.log("Tabella 'storico' pronta");
       }
   });
};
app.post("/lin/saveData", (req, res) => {
   const { x, y, date } = req.body;

   // Assicurati che i dati siano nel formato corretto
   if (!x || !y || !date) {
       return res.status(400).json({ error: 'Dati insufficienti per il salvataggio' });
   }

   // Converti gli array di x e y in stringhe separate da virgole per salvarli nel database
   const xString = x.join(",");
   const yString = y.join(",");

   // Query SQL per inserire i dati nella tabella "storico"
   const sql = "INSERT INTO storico (data, x, y) VALUES (?, ?, ?)";
   executeQuery(sql, [date, xString, yString], (err, result) => {
       if (err) {
           console.error("Errore nell'inserimento dei dati:", err);
           return res.status(500).json({ error: "Errore nel salvataggio dei dati" });
       }

       // Rispondi con il risultato positivo
       res.json({ message: "Dati salvati con successo" });
   });
});


createTable();

const server = http.createServer(app);
server.listen(5050, () => {
   console.log("- server running");
});