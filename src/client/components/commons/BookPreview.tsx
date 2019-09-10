/** @format */

import * as React from 'react'
import { unauthedJson, BOOKS_API, join, CATEGORIES_API } from '../../utils/apis'
import { Link, RouteComponentProps, withRouter } from 'react-router-dom'
import useLogin from '../../utils/useLogin'

interface IBookPreviewProps extends RouteComponentProps {
    book: IBook
}

const BookPreview: React.FC<IBookPreviewProps> = ({ book, history }) => {
    let { id, title, categoryid, author, price, _created } = book
    const [category, setCategory] = React.useState('None')

    const { isLoggedIn, json } = useLogin()

    if (!isLoggedIn) {
        history.push('/')
        return <></>
    }

    React.useEffect(() => {
        ;(async () => {
            setCategory((await unauthedJson<ICategory>(join(CATEGORIES_API, `${categoryid}`))).name)
        })()
    }, [categoryid])

    const handleDelete: React.MouseEventHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (confirm('Are you sure?')) {
            json(join(BOOKS_API, `${id}`), 'DELETE')
            history.push('/')
        }
    }

    return (
        <div className="col-6">
            <article className="card m-3 p-3">
                <h3 className="card-title">
                    {title} written by {author}
                </h3>
                <p className="card-text">Price: ${price}</p>
                <p className="card-text">{category}</p>
                {isLoggedIn && history.location.pathname !== '/books' ? (
                    <div className="d-flex justify-content-center">
                        <Link to={`/books/${id}/update`} className="btn btn-primary mr-3">
                            Edit
                        </Link>
                        <button onClick={handleDelete} className="btn btn-danger">
                            Delete
                        </button>
                    </div>
                ) : (
                    <Link to={`/books/${id}`}>View just me!</Link>
                )}
            </article>
        </div>
    )
}

export default withRouter(BookPreview)
