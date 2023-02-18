import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../../Redux/hooks";
import { updateBookRequest } from "../../../../Redux/slices/bookSlice";
import { BookType } from "../../../../Types/Types";
import ChooseAuthorModal from "../Author/ChooseAuthorModal";
import Modal from "react-modal";
import { getAuthorById } from "../../../../Redux/slices/authorSlice";
import Preloader from "../../../Common/Preloader";

const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

interface Props {
    book: BookType
    authorId: string | undefined
    authorName: string | undefined
    closeEditModal: () => void
}

type Inputs = {
    title: string;
    author: string;
    genre: string;
    available: boolean;
  
    year?: number;
    summary?: string;
  };


const EditBookModal = ({book, authorId, authorName, closeEditModal}:Props) => {
    const isFetching = useAppSelector((state)=>state.authors.isFetching)
    const finalSelectedAuthor = useAppSelector(
        (state) => state.authors.finalSelectedAuthor
      );
      const dispatch = useAppDispatch();
    
      // react-hook-form controls
      const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
      const onSubmit: SubmitHandler<Inputs> = async (data) => {
        // should send finalSelectedAuthor.id instead of selected author name (API demands an ID)
        const authorId = finalSelectedAuthor?._id;
        // should send selectedGenre (local useState variable)
        const genre = selectedGenre;
        // create an object from collected data (and verify)
        let updatedBook: BookType;
        if (authorId && genre) {
          updatedBook = {
            _id: book._id,
            title: data.title.trim(),
            author: authorId.trim(),
            genre: genre.trim(),
            available: data.available
          };
          if (data.summary) {
            updatedBook.summary = data.summary.trim();
          }
          if (data.year) {
            updatedBook.year = Number(data.year.toString().trim());
          }
          const response = await dispatch(updateBookRequest(updatedBook));
          // if server responds OK, close modal and rerender library
          if (response.payload === true) {
            closeEditModal();
          }
        }
      };
      // all genre options hardcoded
      const [genreOptions, setGenreOptions] = useState([
        "Action and Adventure",
        "Biography",
        "Children's",
        "Comedy",
        "Crime",
        "Drama",
        "Dystopia",
        "Fantasy",
        "Fiction",
        "Historical Fiction",
        "Horror",
        "Mystery",
        "Non-Fiction",
        "Poetry",
        "Romance",
        "Science Fiction",
        "Self-Help",
        "Textbook",
        "Thriller",
        "Young Adult",
        "Classics",
      ]);
      const mappedGenreOptions = genreOptions.map((genre) => {
        return (
          <div
            key={genre}
            id="newGenre"
            onClick={() => {
              selectGenreHandler(genre);
            }}
          >
            {genre}
          </div>
        );
      });
      const [genreOptionsVisible, setGenreOptionsVisible] = useState(false);
    
      const [selectedGenre, setSelectedGenre] = useState(book.genre ? book.genre : "");
      // select genre handler
      const selectGenreHandler = (genre: string) => {
        setSelectedGenre(genre);
        setGenreOptionsVisible(false);
      };
    
      //   choose author modal
      const [authorModalOpen, setAuthorModalOpen] = useState<boolean>(false);
    
    useEffect(()=>{
        // fetch the book's author so that the user doesn't have to manually search for him again
        if (authorId) {
            dispatch(getAuthorById(authorId))
        }
    },[])

    return (
        <>
    {isFetching && <Preloader/>}
    {!isFetching && <div className="edit_book_modal">
        <form className="add_book_modal" onSubmit={handleSubmit(onSubmit)}>
        <h3>Update book info</h3>
        <label htmlFor="newTitleInput">Title*</label>
        <input
          defaultValue={book.title}
          id="newTitleInput"
          type="text"
          placeholder="Harry Potter..."
          {...register("title", {required:true, maxLength:50})}
        />
        {errors.title && <span>Books have titles!</span> }

        <label htmlFor="newGenreInput">Genre*</label>
        <input
          required
          {...register("genre")}
          value={selectedGenre ? selectedGenre : book.genre}
          readOnly
          id="newGenreInput"
          type="text"
          placeholder={'Fantasy...'}
          onFocus={() => setGenreOptionsVisible(true)}
        />
        {genreOptionsVisible && <div id="genres">{mappedGenreOptions}</div>}
        <div id="new_author">
          <label htmlFor="newAuthorInput">Author*</label>
          <input
            required
            id="newAuthorInput"
            type="text"
            // there's no point in registering this field
            // since it's only used to display the finalSelectedAuthor's name,
            // and the API requests and ID which is taken from the redux store
            // {...register('author')}
            value={
              finalSelectedAuthor
                ? `${finalSelectedAuthor.first_name} ${finalSelectedAuthor.last_name}`
                : ""
            }
          />
          <button
            id="choose_author_button"
            onClick={(e) => {
              e.preventDefault();
              setAuthorModalOpen(true);
            }}
          >
            Choose
          </button>
          <Modal
            style={customStyles}
            isOpen={authorModalOpen}
            onRequestClose={() => setAuthorModalOpen(false)}
          >
            <ChooseAuthorModal
              setAuthorModalOpen={setAuthorModalOpen}
              finalSelectedAuthor={finalSelectedAuthor}
            ></ChooseAuthorModal>
          </Modal>
        </div>

        <div id="new_summary">
          <label htmlFor="newSummaryInput">Summary</label>
          <textarea 
          {...register("summary")} 
          id="newSummaryInput"
          defaultValue={book.summary}
          placeholder={"This book is about..."}
          >
          </textarea>
        </div>

        <div id="new_year">
          <label htmlFor="newYearInput">Release year</label>
          <input
            {...register("year")}
            defaultValue={book.year}
            id="newYearInput"
            type="number"
            placeholder="1994..."
          />
        </div>

        <div id="new_available">
          <label htmlFor="newAvailable">Available?</label>
          <input 
          {...register("available")} 
          id="newAvailable" 
          type="checkbox"
          defaultChecked={book.available} />
        </div>

        <button id="add_book_button">Update</button>
      </form>
        
    </div>} 
    </>);
}
 
export default EditBookModal;