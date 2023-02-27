import { AuthorType, BookType } from "../../Types/Types";

interface Props {
    author: AuthorType
}

const Author = ({author}:Props) => {
    let latestBook = author.books.slice(-1)[0]

    let yearOfBirth;
    if (author.date_of_birth) {
        yearOfBirth = new Date(author.date_of_birth).getFullYear()
    }
    let yearOfDeath;
    if (author.date_of_death) {
        yearOfDeath = new Date(author.date_of_death).getFullYear();
    }
    return ( 
        <div className="author">
            <div className="author_name">{author.first_name + " " + author.last_name + " "}
            <span className="author_years">
                <> 
                {(yearOfBirth && !yearOfDeath) && `(b. ${yearOfBirth})`}
                {(yearOfBirth && yearOfDeath) && `(${yearOfBirth}-${yearOfDeath})`}
                {(!yearOfBirth && yearOfDeath) && `(d. ${yearOfDeath})` }
                </>
            </span>
            </div>
            {author.books.length>0 && 
            <div className="author_latestbook">
                Latest book: '{latestBook.title}' {latestBook.year && `(${latestBook.year})`}
            </div>}

            <div className="author_numberofbooks">
                Books: {author.books.length}
            </div>
            
        </div>
     );
}
 
export default Author;