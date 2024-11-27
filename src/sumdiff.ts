/**
 * /sum/2/3 -> 2 + 3 = 5
 * /diff/2/3 -> 2 - 3 = -1
 */
import express from 'express';

const app = express();

app.get('/sum/:num1/:num2', (req, res) =>{
   const num1 = Number(req.params.num1);
   const num2 = Number(req.params.num2);
   const sum = num1 +  num2;

   res.send(`
    <p> ${num1} +  ${num2} =  ${sum}</p>`)
   
})

app.get('/diff/:num1/:num2', (req, res) =>{
    const num1 = Number(req.params.num1);
    const num2 = Number(req.params.num2);
    const diff = num1 -  num2;
 
    res.send(`
     <p> ${num1} -  ${num2} =  ${diff}</p>`)
    
 })

 const computeSumAndMed = (nums: number[]): [number, number] => {
    let sum = 0;
    for(let n of nums) {
        sum += n;
    }

    const med = sum / nums.length;
    return [sum, med];
 }

 /*
   /stats?nums=1&nums=2&nums=3 -> media = 2 / somma = 6
 */


 app.get('/stats', (req, res) =>{
     const nums : number [] = (req.query.nums as string []).map((n) =>{
        return Number(n);
     });

    // const computes = computeSumAndMed(nums);  
    // const sum = computes[0];
    // const med = computes[1];
    // un modo veloce per scrivere questo è la seguente

    const [sum, med] = computeSumAndMed(nums); // il primo che ritorna lo assegna al sum e il secondo med
    
    res.send(`
       <p> La somma è ${sum}</p>
       <p> La media è ${med}</p>
     `)
    
 });

/*
   / POST /stats // [1,2,3]

   {
     sum: 6,
     med: 2
   }
 */

 app.use(express.json());
 app.post('/stats',(req, res) =>{
    const numbers: number [] = req.body;
    console.log(numbers);

    const [sum, med] = computeSumAndMed(numbers)
    res.send({ sum, med});
    return
   
})

app.listen(3000 , ()=> {
    console.log('🚀  started at http://localhost:3000')
})