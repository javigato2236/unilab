import {useNavigate} from "react-router-dom";



function LabQuimica ({imagenLogo,titulo, ruta}) {
  const navigate = useNavigate();

  const irInventario = () => {
    navigate(ruta);
  };

  

  return (

    
    
    <div className='App'>
      

      <div className='clickable-div'>
        
          <img src={imagenLogo} alt='Imagen' onClick={irInventario}/>
          
        
            <h3>{titulo}</h3>
            
        
        
      </div>


    </div>
  );
}

export default LabQuimica;











 