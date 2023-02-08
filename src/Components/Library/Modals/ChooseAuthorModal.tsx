import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../Redux/hooks";
import { getAllAuthors } from "../../../Redux/slices/authorSlice";
import { AuthorType } from "../../../Types/Types";
import FilteredAuthor from "./FilteredAuthor";

interface Props {
    setAuthorModalOpen:  Dispatch<SetStateAction<boolean>>;
    finalSelectedAuthor: AuthorType | null
}


const ChooseAuthorModalContent = ({setAuthorModalOpen, finalSelectedAuthor}:Props) => {
    const dispatch = useAppDispatch()
    const authors = useAppSelector(state=>state.authors.authors)
    useEffect(()=>{
        dispatch(getAllAuthors())
    },[])

    const [searchValue, setSearchValue] = useState("")
    const [filteredAuthors, setFilteredAuthors] = useState<AuthorType[] | null | undefined>(null)
    const filteredAuthorsMapped = filteredAuthors?.map(filteredAuthor=>{
        return <FilteredAuthor  
        filteredAuthor={filteredAuthor}
        finalSelectedAuthor={finalSelectedAuthor}/>
    })
    

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
            <input 
            value={searchValue} 
            type="text" 
            id="search_author_field" 
            onChange={(e)=>{handleSearch(e)}} />

            {filteredAuthorsMapped}

            <button onClick={()=>setAuthorModalOpen(false)}>Confirm</button>
        </div>
        </>
     );
     
}
 
export default ChooseAuthorModalContent;