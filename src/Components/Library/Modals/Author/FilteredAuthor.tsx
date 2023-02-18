import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../Redux/hooks";
import { setFinalSelectedAuthor } from "../../../../Redux/slices/authorSlice";
import { AuthorType } from "../../../../Types/Types";

interface Props {
    filteredAuthor: AuthorType
    finalSelectedAuthor: AuthorType | null
    setAuthorModalOpen: any
}

const FilteredAuthor = ({filteredAuthor, finalSelectedAuthor, setAuthorModalOpen}:Props) => {
  let [selectedId, setSelectedId] = useState<string|undefined>("")
  let isSelected = filteredAuthor._id === finalSelectedAuthor?._id

  const dispatch = useAppDispatch()
  const onAuthorClick = (author:AuthorType) => {
    dispatch(setFinalSelectedAuthor(author))
    // setAuthorModalOpen(false)
  }
  useEffect(()=>{
    // if (finalSelectedAuthor) {
    //   if (filteredAuthor._id===finalSelectedAuthor._id) {
    //     setSelectedId(filteredAuthor._id)
    //   }
    // }
  },[finalSelectedAuthor])

  return (
    <div id="filtered_author" onClick={()=>onAuthorClick(filteredAuthor)} className={isSelected ? 'filteredSelectedAuthor' : ''}>
      <div className="author_name">
        {filteredAuthor.first_name + " " + filteredAuthor.last_name}
      </div>
    </div>
  );
};

export default FilteredAuthor;
