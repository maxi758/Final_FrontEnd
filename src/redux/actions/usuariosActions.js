export const REGISTER_USUARIO = 'REGISTER_USUARIO',
  CREATE_ADMIN = 'CREATE_ADMIN',
  LOGIN_USUARIO = 'LOGIN_USUARIO';
//registro
export const registerUsuario = () => {
  return {
    type: REGISTER_USUARIO,
  };
};
// crear admin
export const createAdmin = () => {
  return {
    type: CREATE_ADMIN,
  };
};
//login
export const loginUsuario = () => {
  return {
    type: LOGIN_USUARIO,
  };
};
