import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { getAllBooks } from "../../Redux/slices/bookSlice";
import Preloader from "../Common/Preloader";
import Book from "./Book";


const Library = () => {
  const dispatch = useAppDispatch();
  const books = useAppSelector((state) => state.books.books);
  const isFetching = useAppSelector((state) => state.books.isFetching);

  useEffect(() => {
    dispatch(getAllBooks());
  }, []);
  const booksMapped = books?.map((book,index) => {
    return <Book key={index} book={book}></Book>;
  });

  return <div className="library">
    {isFetching && <Preloader loadingText="Loading library..."/>}
    {booksMapped}
  </div>;
};

export default Library;
