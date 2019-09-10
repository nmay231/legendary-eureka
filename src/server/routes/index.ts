/** @format */

import { Router } from 'express'

import CategoriesAPI from './categories'
import BooksAPI from './books'

import LoginAuth from './login'
import RegisterAuth from './register'

const router = Router()

router.use('/api/categories', CategoriesAPI)
router.use('/api/books', BooksAPI)
router.use('/api', (req, res) => res.sendStatus(404))

router.use('/auth/login', LoginAuth)
router.use('/auth/register', RegisterAuth)
router.use('/auth', (req, res) => res.sendStatus(404))

export default router
