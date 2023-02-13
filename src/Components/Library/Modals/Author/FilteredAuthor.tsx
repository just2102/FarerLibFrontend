import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../Redux/hooks";
import { setFinalSelectedAuthor } from "../../../../Redux/slices/authorSlice";
import { AuthorType } from "../../../../Types/Types";

interface Props {
    filteredAuthor: AuthorType
    finalSelectedAuthor: AuthorType | null
}

const FilteredAuthor = ({filteredAuthor, finalSelectedAuthor}:Props) => {
  let [isSelected, setIsSelected] = useState(false)

  const dispatch = useAppDispatch()
  const onAuthorClick = (author:AuthorType) => {
    dispatch(setFinalSelectedAuthor(author))
  }
  useEffect(()=>{
    if (finalSelectedAuthor) {
      if (filteredAuthor._id===finalSelectedAuthor._id) {
        setIsSelected(true)
      }
    }
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
