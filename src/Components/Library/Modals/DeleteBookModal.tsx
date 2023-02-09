import { useAppDispatch } from "../../../Redux/hooks";
import { deleteBookRequest } from "../../../Redux/slices/bookSlice";
import { BookType } from "../../../Types/Types";

interface Props {
    book: BookType
    closeDeleteModal: () => void
}


const DeleteBookModal = ({book, closeDeleteModal}:Props) => {
    const dispatch = useAppDispatch()
    const onDeleteButtonClick = async() => {
        if (book._id) {
            const response = await dispatch(deleteBookRequest(book._id))
            // close modal if book was successfully deleted
            if (response.payload===true) {
                closeDeleteModal()
            }
        }
    }

    return ( 
        <div className="delete_book_modal">
            <div>{`Are you sure you wish to delete ${book.title} by ${book.author}?`}</div>
            <button onClick={onDeleteButtonClick}>Yes</button>
            <button onClick={closeDeleteModal}>No</button>
        </div>
     );
}
 
export default DeleteBookModal;