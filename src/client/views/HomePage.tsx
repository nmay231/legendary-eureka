/** @format */

import * as React from 'react'
import { Link } from 'react-router-dom'

interface IHomePageProps {}

const HomePage: React.FC<IHomePageProps> = () => {
    return (
        <section className="row">
            <h1 className="col-12 text-center my-5">
                Welcome to <span className="font-italic">Barnes & Noah</span>
            </h1>
            <div className="col-12 d-flex flex-column align-items-center">
                <h3 className="text-center my-3">Look around at all our books or sign in</h3>
                <div className="d-flex">
                    <Link to="/books" className="btn btn-primary mx-2">
                        Go to books
                    </Link>
                    <Link to="/login" className="btn btn-info mx-2">
                        Login
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default HomePage
