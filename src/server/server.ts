/** @format */

import * as express from 'express'
import apiRouter from './routes'
import morgan = require('morgan')
import helmet = require('helmet')

const app = express()

app.use(express.static('public'))
app.use(express.json())
app.use(morgan('dev'))
app.use(helmet())
app.use(apiRouter)

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server listening on port: ${port}`))
