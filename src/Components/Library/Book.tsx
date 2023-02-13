import { BookType } from "../../Types/Types";
import deleteIcon from "../../assets/delete_icon.svg"
import Modal from 'react-modal';
import { useEffect, useState } from "react";
import DeleteBookModal from "./Modals/Book/DeleteBookModal";
import EditBookModal from "./Modals/Book/EditBookModal";
import availableIcon from "../../assets/book-green.svg"
import unavailableIcon from "../../assets/book-red.svg"
import borrowIcon from "../../assets/borrow.png"
import { useAppDispatch } from "../../Redux/hooks";
import { toggleBookStatusRequest } from "../../Redux/slices/bookSlice";

interface Props {
    book: BookType
}

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

const Book = ({book}:Props) => {
    const dispatch = useAppDispatch()

    let author = book.author
    let authorName;
    let authorId;
    if (typeof author==='object') {
        authorName = `${author.first_name} ${author.last_name}`
        authorId = author._id
    }
    const [bookEditButtonVisible, setBookEditButtonVisible] = useState(false)
    const [bookActionsVisible, setBookActionsVisible] = useState(false)
    const bookHoverHandler = () => {
        setBookEditButtonVisible(!bookEditButtonVisible)
        setBookActionsVisible(!bookActionsVisible)
    }

// delete book modal
    const [deleteBookModalOpen, setDeleteBookModalOpen] = useState(false)
    const closeDeleteModal = () => {
        setDeleteBookModalOpen(false)
    }

// edit book modal
    const [editBookModalOpen, setEditBookModalOpen] = useState(false)
    const closeEditModal = () => {
        setEditBookModalOpen(false)
    }

// book status change (borrow)
    const onBorrowClick = () => {
        dispatch(toggleBookStatusRequest(book))
    }

    return ( 
        <div className="book" onMouseEnter={bookHoverHandler} onMouseLeave={bookHoverHandler}>
            <div id="book_actions" className={bookActionsVisible ? "actions_visible" : "actions_invisible"} >
            <div className="book_delete">
                <img id="book_delete_button" onClick={()=>setDeleteBookModalOpen(true)} src={deleteIcon} alt="" />
                <Modal 
                isOpen={deleteBookModalOpen}
                style={customStyles}
                onRequestClose={()=>setDeleteBookModalOpen(false)}

                ><DeleteBookModal book={book} authorName={authorName} closeDeleteModal={closeDeleteModal}></DeleteBookModal></Modal>
            </div>
            <div className="book_borrow">
                <img id="book_borrow_button" onClick={onBorrowClick} src={borrowIcon} alt="" />
            </div>
            </div>
            <div className="book_title">{`Title: ${book.title}`}</div>
            <div className="book_author">{`Written by: ${authorName}`}</div>
            {book.year && <div className="book_year">{`Published: ${book.year}`}</div>}
            
            <div className="book_genre">Genre: {book.genre}</div>

            <div className="book_summary">
                {book.summary && <div className="book_summary_edit"> <span>{book.summary}</span></div>}
            </div>

            <div className="book_available">
                {book.available 
                ? <img src={availableIcon} alt="" />
                : <img src={unavailableIcon} alt="" /> }
            </div>
            
            <div className="book_edit">
                <button 
                id="book_edit_button" 
                onClick={()=>setEditBookModalOpen(true)} 
                className={bookActionsVisible ? "actions_visible" : "actions_invisible"}>
                Edit
                </button>
                <Modal 
                isOpen={editBookModalOpen}
                style={customStyles}
                onRequestClose={()=>setEditBookModalOpen(false)}
                ><EditBookModal authorName={authorName} authorId={authorId} book={book} closeEditModal={closeEditModal}></EditBookModal></Modal>
            </div>
        </div>
     );
}
 
export default Book;