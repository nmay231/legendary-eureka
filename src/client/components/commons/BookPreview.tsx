/** @format */

import * as React from 'react'
import { unauthedJson, BOOKS_API, join, CATEGORIES_API } from '../../utils/apis'
import { Link } from 'react-router-dom'

interface IBookPreviewProps {
    book: IBook
}

const BookPreview: React.FC<IBookPreviewProps> = ({ book }) => {
    let { id, title, categoryid, author, price, _created } = book
    const [category, setCategory] = React.useState('None')

    React.useEffect(() => {
        ;(async () => {
            setCategory((await unauthedJson<ICategory>(join(CATEGORIES_API, `${categoryid}`))).name)
        })()
    }, [categoryid])

    return (
        <div className="col-6">
            <article className="card m-3 p-3">
                <h3 className="card-title">
                    {title} written by {author}
                </h3>
                <p className="card-text">Price: ${price}</p>
                <p className="card-text">{category}</p>
                <Link to={`/books/${id}`}>View just me!</Link>
            </article>
        </div>
    )
}

export default BookPreview
