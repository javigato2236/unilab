import { Routes, Route } from 'react-router-dom';
import PaginaPrincipal from './components/paginaPrincipal';
import LabQuimica from './components/componenteQuimica';
import Register from './components/registro';


function App() {
  

  return (
    <>
      <Routes>
        <Route path='/' element = {<PaginaPrincipal/>}/>
        <Route path='/labQuimica' element = {<LabQuimica/>}/>
        <Route path='/registro' element = {<Register/>}/>
      
      </Routes>
    </>
  )
}

export default App
