import dotenv from 'dotenv'
import pg from 'pg'
dotenv.config()

const pgPool = new pg.Pool({
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE,
    user: process.env.PG_USER,
    password: process.env.PGPASSWORD
})

export {pgPool}