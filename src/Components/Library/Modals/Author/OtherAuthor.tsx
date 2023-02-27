import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../Redux/hooks";
import { setFinalSelectedAuthor } from "../../../../Redux/slices/authorSlice";
import { AuthorType } from "../../../../Types/Types";

interface Props {
    otherAuthor: AuthorType
    finalSelectedAuthor: AuthorType | null
    setAuthorModalOpen: any
}

const OtherAuthor = ({otherAuthor, finalSelectedAuthor, setAuthorModalOpen}:Props) => {
  let [selectedId, setSelectedId] = useState<string|undefined>("")
  let isSelected = otherAuthor._id === finalSelectedAuthor?._id

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
    <div id="other_author" onClick={()=>onAuthorClick(otherAuthor)} className={isSelected ? 'filteredSelectedAuthor' : ''}>
      <div className="author_name">
        {otherAuthor.first_name + " " + otherAuthor.last_name}
      </div>
    </div>
  );
};

export default OtherAuthor;
