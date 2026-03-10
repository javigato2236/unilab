import { Routes, Route } from 'react-router-dom';
import PaginaPrincipal from './components/paginaPrincipal';
import PaginaPrincipalLabQuimica from './components/paginaPrincipalLabQuimica';
import Register from './components/registro';



function App() {
  

  return (
    <>
      <Routes>
        <Route path='/' element = {<PaginaPrincipal/>}/>
        <Route path='/paginaPrincipalLabQuimica' element = {<PaginaPrincipalLabQuimica/>}/>
        <Route path='/registro' element = {<Register/>}/>
        
      
      </Routes>
    </>
  )
}

export default App
