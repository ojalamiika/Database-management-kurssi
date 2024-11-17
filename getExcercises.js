import express from "express";

var app = express()

app.listen(3001, () => {
    console.log('Server is ok...')
})

app.get('/', (req, res) =>{
    res.send('HELLO!')
})

app.get('/aaa', (req, res) => {
    res.send('Haloo')
})

app.get('/json', (req, res) => {
    const person = {name:'Joni', age:'30'}
    res.json(person)
})

app.get('/array', (req, res) => {
    const items = ['apple', 'banana', 'tietokone'];
    res.json(items);
  });

  app.get('/2/:text',(req,res) => {
    let text = req.params.text

    res.send(`The lenght of the text is ${text.length}`)
  })

  app.get('/teht3/:num1/:num2', (req, res) => {
    let n1 = Number(req.params.num1)
    let n2 = Number(req.params.num2)
    let sum = n1 + n2
    res.send(`Sum of numbers ${n1} and ${n2} equals ${sum}`)
  })

  app.get('/teht4', (req, res) => {
    let n1 = Number(req.params.num1)
    let n2 = Number(req.params.num2)
    let sum = n1 + n2
    res.send(`Sum of numbers ${n1} and ${n2} equals ${sum}`)
  })

  app.get('/user/:id', (req,res)=>{
    if(isNaN(req.params.id))
    {
        res.status(400).send('not a nummber')
    }
    else
    {
        let user = null;

        if(user){
            res.json(user)
        } else {
            res.status(404).json({Error: 'The user was not found..'})
        }
    }
  })

const users = ['jani', 'matti','joe','aleksi']

  app.get('/teht6',(res,req) => {

  })