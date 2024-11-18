import express from 'express';

const app = express();

app.get('/sum/:n1/:n2', (req, res) => {
    console.log(req.params);

    //Converti i parametri in numeri
    const firstNumber: number = parseFloat(req.params.n1);
    const secondNumber: number = parseFloat(req.params.n2);


    //Controlla se i valori sono validi numeri
    if (isNaN(firstNumber) || isNaN(secondNumber)) {
        res.status(400).send('invalid number')
    };

    //Fai il calcolo
    const sum = firstNumber + secondNumber


    res.send(`<h1>Benvenut(o/a) nella famosa app per fare calcoli  </h1> <p>Ecco la differenza dei numeri inseriti: ${sum}</p>`)
});

app.get('/diff/:n1/:n2', (req, res) => {
    console.log(req.params);

    //Converti i prametri in numeri
    const firtsNumber = parseFloat(req.params.n1);
    const secondNumber = parseFloat(req.params.n2);

    //controllo se i valori sono validi numeri
    if(isNaN(firtsNumber) || isNaN(secondNumber) ) {
        res.status(400).send('Invalid number');
    }

    if(firtsNumber < secondNumber) {
        res.status(400).send('<h1>N1 DEVE ESSERE MAGGIORE DI N2')
    }

    //Faccio i calcoli

    const diff = firtsNumber - secondNumber

    res.send(`<h1>Benvenut(o/a) nella famosa app per fare calcoli  </h1> <p>Ecco la differenza dei numeri inseriti: ${diff}</p>`)



})


//controllo in caso di calcoli non fattibile

app.get('*', (req, res) => {
    res.send("<h1> 404 </h1> <p> Pagina non trovata!! </p> ")
});





app.listen(5000, () => {
    console.log('🚀💀 Server started at http://localhost:5000')
})