/** @format */

import * as React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import { LoginProvider } from './components/context/LoginContext'

import HomePage from './views/HomePage'
import LoginPage from './views/LoginPage'
import EditBookPage from './views/EditBookPage'
import AllBooksPage from './views/AllBooksPage'
// import HomePage from './views/HomePage'

import Navigation from './components/standalone/Navigation'
import useLogin from './utils/useLogin'
import LoginListener from './components/context/LoginListener'

const App: React.FC = () => {
    return (
        <LoginProvider>
            <LoginListener />
            <Router>
                <Navigation />
                <main className="container">
                    <Switch>
                        <Route exact path="/" component={HomePage} />
                        <Route path="/login" component={LoginPage} />
                        <Route path="/register" component={LoginPage} />
                        <Route exact path="/books" component={AllBooksPage} />
                        <Route exact path="/books/new" component={EditBookPage} />
                        <Route exact path="/books/:id/update" component={EditBookPage} />
                        <Route exact path="/books/:id" component={AllBooksPage} />
                    </Switch>
                </main>
            </Router>
        </LoginProvider>
    )
}

export default App
