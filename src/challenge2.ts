import express, { json } from 'express';

const app = express();

app.use(express.json());
 

 

app.get('/stats', (req ,res ) => {
    var nums = req.query.nums;

    //verifica che nums sia un array
    if(!nums || !Array.isArray(nums) ){
        res.status(400).send(`<h1> Errore parametro non valido </h1>`);
        return;
    }
    
    // Converte l'array di stringhe in un array di numeri
    const numArray = nums.map(Number);

  
    
    //controlla se ci snon valori non numerici
    if(numArray.some(isNaN)) {
       res.status(400).send(`<h1>Errore: uno o più valori non sono numeri validi </h1>`)
    }

    //adesso facciamo i calcoli
    //la somma
    let somma = 0;
    for(let x of numArray) {
        somma +=x;
    }

    let media = somma/ numArray.length

    res.send(`
              <h1> la somma e la media di questi numeri:${numArray} </h1>
              <h2>somma: ${somma}</h2>
              <h2>la media: ${media}</h2>

            `)
   
   
})

app.post('/stats', (req, res) => {
    const body = req.body;
    const bodyNum = body.numeri;
    
    let sommaCalcolato = 0;
    for(let x of bodyNum) {
        sommaCalcolato += x
    }

    const mediaCalcolato = sommaCalcolato / bodyNum.length;
   
    console.log(typeof(bodyNum));
    console.log(bodyNum);

    res.send({somma : sommaCalcolato, media : mediaCalcolato})
} )
 


 
 
 
      
    
 

app.listen(3000, ()=> {
    console.log('Server load at http://localhost:3000');
})