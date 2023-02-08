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
  const authorsMapped = authors?.map((author,index)=>{
    return <Author key={index} author={author}></Author>
  })
  console.log(authors)
  return <div className="authors_container">
    {isFetching && <Preloader loadingText="Loading authors..."/>}
    {!isFetching && authorsMapped}
  </div>;
};

export default Authors;
