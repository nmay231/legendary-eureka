/** @format */

import * as path from 'path'
import Axios from 'axios'
import { Method } from 'axios'

export const BOOKS_API = '/api/books'
export const CATEGORIES_API = '/api/categories'
// export const USERS_API = '/api/users'

export const LOGIN_ENDPOINT = '/auth/login'
export const REGISTER_ENDPOINT = '/auth/register'

export function join(...paths: string[]) {
    return path.join(...paths)
}

export const unauthedJson = async <T>(
    url: string,
    method: Method = 'GET',
    body?: {},
    headers?: {},
): Promise<T> => {
    headers = { ...(headers || {}) }
    let result: any = (await Axios.request({
        url,
        method,
        data: body,
        headers,
    })).data

    if ((method === 'GET' || method === 'get') && result) {
        return result
    }
}
