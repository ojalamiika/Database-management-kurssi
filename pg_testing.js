import {pgPool} from './pg_connection.js'

try{
    await pgPool.query('')
} catch(e) {
    console.log(e.message)
}

