import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { getAllAuthors } from "../../Redux/slices/authorSlice";
import Preloader from "../Common/Preloader";
import Author from "./Author";

const Authors = () => {
  const dispatch = useAppDispatch();
  const authors = useAppSelector((state) => state.authors.authors);
  const isFetching = useAppSelector((state) => state.authors.isFetching);

  useEffect(() => {
    dispatch(getAllAuthors())
  },[]);
  const authorsMapped = authors.length>0 && authors.map((author,index)=>{
    return <Author key={index} author={author}></Author>
  })
  return <div className="authors_container">
    {isFetching && <Preloader loadingText="Loading authors..."/>}
    {!isFetching && authors.length>0 && authorsMapped}
    {authors.length===0 && <div>
      <h2>Look like there are no authors yet, but you can add one yourself!</h2>
      <button>Add author</button>
      </div> }
  </div>;
};

export default Authors;
