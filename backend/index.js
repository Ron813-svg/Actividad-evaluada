import app from './app.js'
import { config } from './src/config.js'
import './database.js'

async function main() {
    app.listen(config.server.port);

    console.log("Me prendio el servidor");
}



main()