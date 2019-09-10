/** @format */

import * as React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import { LoginProvider } from './components/context/LoginContext'

import HomePage from './views/HomePage'
import LoginPage from './views/LoginPage'
import EditBookPage from './views/EditBookPage'
// import HomePage from './views/HomePage'
// import HomePage from './views/HomePage'

import Navigation from './components/standalone/Navigation'

const App: React.FC = () => {
    return (
        <LoginProvider>
            <Router>
                <Navigation />
                <main className="container">
                    <Switch>
                        <Route exact path="/" component={HomePage} />
                        <Route path="/login" component={LoginPage} />
                        <Route path="/register" component={LoginPage} />
                        <Route exact path="/books" component={() => <div>all books</div>} />
                        <Route path="/books/new" component={EditBookPage} />
                    </Switch>
                </main>
            </Router>
        </LoginProvider>
    )
}

export default App
