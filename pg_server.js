import express from "express";
import pg from "pg"
import dotenv from "dotenv"

dotenv.config()

const app = express();

const {Client} = pg

app.listen(3001, () => {
    console.log('Running!n')
})

const client = new Client()

connect()

async function connect() {
   // await client.connect()

    try {
        await client.connect()
        await client.query("INSERT INTO company VALUES ('OAMK', 'Biologiantie 12', 'Oulu')")
        console.log('Database connected')
    } catch (error) {
        console.log(error)
    }
}