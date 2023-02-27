import { ChangeEvent, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Modal from "react-modal";
import { useAppDispatch, useAppSelector } from "../../../../Redux/hooks";
import { generateCoverRequest, postBookRequest } from "../../../../Redux/slices/bookSlice";
import { AuthorType, BookType, NewBookType } from "../../../../Types/Types";
import Preloader from "../../../Common/Preloader";
import ChooseAuthorModal from "../Author/ChooseAuthorModal";
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
type Inputs = {
  title: string;
  author: string;
  genre: string;
  available: boolean

  year?: number;
  summary?: string;
  cover?: any
  generateRadioGroup?: string
};

interface Props {
  closeModal: () => void;
}

const AddBookModal = ({ closeModal }: Props) => {
  const finalSelectedAuthor = useAppSelector(
    (state) => state.authors.finalSelectedAuthor
  );
  const isGeneratingCover = useAppSelector(state=>state.books.isGeneratingCover)
  const isAddingBook = useAppSelector(state=>state.books.isAddingBook)
  const dispatch = useAppDispatch();
  // react-hook-form controls
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
  const [generatedCover, setGeneratedCover] = useState<null|string>(null)
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    // should send finalSelectedAuthor.id instead of selected author name (API demands an ID)
    const authorId = finalSelectedAuthor?._id;
    // should send selectedGenre (local useState variable)
    const genre = selectedGenre;
    // create an object from collected data (and verify)
    let newBook: NewBookType;
    if (authorId && genre) {
      newBook = {
        title: data.title.trim(),
        author: authorId.trim(),
        genre: genre.trim(),
        available: data.available,
      };
      if (data.summary) {
        newBook.summary = data.summary.trim();
      }
      if (data.year) {
        newBook.year = Number(data.year.toString().trim());
      }
      // if user uploaded a cover, save it as base64
      if (coverOption==="upload" && data.cover) {
        const reader = new FileReader();
        reader.readAsDataURL(data.cover[0]);
        newBook.cover = await new Promise((resolve)=>{
          reader.onload = () => {
            resolve(reader.result as string)
          }
        })
      }
      // if user chose to generate a cover, save it to the newBook object
      if (coverOption==="generate" && generatedCover) {
        newBook.cover =  generatedCover
      }
      const response = await dispatch(postBookRequest(newBook));
      // if server responds OK, close modal and rerender library
      if (response.payload === true) {
        closeModal();
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

  const [selectedGenre, setSelectedGenre] = useState("");
  // select genre handler
  const selectGenreHandler = (genre: string) => {
    setSelectedGenre(genre);
    setGenreOptionsVisible(false);
  };

  //   choose author modal
  const [authorModalOpen, setAuthorModalOpen] = useState<boolean>(false);

  // book cover options
  // 'default', 'generate', 'upload'
  const [coverOption, setCoverOption] = useState<'default'|'generate'|'upload'>('default')
  // generate book cover and display it
  const formData = watch()
  const generateCover = async() => {
    if (formData.summary) {
      const responseCover:any = await dispatch(generateCoverRequest(formData.summary))
      setGeneratedCover(`data:image/jpeg;base64,${responseCover.payload.data.photo}`)
    }
  }
  //   rerender if user set author or genre
  useEffect(() => {}, [finalSelectedAuthor, selectedGenre]);
  return ( 
    <div>
      <form className="add_book_modal" onSubmit={handleSubmit(onSubmit)}>
        <h2>Add a new book</h2>
        <label htmlFor="newTitleInput">Title*</label>
        <input
          required
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
          value={selectedGenre}
          id="newGenreInput"
          type="text"
          placeholder="Fantasy..."
          onFocus={() => setGenreOptionsVisible(true)}
        />
        {genreOptionsVisible && <div id="genres">{mappedGenreOptions}</div>}
        <div id="new_author">
          <label htmlFor="newAuthorInput">Author*</label>
          <input
            required
            id="newAuthorInput"
            type="text"
            placeholder="J. K. Rowling..."
            // there's no point in registering this field
            // since it's only used to display the finalSelectedAuthor's name,
            // and the API requests an ID which we get from the redux store
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
          <textarea disabled={isGeneratingCover} {...register("summary", {required:coverOption==='generate'})} id="newSummaryInput" placeholder={"This book is about..."}></textarea>
          {(errors.summary && coverOption==='generate' ) && <span>Please provide a meaningful summary if you wish to generate a book cover</span> }
        </div>

        <div id="new_year">
          <label htmlFor="newYearInput">Release year</label>
          <input
            {...register("year")}
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
          defaultChecked />
        </div>

        <fieldset id="new_cover">
            <legend>Book cover options</legend>
          <input 
          {...register("generateRadioGroup")} 
          disabled={!formData.summary}
          onClick={()=>{setCoverOption('generate'); generateCover()}}
          type="radio" 
          id="cover_generate" 
          name="cover_option"
          checked={coverOption==='generate'}
          />
          <label htmlFor="cover_generate">Generate (summary required)</label>

          <input 
          {...register("generateRadioGroup")} 
          onClick={()=>setCoverOption('default')}
          disabled={isGeneratingCover}
          type="radio" 
          id="cover_default" 
          name="cover_option"
          checked={coverOption==='default'}
          />
          <label htmlFor="cover_default">Default Cover</label>

          <input 
          {...register("generateRadioGroup")} 
          onClick={()=>setCoverOption('upload')}
          disabled={isGeneratingCover}
          type="radio" 
          id="cover_upload" 
          name="cover_option"
          checked={coverOption==='upload'} 
          />
          <label htmlFor="cover_upload">Upload</label>
          
          {coverOption==='upload' && <>
          <input type="file" {...register("cover", {required:coverOption==='upload'})} />
          </>}
          {isGeneratingCover && <Preloader loadingText="Generating cover... This might take a while..."></Preloader> }
          {isAddingBook && <Preloader loadingText="Adding book..." /> }
          {generatedCover && <img id="generated_cover_preview" src={generatedCover} alt="" /> }
        </fieldset>
        <button disabled={isGeneratingCover || isAddingBook} id="add_book_button" className={`${(isGeneratingCover || isAddingBook) ? "button_disabled" : ""}`}>Add</button>
      </form>
    </div>
  );
};

export default AddBookModal;
