/** @format */

// Project: Full-stack Blog
// Definitions by: Noah May <https://github.com/nmay231>

declare interface IUser {
    id: number
    name: string
    email: string
    role?: string
    password?: string
}

declare interface ICategory {
    id?: number
    name: string
}

declare interface IBook {
    id?: number
    title: string
    author: string
    categoryid: number
    price: number
    _created?: Date
}

declare interface IToken {
    id?: number
    token: string
    userid: number
    role?: 'guest' | 'admin'
    _created?: Date
}

declare interface IPayload {
    userid: number
    // expires?: Date
    tokenid?: number
    unique?: string
}
