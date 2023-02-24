import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { getAllBooks, getUserBooks } from "../../Redux/slices/bookSlice";
import Preloader from "../Common/Preloader";
import Book from "./Book";
import Modal from 'react-modal';
import AddBookModal from "./Modals/Book/AddBookModal";
import { useNavigate } from "react-router-dom";

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const Library = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch();
  const books = useAppSelector((state) => state.books.books);
  const currentUserBooks = useAppSelector(state=>state.books.currentUserBooks)
  const isFetching = useAppSelector((state) => state.books.isFetching);
  const isAuthorized = useAppSelector(state=>state.auth.isAuthorized)
  const currentUser = useAppSelector(state=>state.auth.currentUser)

  const [modalOpen, setModalOpen] = useState(false)
  const openModal = () => setModalOpen(true)
  const closeModal = () => setModalOpen(false)

  useEffect(() => {
    if (books.length===0) {
      dispatch(getAllBooks());
    }
    if (currentUserBooks.length===0 && isAuthorized) {
      dispatch(getUserBooks(currentUser?.id))
    }
  }, [books.length]);
  const isBookFavorite = (bookId:string) => {
    for (let i = 0; i<currentUserBooks.length; i++) {
      if (currentUserBooks[i]._id===bookId) {
        return true
      }
    }
    return false
  }
  const booksMapped = books?.map((book, index) => {
    return <Book key={index} book={book} isFavorite={isBookFavorite(book._id)}></Book>;
  });
  return (
    <>
      <div className="library_addbook">
        {isAuthorized && <button id="add_book_button" onClick={openModal}>Add a book</button>}
        {!isAuthorized &&  <button id="add_book_button" onClick={()=>navigate("/login")}>Login to add new books!</button>}
        <Modal
        style={customStyles}
        isOpen={modalOpen}
        onRequestClose={closeModal}
        contentLabel={'New book'}
        ><AddBookModal closeModal={closeModal}></AddBookModal></Modal>
      </div>
      <div className="library">
        {isFetching && <Preloader loadingText="Loading library..." />}
        {booksMapped}
      </div>
    </>
  );
};

export default Library;
