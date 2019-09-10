/** @format */

import { Router } from 'express'

import knextion from '../db'

const router = Router()

router.get('/:id?', async (req, res) => {
    let id = req.params.id
    try {
        if (id) {
            return res.status(200).json(
                (await knextion('Categories')
                    .where({ id })
                    .select<ICategory[]>())[0],
            )
        } else {
            return res.status(200).json(await knextion('Categories').select<ICategory[]>())
        }
    } catch (err) {
        console.error(err)
        res.status(500).json('You failed')
    }
})

export default router
