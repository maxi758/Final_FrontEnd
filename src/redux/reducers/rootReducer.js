import { combineReducers } from 'redux';
import especialidades from './especialidadesReducer';
import auth from './authReducer';
import medicos from './medicosReducer';
import turnos from './turnosReducer';

const rootReducers = combineReducers({
  especialidades,
  auth,
  medicos,
  turnos,
});

export default rootReducers;
