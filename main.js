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
        y:""
    }
    fin.x=data.x;
    fin.y=dati.y;
    fin.Ox=calcolaDeviazioneStandar(fin.x);
    fin.Oy=calcolaDeviazioneStandar(fin.y);
    fin.Oxy=calcolaCovarianza(fin.x,fin.y);
    fin.r=Oxy/(Ox*Oy);
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
        fin.CL="CLM Debole";
    }else if(fin.r==0){
        fin.CL="Nessuna Correlazione Lineare";
    }
    fin.Ox2=CalcolaOx2(fin.x);
    fin.m=fin.Oxy/Ox2;
    fin.YsopS=calcolaMedia(fin.y);
    fin.YsopS=calcolaMedia(fin.x);
    fin.y=fin.YsopS+"+"+fin.m+"*(x-"+fin.XsopS+")";
}


function calcolaCovarianza(arrX,arrY){
    if(!arrY.length==arrY.length){
        console.log("Valori inseriti mancano X o Y , i dati non sono uguali");
        return -1;
    }
    let prodotti=calcolaXxY(arrX,arrY);
    let XsopraSegnato=calcolaMedia(arrX);
    let YsopraSegnato=calcolaMedia(arrY);
    let ris=0;
    for(let i=0;i<prodotti.length;i++){
     ris+=prodotti[i]/arrX.length;
    }
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
    let somma= 0;
    for(let i= 0;i<arr.length;i++){
        somma+=arr[i];
    }
    media=somma/arr.length;
    return media;
}
function calcolaDeviazioneStandar(arr){
    let ris=0;
    for(let i=0;i<arr.length;i++){
      ris+=(Math.pow(arr[i],2)/arr.length);
    }
    ris=ris-Math.pow(arr[i],2)
    return ris;
}
function CalcolaOx2(arr){
let x2=[]
let ris;
for(let i=0;i<arr.length;i++){
    x2.push(Math.pow(arr[i],2));
  }

  for(let i=0;i<arr.length;i++){
    ris+=x2[i]/arr.length;
}
ris-=(Math.pow(calcolaMedia(arr),2));
  return ris;
}
//function calcolaCoefficenteDiRelazioneLineare(Oxy,Ox,Oy)