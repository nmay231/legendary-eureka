/** @format */

import * as path from 'path'
import * as express from 'express'
import apiRouter from './routes'
import morgan = require('morgan')
import helmet = require('helmet')
import passport = require('passport')

import './middlewares'

const app = express()

app.use(express.static('public'))
app.use(express.json())
app.use(morgan('dev'))
app.use(helmet())
app.use(passport.initialize())
app.use(apiRouter)

app.use('*', (req, res) => res.sendFile(path.resolve(__dirname, '../public/index.html')))

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server listening on port: ${port}`))
