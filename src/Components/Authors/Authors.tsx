import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { getAllAuthors } from "../../Redux/slices/authorSlice";
import Preloader from "../Common/Preloader";
import Author from "./Author";
import AuthorsSidebar from "./AuthorsSidebar";
import AllAuthors from "./Routes/AllAuthors";
import Popular from "./Routes/Popular";

const Authors = () => {
  const dispatch = useAppDispatch();
  const authors = useAppSelector((state) => state.authors.authors);
  const isFetching = useAppSelector((state) => state.authors.isFetching);

  useEffect(() => {
    if (authors.length===0) {
      dispatch(getAllAuthors())
    }
  },[authors.length]);
// map all authors (will require pagination in future)
  const allAuthorsMapped = authors.length>0 && authors.map((author,index)=>{
    return <Author key={index} author={author}></Author>
  })
// filter only popular authors (>1 book)
  const popularAuthors = authors?.filter(author=>{
    return author.books.length>1
  })
  const popularAuthorsMapped = popularAuthors.map((author,index)=>{
    return <Author key={index} author={author}></Author>
  })

  return <div className="authors_container">
    <h2>Authors</h2>
    {isFetching && <Preloader loadingText="Loading authors..."/>}      
    <AuthorsSidebar></AuthorsSidebar>
    <div className="authors_content">

      <Routes>
        <Route path="" element={(!isFetching && authors.length>0) && <AllAuthors allAuthors={allAuthorsMapped}/>}></Route>
        <Route path="/popular" element={<Popular popularAuthors={popularAuthorsMapped}/>}></Route>
      </Routes>
      {(authors.length===0 && !isFetching ) && <div>
      <h2>Look like there are no authors yet, but you can add one yourself!</h2>
      <button>Add author</button>
      </div> }
    </div>


  </div>;
};

export default Authors;
