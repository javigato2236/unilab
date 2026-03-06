import '../styles/modulosInicioSessionLabs.css'
import Modal from '../hoosk/modalReutilizable';
import LogoQuimica from '../assets/LogoQuimica.png';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';




function ModulosInicioSessionLabs() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [correo,setCorreo]= useState('');
  const [clave,setClave]= useState('');
  const navigate = useNavigate();

  const handleSubmit=async(e)=>{
    e.preventDefault();

    try {
      const res = await api.post('/login',{correo,clave});

      localStorage.setItem('access_token',res.data.access_token);
      localStorage.setItem('refresh_token',res.data.refresh_token);

      setCorreo('');
      setClave('');

      navigate('/labQuimica');

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
            <input className='input-usuario-titulo'  value={correo} onChange={e=>setCorreo(e.target.value)} placeholder='Email' />
          </div>

          <div>
            <label className='contraseña-titulo'>Contraseña:</label>
            <input className='input-contraseña-titulo' type='password' value={clave} onChange={e=>setClave(e.target.value)} placeholder='Password' />
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