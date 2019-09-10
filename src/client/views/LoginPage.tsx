/** @format */

import * as React from 'react'
import Form from '../components/commons/Form'
import FormField from '../components/commons/FormField'
import { RouteComponentProps } from 'react-router'

interface ILoginPageProps extends RouteComponentProps {}

const LoginPage: React.FC<ILoginPageProps> = ({ history }) => {
    const isRegistering = Boolean(history.location.pathname === '/register')

    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [confirmPassword, setConfirmPassword] = React.useState('')

    React.useEffect(() => {
        try {
            document.getElementById('Name').focus()
        } catch (e) {
            document.getElementById('Email').focus()
        }
    }, [history.location.pathname])

    return (
        <section className="row d-flex">
            <div className="col-6 mx-auto">
                <Form
                    submit={() => {}}
                    submitText="Login"
                    className="card border rounded-lg p-4 shadow mt-5"
                >
                    {isRegistering && <FormField state={[name, setName]} name="Name" />}
                    <FormField state={[email, setEmail]} name="Email" type="email" />
                    <FormField state={[password, setPassword]} name="Password" type="password" />
                    {isRegistering && (
                        <FormField
                            state={[confirmPassword, setConfirmPassword]}
                            name="ComfirmPassword"
                            type="password"
                        />
                    )}
                </Form>
            </div>
        </section>
    )
}

export default LoginPage
