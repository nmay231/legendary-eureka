/** @format */

import * as React from 'react'
import BookPreview from '../components/commons/BookPreview'
import { unauthedJson, BOOKS_API, join } from '../utils/apis'
import { RouteComponentProps } from 'react-router'

interface IAllBooksPageProps extends RouteComponentProps<{ id: string }> {}

const AllBooksPage: React.FC<IAllBooksPageProps> = ({ history, match: { params } }) => {
    const [books, setBooks] = React.useState<IBook[]>([])

    React.useEffect(() => {
        let showAll = history.location.pathname === '/books'
        if (showAll) {
            ;(async () => {
                setBooks(await unauthedJson<IBook[]>(BOOKS_API))
            })()
        } else {
            ;(async () => {
                setBooks([await unauthedJson<IBook>(join(BOOKS_API, `${params.id}`))])
            })()
        }
    }, [history.location.pathname])

    return (
        <>
            <h1 className="text-center my-3"> An amazing display of all books </h1>
            <section className="row d-flex justify-content-center">
                {books.map((book) => (
                    <BookPreview key={book.id} book={book} />
                ))}
            </section>
        </>
    )
}

export default AllBooksPage
