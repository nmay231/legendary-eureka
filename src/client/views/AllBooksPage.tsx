/** @format */

import * as React from 'react'
import BookPreview from '../components/commons/BookPreview'
import { unauthedJson, BOOKS_API } from '../utils/apis'

interface IAllBooksPageProps {}

const AllBooksPage: React.FC<IAllBooksPageProps> = () => {
    const [books, setBooks] = React.useState<IBook[]>([])

    React.useEffect(() => {
        ;(async () => {
            setBooks(await unauthedJson<IBook[]>(BOOKS_API))
        })()
    }, [])

    return (
        <>
            <h1 className="text-center my-3"> An amazing display of all books </h1>
            <section className="row">
                {books.map((book) => (
                    <BookPreview key={book.id} book={book} />
                ))}
            </section>
        </>
    )
}

export default AllBooksPage
