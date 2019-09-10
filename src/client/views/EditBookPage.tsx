/** @format */

import * as React from 'react'
import Form from '../components/commons/Form'
import FormField from '../components/commons/FormField'
import { RouteComponentProps } from 'react-router'
import { unauthedJson, BOOKS_API, join, CATEGORIES_API } from '../utils/apis'
import useLogin from '../utils/useLogin'

interface IEditBookProps extends RouteComponentProps<{ id: string }> {}

const EditBook: React.FC<IEditBookProps> = ({ history, match: { params } }) => {
    const isNewBook = history.location.pathname === '/books/new'

    const [author, setAuthor] = React.useState('')
    const [title, setTitle] = React.useState('')
    const [categoryid, setCategoryId] = React.useState(-1)
    const [price, setPrice] = React.useState('0.0')

    const [categories, setCategories] = React.useState<ICategory[]>([])
    const { json } = useLogin()

    React.useEffect(() => {
        ;(async () => {
            let categories = await unauthedJson<ICategory[]>(CATEGORIES_API)
            setCategories(categories)
            if (!isNewBook) {
                let book = await unauthedJson<IBook>(join(BOOKS_API, `${params.id}`))
                setAuthor(book.author)
                setTitle(book.title)
                setPrice(`${book.price}`)
                setCategoryId(categories[0].id)
            }
        })()
    }, [])

    const onSubmit = () => {
        if (isNewBook) {
            json(BOOKS_API, 'POST', {
                author,
                title,
                categoryid,
                price: parseFloat(price),
            })
        } else {
            json(join(BOOKS_API, `${params.id}`), 'PUT', {
                author,
                title,
                categoryid,
                price: parseFloat(price),
            })
        }
    }

    const handleCategory: React.ChangeEventHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCategoryId(parseInt(e.target.value))
    }

    return (
        <Form
            submit={onSubmit}
            submitText={isNewBook ? 'Post' : 'Edit'}
            className="card border rounded-lg p-4 shadow mt-5"
        >
            <FormField state={[author, setAuthor]} name="Author" />
            <FormField state={[title, setTitle]} name="Title" />
            <div className="form-group">
                <label htmlFor="Category">Category</label>
                <select
                    name="Categories"
                    id="Category"
                    className="form-control"
                    onChange={handleCategory}
                    value={categoryid}
                >
                    {categories.map((c) => (
                        <option key={c.id} value={c.id}>
                            {c.name}
                        </option>
                    ))}
                </select>
            </div>
            <FormField state={[price, setPrice]} name="Price" />
        </Form>
    )
}

export default EditBook
