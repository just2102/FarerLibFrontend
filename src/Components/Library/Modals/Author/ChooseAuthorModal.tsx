import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../../Redux/hooks";
import { getAllAuthors } from "../../../../Redux/slices/authorSlice";
import { AuthorType } from "../../../../Types/Types";
import AddAuthorForm from "./AddAuthorForm";
import FilteredAuthor from "./FilteredAuthor";
import OtherAuthor from "./OtherAuthor";
import TopAuthor from "./TopAuthor";

interface Props {
    setAuthorModalOpen:  Dispatch<SetStateAction<boolean>>;
    finalSelectedAuthor: AuthorType | null
}

const ChooseAuthorModal = ({setAuthorModalOpen, finalSelectedAuthor}:Props) => {
    const dispatch = useAppDispatch()
    const authors = useAppSelector(state=>state.authors.authors)
    useEffect(()=>{
        if (authors.length===0) {
            dispatch(getAllAuthors())
        }
    },[finalSelectedAuthor?._id, authors.length])
//  Filter authors by total number of stars their books have (for now, only get those that have more than 2 books)
    const topAuthors = authors?.filter(author=>{
        return author.books.length>1
    })
    const topAuthorsMapped = topAuthors.map((author,index)=>{
        return <TopAuthor 
        key={index}
        setAuthorModalOpen={setAuthorModalOpen}
        author={author} 
        finalSelectedAuthor={finalSelectedAuthor} />
    })
// also get non-top authors (other authors) and display them on condition (if clicked) 
// also sort them by alphabet
    const [otherAuthorsVisible, setOtherAuthorsVisible] = useState<boolean>(false)
    const otherAuthors = authors?.filter(author=>{
        return author.books.length<2
    })
    const otherAuthorsMapped = otherAuthors.sort((a,b)=>a.first_name.localeCompare(b.first_name)).map((author,index)=>{
        return <OtherAuthor
        key={index}
        setAuthorModalOpen={setAuthorModalOpen}
        otherAuthor={author}
        finalSelectedAuthor={finalSelectedAuthor} />
    })
    

    const [searchValue, setSearchValue] = useState("")
    const [filteredAuthors, setFilteredAuthors] = useState<AuthorType[] | null | undefined>(null)
    const filteredAuthorsMapped = filteredAuthors?.sort((a,b)=>a.first_name.localeCompare(b.first_name)).map(filteredAuthor=>{
        return <FilteredAuthor
        setAuthorModalOpen={setAuthorModalOpen}
        filteredAuthor={filteredAuthor}
        finalSelectedAuthor={finalSelectedAuthor}/>
    })

// on search field change, filter authors by first and/or last name
    const handleSearch = (event:React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value)
        setFilteredAuthors(
            authors?.filter(author=> author.first_name.toLowerCase().includes(searchValue.toLowerCase()) ||
                                     author.last_name.toLowerCase().includes(searchValue.toLowerCase())  || null)
        )
    }
    return ( 
        <>
        <div className="choose_author_modal_content">
            {/* if there are no top authors, display a form to add an author */}
            {authors.length===0 && <AddAuthorForm  />}

            {/* if there are authors, allow the user to search among them and display the filtered ones */}
            {authors.length>0 && <>
            {/* display top authors so that user can choose from them without searching */}
            <div className="top_authors">
                <h3>Top authors</h3>
                {topAuthorsMapped}
            </div> 
            <input 
            value={searchValue} 
            type="text" 
            id="search_author_field" 
            onChange={(e)=>{handleSearch(e)}}
            placeholder="Search..." />

            <div className="found_authors">
                {filteredAuthorsMapped}
            </div>
            <div className="other_authors">
                <>
                <div onClick={()=>setOtherAuthorsVisible(!otherAuthorsVisible)}><h4>Other authors: <span>↓</span></h4></div>
                {otherAuthorsVisible && otherAuthorsMapped}
                </>
            </div>
            <button onClick={()=>setAuthorModalOpen(false)}>Confirm</button>
            </>}
        </div>
        </>
     );
}
 
export default ChooseAuthorModal;