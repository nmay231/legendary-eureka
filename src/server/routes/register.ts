/** @format */

import { Router } from 'express'
import knextion from '../db'
import { HashPassword } from '../utils/security/passwords'
import { CreateToken } from '../utils/security/tokens'

const router = Router()

router.post('/', async (req, res) => {
    let { email, password, name }: { email: string; password: string; name: string } = req.body
    if (!email || !password || !name) {
        return res.status(401).json('Must include email, password, and name in body')
    }
    try {
        let userid = (await knextion('Users').insert({
            email,
            password: HashPassword(password),
            name,
            role: 'guest',
        }))[0]
        let token = await CreateToken({ userid })
        return res.status(200).json({ token, userid, role: 'guest' })
    } catch (err) {
        console.error(err)
        return res.sendStatus(500).json('Failed to register user')
    }
})

export default router
