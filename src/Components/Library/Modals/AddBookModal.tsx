import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Modal from 'react-modal';
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import { postBookRequest } from "../../../Redux/slices/bookSlice";
import { AuthorType, BookType } from "../../../Types/Types";
import ChooseAuthorModal from "./ChooseAuthorModal";
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
type Inputs = {
  title: string;
  // author: string;
  genre: string;

  year?: number;
  summary?: string;
};

interface Props {
  closeModal: () => void
}

const AddBookModal = ({closeModal}:Props) => {
  const finalSelectedAuthor = useAppSelector(state=>state.authors.finalSelectedAuthor)
  const dispatch = useAppDispatch()

  // react-hook-form controls
  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async(data) => {
    // should send finalSelectedAuthor.id instead of selected author name (API demands an ID)
    const authorId = finalSelectedAuthor?._id
    // should send selectedGenre (local useState variable)
    const genre = selectedGenre
    // create an object from collected data (and verify)
    let newBook:BookType;
    if (authorId && genre) {
      newBook = {
        title:data.title,
        author: authorId,
        genre: genre,
      }
      if (data.summary) {
        newBook.summary = data.summary
      }
      if (data.year) {
        newBook.year = data.year
      }
      const response = await dispatch(postBookRequest(newBook))
      // if server responds OK, close modal and rerender library
      if (response.payload===true) {
        closeModal()
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
  const mappedGenreOptions = genreOptions.map((genre)=>{
    return <div key={genre} id="newGenre" onClick={()=>{selectGenreHandler(genre)}}>{genre}</div>
})
const [genreOptionsVisible, setGenreOptionsVisible] = useState(false)

const [selectedGenre, setSelectedGenre] = useState("")
// select genre handler
  const selectGenreHandler = (genre:string) => {
    setSelectedGenre(genre)
    setGenreOptionsVisible(false)
    console.log('selected genre:' + selectedGenre)
  }

//   choose author modal
  const [authorModalOpen, setAuthorModalOpen] = useState<boolean>(false)

//   rerender if user set author or genre
    useEffect(()=>{
    },[finalSelectedAuthor, selectedGenre])
  return (
    <div>
      <form className="add_book_modal" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="newTitleInput">Title*</label>
        <input id="newTitleInput" type="text" placeholder="Harry Potter..."  {...register('title')} />

        <label htmlFor="newGenreInput">Genre*</label>
        <input 
        {...register("genre")}
        value={selectedGenre}
        id="newGenreInput" 
        type="text" 
        placeholder="Fantasy..." 
        onFocus={()=>setGenreOptionsVisible(true)}/>
        {genreOptionsVisible && 
        <div id="genres">
            {mappedGenreOptions}
        </div>}
        <div id="new_author">
            <label htmlFor="newAuthorInput">Author*</label>
            <input 
            id="newAuthorInput" 
            type="text" 
            placeholder="J. K. Rowling..." 
            // there's no point in registering this field
            // since it's only used to display the finalSelectedAuthor's name, 
            // and the API requests and ID
            // {...register('author')} 
            value={finalSelectedAuthor ? `${finalSelectedAuthor.first_name} ${finalSelectedAuthor.last_name}` : '' }/>
            <button id="choose_author_button" onClick={(e)=>{ e.preventDefault(); setAuthorModalOpen(true)}}>Choose</button>
            <Modal 
            style={customStyles}
            isOpen={authorModalOpen}
            onRequestClose={()=>setAuthorModalOpen(false)}>
                <ChooseAuthorModal
                setAuthorModalOpen={setAuthorModalOpen}
                finalSelectedAuthor={finalSelectedAuthor}></ChooseAuthorModal>
            </Modal>
        </div>
        
        <div id="new_summary">
          <label htmlFor="newSummaryInput">Summary</label>
          <textarea {...register("summary")} id="newSummaryInput"></textarea>
        </div>

        <div id="new_year">
          <label htmlFor="newYearInput">Release year</label>
          <input  {...register('year')} id="newYearInput" type="number" placeholder="1994..." />
        </div>
        <button id="add_book_button">Add</button>
      </form>
    </div>
  );
};

export default AddBookModal;
