import express from "express";
import {pgPool} from './pg_connection.js'

const app = express()

app.listen(3001, () => {
    console.log('Running!n')
})

// List of movies
app.get('/movies', async (req,res) =>{
    try{
        const result = await pgPool.query('SELECT * FROM movie')
        res.json(result.rows)
    } catch(e) {
        console.log(e);
    }
})

// Searching a movie by ID
app.get('/movies/:id', async (req,res) => {
    const id = Number(req.params.id)

    if(isNaN(id))
        return res.status(400)

    try{
        const result = await pgPool.query("SELECT * FROM movie WHERE movie_id=$1 ", [id] )
        if(result.rows.length === 0)
            return res.status(404).json({ message: 'Movie not found' });
        res.json(result.rows[0]);
    } catch(e) {
        console.log(e)
    }
})

// Deleting a movie
app.get('/deletemovie/:id',async (req, res) => {
    const id = Number(req.params.id)

    try{
        
        const result = await pgPool.query("DELETE FROM movie WHERE movie_id = $1", [id])
        if(result.rows.length === 0)
            return res.status(404).json({ message: 'Movie not found' });
        res.json({ message: 'Movie deleted'})
    } catch(e) {
        console.log(e)
    }
})

// Getting movies by keyword, also added suggestions
app.get('/moviebykey/:key', async (req,res) => {
    const keyword = req.params.key
    console.log(keyword)

    try{
        const result = await pgPool.query('SELECT * FROM movie WHERE keywords=$1', [keyword])
        const suggestions = await (await pgPool.query('SELECT keywords FROM movie WHERE keywords IS NOT NULL'))

        if(result.rows.length === 0)
            return res.json({ message: `Movie not found with keyword ${keyword}, try ${suggestions.rows.map(row => row.keywords)} `});
        res.json(result.rows)
    } catch(e) {
        console.log(e);
    }
})

app.post('/addUser', async (req, res) => {
    const uname = req.body.uname
    const fname = req.body.fname
    const password = req.body.password
    const birth_date = req.body.birth_date

    try{
        const result = await pgPool.query("INSERT INTO users VALUES username=$1, name=$2, password=$3, birth_date=$4", [uname, fname,password,birth_date])
        

    } catch(e) {

    }

})
