/** @format */

import { Router } from 'express'
import knextion from '../db'
import { ComparePassword } from '../utils/security/passwords'
import { RecoverToken, CreateToken } from '../utils/security/tokens'

const router = Router()

router.post('/', async (req, res) => {
    let { email, password }: { email: string; password: string } = req.body

    if (!email || !password) {
        return res.status(401).json('Must include user and password in body!')
    }

    let user = (await knextion('Users')
        .where({ email })
        .select<IUser[]>())[0]
    if (!user) {
        return res.status(401).json('Invalid Credentials')
    }

    if (ComparePassword(password, user.password)) {
        let token = await RecoverToken(user.id)
        if (!token) {
            token = await CreateToken({ userid: user.id })
        }
        return res.status(200).json({
            userid: user.id,
            role: user.role,
            token,
        })
    } else {
        res.status(401).json('Invalid credentials')
    }
})

export default router
