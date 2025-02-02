export const createTable = (parentElement) => {
    let dati=null;
    let istance;
    let callback;
  istance ={
    
   setcallback:(cb)=>{
callback=cb;
   },
    render: () => {
      

              let html = `
                        <div class="container">
      <form >
      <input type="text" id="X"  placeholder="inserisci valore X">
      <input type="text" id="Y"  placeholder="inserisci valore Y">
      <button type="button" id="Aggiungi" >Aggiungi</button>
      <button type="button" id="Calcola" >Calcola</button>
    </form>

    
    <div class="mt-4" id="tab">
        <table class="table table-striped">
            <thead class="">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        X
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Y
                    </th>
                </tr>
            </thead>
            <tbody>`;
            for(let i=0;i<dati.x.length;i++){
                
                html+= `
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">` +
dati.x[i] +
`</th>
<th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">` +
dati.y[i] +
`</th>
                    
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

              aggiungi.onclick = () =>{
                dati.x.push(xinput.value);
                dati.y.push(yinput.value);
                xinput.value="";
                yinput.value="";
                console.info(dati);
               
                istance.render();

              }
              calcola.onclick=()=>{
                let valori=callback(dati);
                console.info(valori)
                istance.stampacalcolata(valori);
              }
              

              
      
    },

    build: (data) => {
        console.info("ho fatto la build");
        dati=data;
      
    },
    stampacalcolata:(diz) => {
            
        let html = `
        <div class="container">
<form >
<input type="text" id="X"  placeholder="inserisci valore X" disabled  >
<input type="text" id="Y"  placeholder="inserisci valore Y" disabled  >
<button type="button" id="Aggiungi" disabled  >Aggiungi</button>
<button type="button" id="Calcola" disabled >Calcola</button>
<button type="button" id="nuova"  >Nuova Serie di dati </button>
</form>


<div class="mt-4" id="tab">
<table class="table table-striped">
<thead class="">
<tr>
    <th scope="col" class="px-6 py-3">
        X
    </th>
    <th scope="col" class="px-6 py-3">
        Y
    </th>
     <th scope="col" class="px-6 py-3">
        XY
    </th>
     <th scope="col" class="px-6 py-3">
        X^2
    </th>
     <th scope="col" class="px-6 py-3">
        Y^2
    </th>
</tr>
</thead>
<tbody>`;
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
<table>
<thead class="">
<tr>
Calcoli fatti
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
        `;

parentElement.innerHTML = html;
const nuova=document.getElementById("nuova");
nuova.onclick=()=>{
    dati={
        x:[],
        y:[]
    }
    istance.render();
  }
    }
  };
  return istance;
};

