/** @format */

import * as React from 'react'
import { RouteComponentProps, withRouter } from 'react-router'

interface IFormProps extends RouteComponentProps {
    className?: string
    submitText: string
    cancelText?: string
    submit: Function
    cancel?: Function
}

const Form: React.FC<IFormProps> = ({
    submitText,
    submit,
    cancelText = 'Cancel',
    cancel,
    className,
    history,
    children,
}) => {
    if (!cancel) {
        cancel = () => history.goBack()
    }

    if (!className) {
        className = 'card border rounded-lg p-4 shadow'
    }

    const handleSubmit: React.FormEventHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        submit()
    }

    const handleCancel: React.MouseEventHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        cancel()
    }

    return (
        <form onSubmit={handleSubmit} className={className}>
            {children}
            <div className="d-flex justify-content-around mt-2">
                <button role="submit" className="btn btn-primary">
                    {submitText}
                </button>
                <button role="button" className="btn btn-secondary" onClick={handleCancel}>
                    {cancelText}
                </button>
            </div>
        </form>
    )
}

export default withRouter(Form)
