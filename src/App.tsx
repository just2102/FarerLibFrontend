import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Authors from './Components/Authors/Authors'
import Preloader from './Components/Common/Preloader'
import Header from './Components/Header/Header'
import Library from './Components/Library/Library'
import LoginContainer from './Components/Login/LoginContainer'
import MyBooks from './Components/MyBooks/MyBooks'
import { useAppDispatch, useAppSelector } from './Redux/hooks'
import { requestInit } from './Redux/slices/appSlice'
// import MyBooks from './Components/MyBooks/MyBooks'

function App() {
  const dispatch = useAppDispatch()
  const isInitialized = useAppSelector(state=>state.app.isInitialized)
  // Initialize the app
  useEffect(()=>{
    if (!isInitialized) {
      dispatch(requestInit())
    }
  }, [isInitialized])

  return (
  <>
  {!isInitialized && <Preloader displayInitText={true} ></Preloader> }
  {isInitialized &&
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path='/library' element={<Library/>} ></Route>
        <Route path='/mybooks' element={<MyBooks/>}></Route>
        <Route path='/authors' element={<Authors/>}></Route>
        <Route path='/login' element={<LoginContainer/>}></Route>
      </Routes>
      {/* <MyBooks></MyBooks> */}
    </div>}
  </>)
}

export default App
