import { createTable } from "./createTable.js";
//import { createNavigator } from "./navigator.js";

//const navigator = createNavigator(document.querySelector("#container"));

let data={
    x:[],
    y:[]
}

function calcola(dati){
    
    let fin={
        x:[],
        y:[],
        xy:[],
        x2:[],
        y2:[],
        XsopS:0,
        YsopS:0,
        r:0,
        CL:"",
        Ox:0,
        Oy:0,
        Oxy:0,
        Ox2:0,
        m:0,
        yRetta:"",
        Data: new Date()
    }
    fin.x=dati.x;
    fin.y=dati.y;
    fin.YsopS=calcolaMedia(fin.y);
    fin.XsopS=calcolaMedia(fin.x);
    fin.Oxy=calcolaCovarianza(fin);

    fin.Ox=calcolaDeviazioneStandar(fin.x);
    fin.Oy=calcolaDeviazioneStandar(fin.y);
    
    fin.r=fin.Oxy/(fin.Ox*fin.Oy);
    if(fin.r==1){
        fin.CL="CLP Perfetta";
    }else if(fin.r==-1){
        fin.CL="CLN Perfetta";
    }else if(fin.r>0.7&&fin.r<1){
        fin.CL="CLP Forte";
    }else if(fin.r>0.3&&fin.r<0.7){
        fin.CL="CLP Moderata";
    }else if(fin.r>0&&fin.r<0.3){
        fin.CL="CLP Debole";
    }else if(fin.r<-0.7&&fin.r>-1){
        fin.CL="CLN Forte";
    }else if(fin.r<-0.3&&fin.r>-0.7){
        fin.CL="CLN Moderata";
    }else if(fin.r<0&&fin.r>-0.3){
        fin.CL="CLN Debole";
    }else if(fin.r==0){
        fin.CL="Nessuna Correlazione Lineare";
    }
    fin.Ox2=CalcolaOx2(fin);
    fin.m=fin.Oxy/fin.Ox2;
    
    fin.yRetta=fin.YsopS+"+"+fin.m+"*(x-"+fin.XsopS+")";
    for(let i=0;i<fin.y.length;i++){
        fin.y2.push(Math.pow(fin.y[i],2));
    }
    //let elt = document.getElementById('calculator');
   
    return fin;
    
}


function calcolaCovarianza(fin){
    let arrX=fin.x;
    let arrY=fin.y;
    let XsopraSegnato=fin.XsopS;
    let YsopraSegnato=fin.YsopS
    if(!arrY.length==arrY.length){
        console.log("Valori inseriti mancano X o Y , i dati non sono uguali");
        return -1;
    }
    fin.xy=calcolaXxY(arrX,arrY);
    
    let ris=0;
    for(let i=0;i<fin.xy.length;i++){
        console.info( "OXY : "+fin.xy[i]/arrX.length)
     ris+=fin.xy[i]/arrX.length;
    }
    console.info(ris);
    ris=ris-(XsopraSegnato*YsopraSegnato);
    return ris;
}



function calcolaXxY (arrX,arrY){
    let prodotto=[];
    if(!arrY.length==arrY.length){
        console.log("Calcola X x Y = Valori inseriti mancano X o Y , i dati non sono uguali");
        return -1;
    }
    for(let i=0;i<arrY.length;i++){
     prodotto.push(arrX[i]*arrY[i]);
    }
    return prodotto;
}




function calcolaMedia(arr){
    let media;
    let somma = 0;
    console.info("Array media "+arr);
    for(let i= 0;i<arr.length;i++){
        somma+=parseInt(arr[i]);
    }
    console.info("somma " +somma);
    console.info("lunghezza"+arr.length);
    media=somma/arr.length;
    console.info("media "+media);
    return media;
}



function calcolaDeviazioneStandar(arr){
    let ris=0;
    for(let i=0;i<arr.length;i++){
      ris+=(Math.pow(arr[i],2)/arr.length);
    }
    ris=ris-Math.pow(calcolaMedia(arr),2)
    return Math.sqrt(ris);
}



function CalcolaOx2(fin){
let ris=0;
for(let i=0;i<fin.x.length;i++){
    fin.x2.push(Math.pow(fin.x[i],2));
  }
console.info("x2= "+fin.x2);
  for(let i=0;i<fin.x.length;i++){
    ris+=fin.x2[i]/fin.x.length;
}

ris-=(Math.pow(fin.XsopS,2));
  return ris;
}

const regressione=document.getElementById("Tabella_Valori");
let tabella=createTable(regressione);
tabella.load().then(() => {
});
tabella.setcallback(calcola);


/*
// Aggiorna la lista ogni 30 secondi
setInterval(() => {
    tabella.load().then(() => {
        
    }).catch(error => {
        console.error(error);
    });
}, 30000);

*/



