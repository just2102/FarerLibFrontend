import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../Redux/hooks";
import { setFinalSelectedAuthor } from "../../../../Redux/slices/authorSlice";
import { AuthorType } from "../../../../Types/Types";

interface Props {
    author: AuthorType
    finalSelectedAuthor: AuthorType | null
}

const TopAuthor = ({author, finalSelectedAuthor}:Props) => {
  let [isSelected, setIsSelected] = useState(false)

  const dispatch = useAppDispatch()
  const onAuthorClick = (author:AuthorType) => {
    dispatch(setFinalSelectedAuthor(author))
  }
  useEffect(()=>{
    if (finalSelectedAuthor) {
      if (author._id===finalSelectedAuthor._id) {
        setIsSelected(true)
      }
    }
  },[finalSelectedAuthor])

  return (
    <div id="top_author" onClick={()=>onAuthorClick(author)} className={isSelected ? 'filteredSelectedAuthor' : ''}>
      <div className="author_name">
        {author.first_name + " " + author.last_name}
      </div>
    </div>
  );
};

export default TopAuthor;