export const createTableStorico = (parentElement) => {
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
        <table class="table table-bordered tabellina radius ">
            <thead class="table-dark titolo">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        Data
                    </th>
                    <th scope="col" class="px-6 py-3">
                        X
                    </th>
                     <th scope="col" class="px-6 py-3">
                        Y
                    </th>
                    <th scope="col" class="px-6 py-3">
                        SELEZIONA
                    </th>
                </tr>
            </thead>
            <tbody class="titiolo">`;

            for(let i=0;i<dati.length;i++){
                
                html+= `
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">` +
dati[i].data +
`</th>
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">` +
dati[i].x +
`</th>
<th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">` +
dati[i].y +
`</th>
<th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"><a href="./index.html"><button class="btn btn-dark titolo" id="seleziona">SELEZIONA</button></a>

</th>
                    
                </tr>`;
            }

             

              html += `
                                </tbody>
                            </table>
                        </div>
                    </div>
                        `;
                       // console.info(html);

              parentElement.innerHTML = html;

    document.querySelectorAll("#seleziona").forEach((button, index) => {
        button.onclick = () => {
               istance.select(index);
           
        };
    });

              
      
    },
    select: function (indice) {
        let xv = dati[indice].x;
        let yv = dati[indice].y;
        console.info({ x: xv, y: yv });
        let fin=callback({ x: xv, y: yv })
        localStorage.setItem('datiCalcolati', JSON.stringify(fin));
    },

    load: function () {
        return fetch("/lin/getstorico")
            .then(response => response.json())
            .then(json => {
                console.info("Dati caricati:", json);
                dati = json;
                istance.render();
                return json;
            })
            .catch(error => { console.error("Errore nel caricamento:", error); });
    }
  };
  return istance;
};

