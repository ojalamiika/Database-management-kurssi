import express from "express";
import multer from "multer"

const app = express();
app.use(express.json())

app.use(express.urlencoded({extended:true}))
app.use(multer({dest: "uploads/"}).none())

app.listen(3001, () => {
    console.log('Running!n')
})

let users = []

app.post('/user', (req, res) => {
    

    users.push(req.body)

    res.send(`Username ${req.body.uname} added`)
})

app.get('/users', (req,res) => {
    res.json(users)
})

app.get('/userinfo', (req, res) => {
  let result = {count: users.length}
  
  let sum = 0;
  users.forEach(u=> sum += Number(u.salary))

  result.salarySum = sum

  result.users = users

  res.json(result)

})