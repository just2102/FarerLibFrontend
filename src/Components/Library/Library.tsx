import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { getAllBooks } from "../../Redux/slices/bookSlice";
import Preloader from "../Common/Preloader";
import Book from "./Book";
import Modal from 'react-modal';
import AddBookModal from "./Modals/AddBookModal";

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
  const dispatch = useAppDispatch();
  const books = useAppSelector((state) => state.books.books);
  const isFetching = useAppSelector((state) => state.books.isFetching);

  const [modalOpen, setModalOpen] = useState(false)
  const openModal = () => setModalOpen(true)
  const closeModal = () => setModalOpen(false)

  useEffect(() => {
    dispatch(getAllBooks());
  }, []);
  const booksMapped = books?.map((book, index) => {
    return <Book key={index} book={book}></Book>;
  });
  return (
    <>
      <div className="library_addbook">
        <button id="add_book_button" onClick={openModal}>Add a book</button>
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
