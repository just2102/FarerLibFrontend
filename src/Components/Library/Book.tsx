import { BookType } from "../../Types/Types";
import deleteIcon from "../../assets/delete_icon.svg"
import Modal from 'react-modal';
import { useEffect, useState } from "react";
import DeleteBookModal from "./Modals/DeleteBookModal";

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
    let author = book.author
    let authorName;
    if (typeof author==='object') {
        authorName = `${author.first_name} ${author.last_name}`
    }
    const [bookEditButtonVisible, setBookEditButtonVisible] = useState(false)
    const [bookDeleteButtonVisible, setBookDeleteButtonVisible] = useState(false)
    const bookHoverHandler = () => {
        setBookEditButtonVisible(!bookEditButtonVisible)
        setBookDeleteButtonVisible(!bookDeleteButtonVisible)
    }

// delete book modal
    const [deleteBookModalOpen, setDeleteBookModalOpen] = useState(false)
    const closeDeleteModal = () => {
        setDeleteBookModalOpen(false)
    }

// edit book modal
    const [editBookModalOpen, setEditBookModalOpen] = useState(false)


    return ( 
        <div className="book" onMouseEnter={bookHoverHandler} onMouseLeave={bookHoverHandler}>
            <div className="book_delete">
                <img id="book_delete_button" onClick={()=>setDeleteBookModalOpen(true)} src={deleteIcon} alt="" className={bookDeleteButtonVisible ? "button_visible" : "button_invisible"} />
                <Modal 
                isOpen={deleteBookModalOpen}
                style={customStyles}
                onRequestClose={()=>setDeleteBookModalOpen(false)}

                ><DeleteBookModal book={book} closeDeleteModal={closeDeleteModal}></DeleteBookModal></Modal>
            </div>

            <div className="book_title">{`Title: ${book.title}`}</div>
            <div className="book_author">{`Written by: ${authorName}`}</div>
            {book.year && <div className="book_year">{`Published: ${book.year}`}</div>}
            
            <div className="book_genre">Genre: {book.genre}</div>

            <div className="book_summary">
                {book.summary && <div className="book_summary_edit"> <span>{book.summary}</span></div>}
            </div>
            
            <div className="book_edit">
                <button id="book_edit_button" onClick={()=>setEditBookModalOpen(true)} className={bookEditButtonVisible ? "button_visible" : "button_invisible"}>Edit</button>
            </div>
        </div>
     );
}
 
export default Book;