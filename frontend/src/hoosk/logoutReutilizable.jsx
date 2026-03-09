const logout = (navigate) => {

  // eliminar tokens si existen tokens en caso contrarioo se quita el codigo
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');

  // eliminar cualquier otro dato de sesión
  localStorage.clear();

  // redirigir al login
  navigate('/', { replace: true });

};

export default logout;