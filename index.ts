import http from 'http'
import app from './app'

const server = http.createServer(app)

server.listen(8000, () => {
    console.log("Listening to port 8000")
})