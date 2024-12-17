import express from "express";
import {pgPool} from './pg_connection.js'
import { startSession } from "pg/lib/crypto/sasl.js";

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



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
    const { username, name, password } = req.body;

    if (!username || !name || !password) {  // Checking for invalid input
        console.log(username,name,password)
        return res.status(400).json({ message: 'Missing required fields' });

    }

    try{

        // Automatic input for new id
        const result = await pgPool.query("SELECT COUNT(*) AS count FROM users"); 
        const newId = parseInt(result.rows[0].count, 10) + 1;

        await pgPool.query(
            "INSERT INTO users (username, name, password, user_id) VALUES ($1, $2, $3, $4)",
            [username, name, password, newId]
        );
        if(result.rows.length === 0)    // Error handling
            return res.status(404).json({ message: 'Could not add user' });
        res.json({ message: 'User added'})
        console.log('Successfully added user' + username)
    } catch(e) {
        console.log(e)
    }
})
app.post('/addReview', async (req,res) => { 
    const {customer_id, movie_id, stars, review_text} = req.body

    // review ID
    const result = await pgPool.query("SELECT COUNT(*) AS count FROM reviews"); 
    const newId = parseInt(result.rows[0].count, 10) + 1;

    // current date
    const review_date = new Date()
    const date = review_date.getFullYear() + "-" + (review_date.getMonth() +1 ) + "-" + review_date.getDate()

    // Checking for invalid input
    if (!customer_id || !movie_id, !review_date, !review_text) {  
        console.log(customer_id,movie_id)
        return res.status(400).json({ message: 'Missing required fields' });
    }
    if(stars > 5)
        return res.status(400).json({ message: 'Star count over 5' });
    if(Number(stars)== isNaN)
        return res.status(400).json({ message: 'Star rating not a number' });

    try{
        const result = await pgPool.query("INSERT INTO reviews (review_id, customer_id, review_date, movie_id, stars, review_text) VALUES ($1, $2, $3, $4, $5, $6)",
        [newId, customer_id, date, movie_id, stars, review_text]
        )
        
        if(result.rows.length === 0)    // Error handling
            return res.status(404).json({ message: 'Could not add review' });
        
    }catch(e)
    {
        console.log(e);
    }
})
