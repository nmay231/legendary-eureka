/** @format */

import { Router } from 'express'

import CategoriesAPI from './categories'
import BooksAPI from './books'

import LoginAuth from './login'
import RegisterAuth from './register'

const router = Router()

router.get('/hello', (req, res) => res.json('yellow'))

router.use('/api/categories', CategoriesAPI)
router.use('/api/books', BooksAPI)

router.use('/auth/login', LoginAuth)
router.use('/auth/register', RegisterAuth)

export default router
