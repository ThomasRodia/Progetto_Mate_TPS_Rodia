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
              }
              

              
      
    },

    build: (data) => {
        console.info("ho fatto la build");
        dati=data;
      
    }
  };
  return istance;
};

