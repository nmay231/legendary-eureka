/** @format */

import React from 'react'

interface IFormFieldProps {
    state: [string, (s: string) => void]
    name: string
    type?: 'text' | 'password' | 'email' | 'textarea'
    transform: (s: string) => string
}

const FormField: React.FC<IFormFieldProps> = ({ state, name, type = 'text', transform }) => {
    const [val, setVal] = state

    const handleChange: React.ChangeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVal(transform(e.target.value))
    }

    let inputId = name.split(' ').join('-')

    return (
        <div className="form-group">
            <label htmlFor={inputId}>{name}</label>
            {type === 'textarea' ? (
                <textarea id={inputId} cols={30} rows={10} className="form-control">
                    {val}
                </textarea>
            ) : (
                <input type={type} id={inputId} className="form-control">
                    {val}
                </input>
            )}
        </div>
    )
}

export default FormField
