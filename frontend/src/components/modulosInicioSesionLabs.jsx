import '../styles/modulosInicioSessionLabs.css'
import Modal from '../hoosk/modalReutilizable';
import LogoQuimica from '../assets/LogoQuimica.png';
import iconoMostarOcultarPassword from '../assets/iconoMostarOcultarPassword.png';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api'




function ModulosInicioSessionLabs() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
   // 🔹 cerrar modal y reiniciar formulario
  const closeModal = () => {
    setIsModalOpen(false);

    // limpiar inputs
    setCorreo('');
    setClave('');

    // quitar errores
    setErrorCorreo(false);
    setErrorClave(false);

    // ocultar contraseña
    setMostrar(false);
  };
  

  const [correo,setCorreo]= useState('');
  const [clave,setClave]= useState('');

  // estados para marcar campos vacíos
  const [errorCorreo,setErrorCorreo] = useState(false);
  const [errorClave,setErrorClave] = useState(false);
  
  //estado para mostra o oculatar la clave
  const [mostrar,setMostrar] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit=async(e)=>{
    e.preventDefault();

     let hayError = false;

    // validar correo
    if(!correo.trim()){
      setErrorCorreo(true);
      hayError = true;
    }

    // validar clave
    if(!clave.trim()){
      setErrorClave(true);
      hayError = true;
    }

    if(hayError){
      alert("Ningún campo debe estar vacío");
      return;
    }

      


    try {
      const res = await api.post('/login',{correo,clave});

      localStorage.setItem('access_token',res.data.access_token);
      localStorage.setItem('refresh_token',res.data.refresh_token);

      setCorreo('');
      setClave('');

      navigate('/paginaPrincipalLabQuimica',{replace:true});

    } catch (err) {
      // 👇 mostramos el mensaje del backend en alerta
      if (err.response && err.response.data.detail) {
        alert(err.response.data.detail);
      } else {
        alert('Error al iniciar sesión');
      }
    }
  };

  return (

    <div className='App'>
      <div className='clickable-div' onClick={openModal}>
        <img src={LogoQuimica} alt='Imagen' />
        <h3>Quimica</h3>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 className='tituloIniciarSesion'>Iniciar sesión</h2>
        
        
        <form onSubmit={handleSubmit}>
          <div>
            <label className='usuario-titulo'>Usuario:</label>
            <input className='input-usuario-titulo' placeholder='Email' type="email" value={correo} onChange={(e)=>{
              setCorreo(e.target.value);
              if(e.target.value.trim())
                {
                  setErrorCorreo(false);
                }
                }}
            />
                 {errorCorreo && <span className="asterisco-usuario">*</span>}

          </div>

          <div>
            <label className='contraseña-titulo'>Contraseña:</label>
            
            <input className='input-contraseña-titulo' placeholder='Password' type= {mostrar ? "text" : "password"} value={clave} onChange={(e)=>{
              setClave(e.target.value);
              if(e.target.value.trim())
              {
              setErrorClave(false);
              }
              }} 
            />
             
             {errorClave && <span className="asterisco-contraseña">*</span>}
               <img
                src={iconoMostarOcultarPassword}
                alt="ver contraseña"
                className="icono-ojo"

                onMouseDown={()=>setMostrar(true)}
                onMouseUp={()=>setMostrar(false)}
                onMouseLeave={()=>setMostrar(false)}
              />

          </div>

          
            
          

          <div className='modal-buttons'>
            <button type='submit'>Enviar</button>
            <button type='button' onClick={closeModal}>Cancelar</button>
          </div>

          <div className='contenedor-olvido-contraseña'>
            <Link className='olvidar-contraseña' to=''>¿Olvido su contraseña?</Link>

          </div>
         
        </form>
        
      </Modal>
    </div>
  );
}

export default ModulosInicioSessionLabs;