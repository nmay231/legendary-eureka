/** @format */

import { Router } from 'express'

import knextion from '../db'
import { isUser, BearerStrategy } from '../middlewares/authCheckpoints'

// Books(id, categoryid, author, title, price, _created)

const router = Router()

router.use(BearerStrategy())

router.get('/:id?', async (req, res) => {
    let id = req.params.id
    try {
        if (id) {
            return res.status(200).json(
                (await knextion('Books')
                    .where({ id })
                    .select<IBook[]>())[0],
            )
        } else {
            return res.status(200).json(await knextion('Books').select<IBook[]>())
        }
    } catch (err) {
        console.error(err)
        res.status(500).json('You failed')
    }
})

router.post('/', isUser, async (req, res) => {
    let {
        categoryid,
        author,
        title,
        price,
    }: { categoryid: number; author: string; title: string; price: number } = req.body
    if (!categoryid || !author || !title || !price) {
        return res.status(422).json('Must include categoryid, author, title, price in body')
    }
    try {
        await knextion('Books').insert({ categoryid, author, title, price })
        return res.status(200).json('success')
    } catch (err) {
        console.error(err)
        return res.sendStatus(500)
    }
})

router.put('/:id', isUser, async (req, res) => {
    let id = req.params.id
    let {
        categoryid,
        author,
        title,
        price,
    }: { categoryid: number; author: string; title: string; price: number } = req.body
    if (!parseInt(id)) {
        return res.status(422).json('Invalid id')
    }
    if (!categoryid && !author && !title && !price) {
        return res.status(422).json('Must include some of categoryid, author, title, price in body')
    }
    try {
        await knextion('Books')
            .where({ id })
            .update({ categoryid, author, title, price })
        return res.status(200).json('success')
    } catch (err) {
        console.error(err)
        return res.sendStatus(500)
    }
})

router.delete('/:id', isUser, async (req, res) => {
    let id = req.params.id
    if (!parseInt(id)) {
        return res.status(422).json('Invalid id')
    }
    try {
        await knextion('Books')
            .where({ id })
            .delete()
        return res.status(200).json('success')
    } catch (err) {
        console.error(err)
        return res.status(500).json('You failed')
    }
})

export default router
