import express from 'express';

const app = express();

//'?firstName=bruno&lastastName=loy '
let cnt = 0;

app.get('/', (req, res) => {
    const minus =Number(req.query.minus) ;
    if(Number.isInteger(minus)){
        cnt -=minus;
    } else {
        cnt += 1;
    }
    
    console.log(req.query);
    res.send(`
        <h1> Ciao lacerba </h1> 
        <p> Questo è il nostro primo server!! </p> 
        <P> Numero di accessi: ${cnt} </p>
        `)
});


app.get('/greeting/:name', (req, res) => {
    console.log(req.params);
    const name: string = req.params.name;
    res.send(`<h1> Ciao ${name} </h1> <p> Questa è la pagina greeting!! </p>`)
});


app.get('/ciao', (req, res) => {
    res.send("<h1> Ciao lacerba </h1> <p> Questa è la pagina ciao! </p> ")
});

app.get('*', (req, res) => {
    res.send("<h1> 404 </h1> <p> Pagina non trovata!! </p> ")
});


app.listen(3000, () => {
    console.log('🚀 server started at http://localhost:3000 ')
});
