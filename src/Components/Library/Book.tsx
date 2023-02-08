import { BookType } from "../../Types/Types";

interface Props {
    book: BookType
}

const Book = ({book}:Props) => {
    let author = book.author
    let authorName;
    if (typeof author==='object') {
        authorName = `${author.first_name} ${author.last_name}`
    }

    return ( 
        <div className="book">
            <div className="book_title">{`Title: ${book.title}`}</div>
            <div className="book_author">{`Written by: ${authorName}`}</div>
            {book.year && <div className="book_year">{`Published: ${book.year}`}</div>}
            
            <div className="book_genre">Genre: {book.genre}</div>

            <div className="book_summary">
                {book.summary 
                ? <div className="book_summary_edit"> <span>{book.summary}</span> <button>Edit summary</button> </div>
                : <button>Add summary</button> }
            </div>
        </div>
     );
}
 
export default Book;