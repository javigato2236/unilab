



function LabQuimica ({imagenLogo,titulo}) {

  return (
    
    <div className='App'>
        <div className='clickable-div'>
            <img src={imagenLogo} alt='Imagen' />
            {/* <h3>Inventario de <br />reactivos quimicos</h3> */}
            <h3>{titulo}</h3>
        </div>

    
    </div>
  );
}

export default LabQuimica;











  // const navigate = useNavigate();
    // const handleLogout = () => {
    // logout(navigate)
    // }