import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import { getAllAuthors } from "../../../Redux/slices/authorSlice";
import { AuthorType } from "../../../Types/Types";
import AddAuthorForm from "./AddAuthorForm";
import FilteredAuthor from "./FilteredAuthor";
import TopAuthor from "./TopAuthor";

interface Props {
    setAuthorModalOpen:  Dispatch<SetStateAction<boolean>>;
    finalSelectedAuthor: AuthorType | null
}

const ChooseAuthorModal = ({setAuthorModalOpen, finalSelectedAuthor}:Props) => {
    const dispatch = useAppDispatch()
    const authors = useAppSelector(state=>state.authors.authors)
    useEffect(()=>{
        dispatch(getAllAuthors())
    },[])
    // displays all authors now, but some mechanism to filter by, e.g. likes, should be implemented in the future
    const topAuthorsMapped = authors?.map(author=>{
        return <TopAuthor 
        author={author} 
        finalSelectedAuthor={finalSelectedAuthor} />
    })

    const [searchValue, setSearchValue] = useState("")
    const [filteredAuthors, setFilteredAuthors] = useState<AuthorType[] | null | undefined>(null)
    const filteredAuthorsMapped = filteredAuthors?.map(filteredAuthor=>{
        return <FilteredAuthor  
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
            {authors.length===0 && <AddAuthorForm />}


            {/* if there are authors, allow the user to search among them and display the filtered ones */}
            
            {authors.length>0 && <>
            {/* display top authors so that user can choose from them without searching */}
            <div className="top_authors">
                {topAuthorsMapped}
            </div> 
            <input 
            value={searchValue} 
            type="text" 
            id="search_author_field" 
            onChange={(e)=>{handleSearch(e)}} />

            {filteredAuthorsMapped}

            <button onClick={()=>setAuthorModalOpen(false)}>Confirm</button>
            </>}
        </div>
        </>
     );
}
 
export default ChooseAuthorModal;