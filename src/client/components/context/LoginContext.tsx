/** @format */

import * as React from 'react'

const LoginContext = React.createContext<[IToken, React.Dispatch<React.SetStateAction<IToken>>]>([
    { token: undefined, userid: -1, role: 'guest' },
    (user: IToken) => console.log('You should not see this'),
])

const LoginProvider: React.FC = ({ children }) => {
    const [user, setUser] = React.useState<IToken>({ token: undefined, userid: -1, role: 'guest' })

    return <LoginContext.Provider value={[user, setUser]}>{children}</LoginContext.Provider>
}

export { LoginProvider, LoginContext }
