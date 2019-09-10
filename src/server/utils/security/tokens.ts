/** @format */

import * as crypto from 'crypto'
import * as jwt from 'jsonwebtoken'
import * as moment from 'moment'

import knextion from '../../db'
// tokens(id, userid, token, expires, _created)

export const CreateToken = async (payload: IPayload) => {
    let [tokenid] = await knextion('tokens').insert<number[]>({ userid: payload.userid })
    payload.tokenid = tokenid
    payload.unique = crypto.randomBytes(32).toString('hex')
    payload.expires = moment(Date.now())
        .add(7, 'days')
        .toDate()
    let token = await jwt.sign(payload, process.env.AUTH_SECRET)
    await knextion('tokens')
        .update({ token, expires: payload.expires })
        .where({ userid: payload.userid })
    return token
}

export const RecoverToken = async (userid: number) => {
    let [tokenRow] = await knextion('tokens')
        .where({ userid })
        .select<{ token: string; expires: Date }[]>()
    let payload: IPayload

    try {
        payload = await ValidateToken(tokenRow.token)
    } catch (err) {
        return // If there is an error, the token is not valid
    }

    if (moment(payload.expires).isAfter(Date.now())) {
        payload.expires = moment(Date.now())
            .add(7, 'days')
            .toDate()
        let token = await jwt.sign(payload, process.env.AUTH_SECRET)
        await knextion('tokens')
            .update({ token, expires: payload.expires })
            .where({ userid })
        return token
    }
}

export const ValidateToken = async (token: string) => {
    let payload: IPayload = <IPayload>jwt.decode(token)
    if (!payload) {
        throw new Error('Invalid token!')
    }
    let [tokenid] = await knextion('tokens')
        .where({ id: payload.tokenid })
        .select<number[]>()
    if (!tokenid) {
        throw new Error('Invalid token!')
    } else {
        return payload
    }
}
