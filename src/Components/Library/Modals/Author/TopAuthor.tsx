import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../Redux/hooks";
import { setFinalSelectedAuthor } from "../../../../Redux/slices/authorSlice";
import { AuthorType } from "../../../../Types/Types";

interface Props {
    author: AuthorType
    finalSelectedAuthor: AuthorType | null
    setAuthorModalOpen: any
}

const TopAuthor = ({author, finalSelectedAuthor, setAuthorModalOpen}:Props) => {
  let [selectedId, setSelectedId] = useState<string|undefined>("")
  let isSelected = author._id === finalSelectedAuthor?._id

  const dispatch = useAppDispatch()
  const onAuthorClick = (author:AuthorType) => {
    dispatch(setFinalSelectedAuthor(author))
    // setAuthorModalOpen(false)
  }
  useEffect(()=>{
    // if (finalSelectedAuthor) {
    //   if (author._id===finalSelectedAuthor._id) {
    //     setSelectedId(finalSelectedAuthor._id)
    //   }
    // }
  },[finalSelectedAuthor?._id])

  return (
    <div id="top_author" onClick={()=>onAuthorClick(author)} className={isSelected ? 'filteredSelectedAuthor' : ''}>
      <div className="author_name">
        {author.first_name + " " + author.last_name}
      </div>
    </div>
  );
};

export default TopAuthor;