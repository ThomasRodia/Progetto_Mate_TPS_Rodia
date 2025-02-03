export const createTable = (parentElement) => {
    let dati=null;
    let istance;
    let callback;
  istance ={
    
   setcallback:(cb)=>{
callback=cb;
   },
    render: () => {
      const calc= document.getElementById("calculator");

              let html = `
                        <div class="container">
     

    
    <div class="mt-4" id="tab">
        <table class="table table-bordered tabellina ">
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
<th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"><button class="btn btn-danger titolo" id="seleziona">SELEZIONA</button

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

    document.querySelectorAll("#seleziona").forEach((button, index) => {
        button.onclick = () => {
               istance.select(index);
           
        };
    });

              
      
    },
    select:function(){},
    
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
    }
    /*,
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
    }

    */
    
  };
  return istance;
};

