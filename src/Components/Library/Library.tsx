import { useEffect, useState } from "react";
import { Book, booksAPI } from "../../API/api";


const Library = () => {
    const [books, setBooks] = useState<Book[] | null>([])

    useEffect(()=>{
        booksAPI.getAllBooks()
    },[])

    return ( 
        <div className="library">
            
        </div>
     );
}
 
export default Library;