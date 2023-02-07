import { Route, Routes } from 'react-router-dom'
import './App.css'
import Authors from './Components/Authors/Authors'
import Header from './Components/Header/Header'
import Library from './Components/Library/Library'
// import MyBooks from './Components/MyBooks/MyBooks'

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path='/library' element={<Library/>} ></Route>
        <Route path='authors' element={<Authors/>}></Route>
      </Routes>
      {/* <MyBooks></MyBooks> */}
    </div>
  )
}

export default App
