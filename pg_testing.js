import {pgPool} from './pg_connection.js'

const mName = 'Hekan fragmovie'
const mYear = '2024'
const mGenre = 'Rakkaus'
const mKeywords = 'Sekopää'

try{
    //const result = await pgPool.query("INSERT INTO movie (movie_id, movie_name, year, genre, keywords) VALUES ('1', 'Matin_elokuva', '2022', 'Kauhu', 'Pelottava')")
    const result = await pgPool.query('SELECT * FROM movie')
    const mId = result.rowCount + 1
    console.log(mId)
    
    const results = await pgPool.query("INSERT INTO movie VALUES ($1, $2, $3, $4, $5)", [mId, mName, mYear, mGenre, mKeywords, ])
    console.log(results)
} catch(e) {
    console.log(e.message)
}

