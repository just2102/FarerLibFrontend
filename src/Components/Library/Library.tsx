import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { getAllBooks, getUserBooks } from "../../Redux/slices/bookSlice";
import Preloader from "../Common/Preloader";
import Book from "./Book";
import { Route, Routes } from "react-router-dom";
import LibrarySidebar from "./LibrarySidebar";
import PopularBooks from "./Routes/PopularBooks";
import AllBooks from "./Routes/AllBooks";
import NewBooks from "./Routes/NewBooks";
import AvailableBooks from "./Routes/AvailableBooks";


const Library = () => {
  const dispatch = useAppDispatch();
  const books = useAppSelector((state) => state.books.books);
  const currentUserBooks = useAppSelector(state=>state.books.currentUserBooks)
  const isFetching = useAppSelector((state) => state.books.isFetching);
  const isAuthorized = useAppSelector(state=>state.auth.isAuthorized)
  const currentUser = useAppSelector(state=>state.auth.currentUser)

  useEffect(() => {
    if (books.length===0) {
      dispatch(getAllBooks());
    }
    if (currentUserBooks.length===0 && isAuthorized) {
      dispatch(getUserBooks(currentUser?.id))
    }
  }, [books.length, isAuthorized, currentUser]);
  const isBookFavorite = (bookId:string) => {
    for (let i = 0; i<currentUserBooks.length; i++) {
      if (currentUserBooks[i]._id===bookId) {
        return true
      }
    }
    return false
  }
// map all books (will require pagination)
  const allBooksMapped = books?.map((book, index) => {
    return <Book key={index} book={book} isFavorite={isBookFavorite(book._id)}></Book>;
  });
// filter books by popularity (more than 1 user bookmarked => popular)
  const popularBooks = books?.filter(book=>{
    return book.users.length>1
  })
  const popularBooksMapped = popularBooks.map((book,index) => {
      return <Book key={index} book={book} isFavorite={isBookFavorite(book._id)}></Book>
  })
// filter books by date (show books added this week)
  const currentDate = new Date();
  const thisMonthBooks = books?.filter(book=>{
    const createdAt = new Date(book?.createdAt);
    return createdAt.getFullYear() === currentDate.getFullYear() && createdAt.getMonth() === currentDate.getMonth();
  })
  const thisMonthMapped = thisMonthBooks.map((book,index)=>{
    return <Book key={index} book={book} isFavorite={isBookFavorite(book._id)}></Book>
  })
// filter books by availability (only show available ones)
  const availableBooks = books?.filter(book=>{
    return book.available
  })
  const availableBooksMapped = availableBooks.map((book,index)=>{
    return <Book key={index} book={book} isFavorite={isBookFavorite(book._id)}></Book>
  })
  return (
    <>
      <div className="library">
      {isFetching && <Preloader loadingText="Loading library..." />}
        <div className="library_content">
          <LibrarySidebar></LibrarySidebar>
          <Routes>
            <Route path="/" element={<AllBooks allBooksMapped={allBooksMapped}/>}></Route>
            <Route path='popular' element={<PopularBooks popularBooks={popularBooksMapped}/>}></Route>
            <Route path="new" element={<NewBooks newBooks={thisMonthMapped}/>}></Route>
            <Route path="available" element={<AvailableBooks availableBooks={availableBooksMapped}/>}></Route>
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Library;
