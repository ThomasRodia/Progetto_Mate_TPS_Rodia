export const createTable = (parentElement) => {
    let dati=null;
    let istance;
    let callback;
  istance ={
    
   setcallback:(cb)=>{
callback=cb;
   },
    render: () => {
     // const calc= document.getElementById("calculator");

              let html = `
                        <div class="container">
      <form class="inserimento">
    
  
  <input type="number" id="X"aria-label="X" class="form-control in" placeholder="X">
  <input type="number" id="Y"aria-label="Y" class="form-control in"placeholder="Y">
      <button type="button" id="Aggiungi" class="btn btn-primary" >Aggiungi</button>
      <button type="button" id="Calcola" class="btn btn-success">Calcola</button>
  <input id="file" name="file" class="form-control "placeholder="Insercisci CSV"type="file" single>
  <button type="button" id="CaricaCSV" class="btn btn-primary b1">Aggiungi da CSV</button>
    </form>

    
    <div class="mt-4" id="tab">
        <table class="table table-bordered tabellina radius">
            <thead class="table-dark titolo">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        X
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Y
                    </th>
                    <th scope="col" class="px-6 py-3">
                        CANCELLA
                    </th>
                </tr>
            </thead>
            <tbody class="titiolo">`;
            for(let i=0;i<dati.x.length;i++){
                
                html+= `
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">` +
dati.x[i] +
`</th>
<th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">` +
dati.y[i] +
`</th>
<th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"><button class="btn btn-danger titolo" id="elimina">Elimina</button

</th>
                    
                </tr>`;
            }

             

              html += `
                                </tbody>
                            </table>
                        </div>
                    </div>
                        `;

              parentElement.innerHTML = html;

              const xinput = document.getElementById("X");
              const yinput = document.getElementById("Y");
              const aggiungi=document.getElementById("Aggiungi");
              const calcola=document.getElementById("Calcola");
              const CSVButton=document.getElementById("CaricaCSV");
              const inputFile=document.getElementById("file");
//calc.setAttribute("class","hidden");

    console.log("sono dentro");
    
    let handleSubmit = async (event) => {
  
    const file = inputFile.files[0];
    const nuovoNome = "fileDaEstrarre.csv"; 

   
        const fileModificato = new File([file], nuovoNome, { type: file.type });
        const formData = new FormData();
        console.log(fileModificato);
        formData.append("file", fileModificato);
        const body = formData;
        body.description = "CSV Su cui si lavora";
        console.info(body);
        const fetchOptions = {
          method: 'post',
          body: body
        };
        try {
          const res = await fetch("/lin/upload", fetchOptions);
        } catch (e) {
          console.log(e);
        }
        inputFile.value="";
        istance.estraiDaCSV();
    }
    CSVButton.onclick=handleSubmit;
    document.querySelectorAll("#elimina").forEach((button, index) => {
        button.onclick = () => {
               istance.delete(index);
            //this.delete(todos[index].id).then(() => this.load()).catch(console.error);
        };
    });

                aggiungi.onclick = () => {
                   
                     console.info("ho cliccato aggiungi");
                     let xv=xinput.value;
                     let yv=yinput.value;
                     if(xv==null||xv==undefined||xv==""){
                        xv='0';
                     }
                     if(yv==null||yv==undefined||yv==""){
                        yv='0';
                     }
                     console.log(yv);
                    const task = {
                        x: xv,
                        y: yv
                    };
                
                    istance.send({ dati: task })
                        .then(() => istance.load())
                        .then(() => {
                            xinput.value="";
                            yinput.value="";
                        })
                        .catch(error => {
                            console.error(error);
                        });
                }
                
            
              calcola.onclick=()=>{
                let valori=callback(dati);
                console.info(valori)
                istance.stampacalcolata(valori);
              }
              

              
      
    },
    delete:function(index){
         fetch("/lin/delete", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({index:index})
        }).then(response => 
            istance.load()
        )
    },
    estraiDaCSV: function () {
        const reader = new FileReader();
        let file;
        fetch("/lin/file")
            .then(response => response.json())
            .then(json => {
               console.log(json);
               const byteCharacters = atob(json.file); 
    const byteArray = new Uint8Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteArray[i] = byteCharacters.charCodeAt(i);
    }
    const blob = new Blob([byteArray], { type: 'text/csv' });
    const reader = new FileReader();
    
    reader.onload = () => {
      const csvContent = reader.result;  
      console.log(csvContent);
      let row=csvContent.split("\n")
      let indicatore=0;
      if(row[0]=="X"||row[0]=="x"){
        indicatore=1;
    }
    console.log(indicatore);
      for(let i=indicatore;i<row.length;i++){
        console.log("row " +row);
        let valori=row[i].split(",");
        
        const task = {
            x: valori[0],
            y: valori[1]
        };
    console.log(task);
        istance.send({ dati: task })
            .then(() => istance.load())
            .then(() => {
               
            })
            .catch(error => {
                console.error(error);
            });
      }
     
    };
    
    reader.readAsText(blob);
   
                return json;
                
            })
                
            .catch(error => { throw error; });

    },
    load: function () {
        return fetch("/lin")
            .then(response => response.json())
            .then(json => {
                console.info("sono qui dentro ");
                dati = json.dati;
                istance.render();
                return json;
            })
            .catch(error => { throw error; });
    },
    send: function (dat) {
      console.info(dat);
        return fetch("/lin/add", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dat)
        })
        .then(response => response.json())
        .catch(error => { throw error; });
    },

    build: (data) => {
        console.info("ho fatto la build");
        dati=data;
      
    },
    elimina:()=>{
        return fetch("/lin/del", {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dati)
        })
        .then(response => response.json())
        .catch(error => { throw error; });
    },
    stampacalcolata:(diz) => {
        
        let html = `
        <div class="container">
<form class="inserimento">

  <input type="number" id="X "aria-label="X" class="form-control in" disabled>
  <input type="number" id="Y"aria-label="Y" class="form-control in" disabled>

<button type="button" id="Aggiungi" class="btn btn-light"  disabled  >Aggiungi</button>
<button type="button" id="Calcola"class="btn btn-light"  disabled >Calcola</button>
<input id="file" name="file" class="form-control "placeholder="Insercisci CSV"type="file" single disabled>
  <button type="button" id="CaricaCSV" class="btn btn-light b1" disabled>Aggiungi da CSV</button>
<button type="button" id="nuova" class="btn btn-primary b1" >Calcola nuovi dati </button>
</form>


<div class="mt-4" id="tab">
<table class="table table-bordered titolo radius">
<thead class="table-dark">
<tr>
    <th scope="col" class="px-6 py-3">
        X
    </th>
    <th scope="col" class="px-6 py-3">
        Y
    </th>
     <th scope="col" class="px-6 py-3">
        X*Y
    </th>
     <th scope="col" class="px-6 py-3">
        X^2
    </th>
     <th scope="col" class="px-6 py-3">
        Y^2
    </th>
</tr>
</thead>
<tbody class="titiolo">`;
for(let i=0;i<diz.x.length;i++){

html+= `
<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">` +
    diz.x[i] +
`</th>
<th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">` +
diz.y[i] +
`</th>
<th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">` +
diz.xy[i] +
`</th>
<th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">` +
diz.x2[i] +
`</th>
<th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">` +
diz.y2[i] +
`</th>
    
</tr>`;
}



html += `
                </tbody>
            </table>
        </div>
        <div class="container">
        <div class="row">
      
      <div class="col">
       
      
<table class="table table-bordered titolo radius">
    <thead class="table-dark titolo">
        <tr>
            <th>
            Calcoli fatti
            </th>
            <th>
            
            </th>
        </tr>
    </thead>

<tbody>
<tr>
<th>Media di X</th>
<th>`+diz.XsopS+`</th>
</tr>
<tr>
<th>Media di Y</th>
<th>`+diz.YsopS+`</th>
</tr>
<tr>
<th>Oxy</th>
<th>`+diz.Oxy+`</th>
</tr>
<tr>
<th>Ox</th>
<th>`+diz.Ox+`</th>
</tr>
<tr>
<th>Oy</th>
<th>`+diz.Oy+`</th>
</tr>
<tr>
<th>Ox^2</th>
<th>`+diz.Ox2+`</th>
</tr>
<tr>
<th>r</th>
<th>`+diz.r+`</th>
</tr>
<tr>
<th>CL</th>
<th>`+diz.CL+`</th>
</tr>
<tr>
<th>m</th>
<th>`+diz.m+`</th>
</tr>
<tr>
<th>Retta</th>
<th>`+diz.yRetta+`</th>
</tr>


</tbody>
</table>
</div>
     <div class="col">
     <div>
       <div class="contenitore">
        <div id="calculator" class="show"></div>
      </div>
     
    </div>
    </div>
        `;

parentElement.innerHTML = html;
const calc= document.getElementById("calculator");
const nuova=document.getElementById("nuova");
calc.setAttribute("class","show");
let calculator = Desmos.GraphingCalculator(calc);
calculator.setExpression({ id: 'Retta', latex: "y="+diz.yRetta });
nuova.onclick=()=>{
    dati={
        x:[],
        y:[]
    }
    istance.elimina().then(() => {
        istance.load().then(() => {
            istance.render();
        });
    });
    
    
  }
    }
  };
  return istance;
};

