import { BookType } from "../../Types/Types";
import Modal from 'react-modal';
import { useEffect, useState } from "react";
import DeleteBookModal from "./Modals/Book/DeleteBookModal";
import EditBookModal from "./Modals/Book/EditBookModal";
// assets
import deleteIcon from "../../assets/delete_icon.svg"
import availableIcon from "../../assets/book-green.svg"
import unavailableIcon from "../../assets/book-red.svg"
import borrowIcon from "../../assets/borrow.png"
import bookmarkIcon from "../../assets/bookmark.png"
import unbookmarkIcon from "../../assets/unbookmark.png"
// 
// redux
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { bookmarkRequest, toggleBookStatusRequest, unbookmarkRequest } from "../../Redux/slices/bookSlice";
// 

interface Props {
    book: BookType

    isFavorite?: boolean
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
const defaultCover = "https://res.cloudinary.com/do6ggmadv/image/upload/v1676779721/defaultcover_ylne0q.png"

const Book = ({book, isFavorite}:Props) => {
    const isAuthorized = useAppSelector(state=>state.auth.isAuthorized)
    const currentUser = useAppSelector(state=>state.auth.currentUser)

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
    const [deleteBookModalOpen, setDeleteBookModalOpen] = useState<boolean>(false)
    const closeDeleteModal = () => {
        setDeleteBookModalOpen(false)
    }
// edit book modal
    const [editBookModalOpen, setEditBookModalOpen] = useState<boolean>(false)
    const closeEditModal = () => {
        setEditBookModalOpen(false)
    }
// book status change (borrow)
    const onBorrowClick = () => {
        dispatch(toggleBookStatusRequest(book))
    }
// display book summary (if it exists)
    const [displaySummary, setDisplaySummary] = useState<boolean>(false)
    const onDisplaySummaryClick = () => {
        setDisplaySummary(!displaySummary)
    }
// save (bookmark) a book
    const onBookmarkClick = () => {
        if (!isFavorite) {
            dispatch(bookmarkRequest({userId: currentUser?.id, bookId: book._id}))
        }
        if (isFavorite) {
            dispatch(unbookmarkRequest({userId: currentUser?.id, bookId: book._id}))
        }
    }
    return ( 
        <div className="book" onMouseEnter={bookHoverHandler} onMouseLeave={bookHoverHandler}
        style={
            {backgroundImage: `url(${book.cover ? book.cover.url : defaultCover})`,
            backgroundRepeat: 'no-repeat',
            width:'fit-content',
            height:'100%',
            }}>
            {isAuthorized &&  
            <div id="book_actions" className={bookActionsVisible ? "actions_visible" : "actions_invisible"} >
                {!isFavorite && <div className="book_delete">
                    <img id="book_delete_button" onClick={()=>setDeleteBookModalOpen(true)} src={deleteIcon} alt="delete" />
                    <Modal 
                    isOpen={deleteBookModalOpen}
                    style={customStyles}
                    onRequestClose={()=>setDeleteBookModalOpen(false)}
                    ><DeleteBookModal book={book} authorName={authorName} closeDeleteModal={closeDeleteModal}></DeleteBookModal></Modal>
                </div>}
                <div className="book_borrow">
                    <img id="book_borrow_button" onClick={onBorrowClick} src={borrowIcon} alt="borrow" />
                </div>
                <div className="book_bookmark">
                    <img id="book_bookmark_button" onClick={onBookmarkClick} src={isFavorite ? unbookmarkIcon : bookmarkIcon} alt="bookmark" />
                </div>
            </div>
            }
            <div className="book_title">{`${book.title}`}</div>
            <div className="book_author">{`${authorName}`}</div>
            {book.year && <div className="book_year">{`Published: ${book.year}`}</div>}
            
            <div className="book_genre">Genre: {book.genre}</div>

            {book.summary && <button id="book_summary_display_button" className={displaySummary ? 'button_active' : ''} onClick={onDisplaySummaryClick} type="button">Summary</button> }
            {displaySummary &&
            <div className="book_summary">
                {book.summary && <div className="book_summary_edit"> <span>{book.summary}</span></div>}
            </div>
            }
            <div className="book_available">
                {book.available 
                ? <img src={availableIcon} alt="" />
                : <img src={unavailableIcon} alt="" /> }
            </div>
            
            {isAuthorized &&
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
            }
        </div>
     );
}
 
export default Book;