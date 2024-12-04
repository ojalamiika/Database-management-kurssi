import express from "express";
import {pgPool} from './pg_connection.js'

// dotenv.config()

const app = express();
app.use(express.json())

app.listen(3001, () => {
    console.log('Running!n')
})


// Dummy response
app.get('/movies', (req,res) => {
    res.json([
        { id: 1, title: 'Inception', year: 2010 },
        { id: 2, title: 'Interstellar', year: 2014 }
    ])
})
    try {
        await pgPool.connect()
        console.log('Database connected')
        
    } catch (error) {
        console.log(error)
    }

app.get('/movie', async (req,res) => {
    try{
        const result = await pgPool.query('SELECT * FROM movie')
        res.json(result.rows)
        console.log(result)
    } catch(e) {
        console.log(e);
    }
})




