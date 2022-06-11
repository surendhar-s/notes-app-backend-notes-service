import { json, urlencoded } from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import routes from './routes'
import dbConnection from './utils/dbConnection'
import { init } from './utils/socket'

const app = express()
const APP_PORT = 3201
const APP_HOST = 'localhost'
let server = null

app.use(urlencoded({ extended: true }));
app.use(json())
app.use(cors())
app.use(cookieParser())
app.use('/api', routes)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
    next();
});

dbConnection()
    .then(() => {
        server = app.listen(APP_PORT, APP_HOST, () => {
            console.log("Notes Server started");
        });
        let io = init(server)
        io.on("connection", () => {
            // console.log("Client connected")
        })
    }).catch(() => {
        console.log("Error in DB connection")
    })
    .catch(e => console.log(e))