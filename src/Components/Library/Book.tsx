import { BookType } from "../../Types/Types";

interface Props {
    book: BookType
}

const Book = ({book}:Props) => {
    return ( 
        <div className="book">
            <div className="book_title">{`Title: ${book.title}`}</div>
            <div className="book_author">{`Written by: ${book.author}`}</div>
            {book.year && <div className="book_year">{`Published: ${book.year}`}</div>}
            
            <div className="book_summary">
                {book.summary 
                ? <span>{book.summary}</span> 
                : <button>Add summary</button> }
            </div>
        </div>
     );
}
 
export default Book;