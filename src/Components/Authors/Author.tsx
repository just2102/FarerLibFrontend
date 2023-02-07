import { AuthorType } from "../../Types/Types";

interface Props {
    author: AuthorType
}

const Author = ({author}:Props) => {

    return ( 
        <div className="author">
            <div className="author_name">{author.first_name + " " + author.last_name}</div>
            
        </div>
     );
}
 
export default Author;