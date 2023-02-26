import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { getUserBooks } from "../../Redux/slices/bookSlice";
import Book from "../Library/Book";

const MyBooks = () => {
    const dispatch = useAppDispatch()

    const isAuthorized = useAppSelector(state=>state.auth.isAuthorized)
    const currentUser = useAppSelector(state=>state.auth.currentUser)
    const currentUserBooks = useAppSelector(state=>state.books.currentUserBooks)
    const myBooksMapped = currentUserBooks.map(book=>{
        return <Book book={book} key={book._id} isFavorite={true} />
    })

    useEffect(()=>{
        if (currentUser) {
            dispatch(getUserBooks(currentUser.id))
        }
    },[currentUser, isAuthorized])
    
    return ( 
        <>
        {!isAuthorized && <Navigate to={"/login"}></Navigate>}
        {isAuthorized &&
        <div className="mybooks">
            {currentUserBooks.length===0 && <h2>You haven't saved any books yet!</h2> }
            <div className="mybooks_content">
                {myBooksMapped}
            </div>
        </div>
        }
        </>);
}
 
export default MyBooks;