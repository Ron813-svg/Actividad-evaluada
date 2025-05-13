import app from './app.js'
import { config } from './src/config.js'
import './database.js'

async function main() {
    try {
        app.listen(config.port, () => {
            console.log(`Server is running on port ${config.server.port}`)
        })
    } catch (error) {
        console.error('Error starting server:', error)
    }
}

main()