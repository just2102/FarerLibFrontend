import { AuthorType, BookType } from "../../Types/Types";

interface Props {
    author: AuthorType
}

const Author = ({author}:Props) => {
    let latestBook = author.books.slice(-1)[0]
    return ( 
        <div className="author">
            <div className="author_name">{author.first_name + " " + author.last_name}</div>
            <div className="author_latestbook">Latest book: '{latestBook.title}' ({latestBook.year})</div>
            
        </div>
     );
}
 
export default Author;