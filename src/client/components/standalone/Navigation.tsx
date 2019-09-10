/** @format */

import * as React from 'react'
import { NavLink } from 'react-router-dom'

const Navigation: React.FC = () => {
    return (
        <nav className="navbar navbar-dark navbar-expand-lg bg-dark d-flex">
            <NavLink exact to="/" className="btn btn-dark my-1 mx-2">
                Home
            </NavLink>
            <NavLink exact to="/login" className="btn btn-dark my-1 mx-2">
                Login
            </NavLink>
            <NavLink exact to="/register" className="btn btn-dark my-1 mx-2">
                Register
            </NavLink>
            <NavLink exact to="/books" className="btn btn-dark my-1 mx-2">
                All Books
            </NavLink>
            <NavLink exact to="/books/new" className="btn btn-dark my-1 mx-2">
                Add Book
            </NavLink>
        </nav>
    )
}

export default Navigation
