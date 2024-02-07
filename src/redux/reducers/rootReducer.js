import { combineReducers } from 'redux';
import especialidades from './especialidadesReducer';
import auth from './authReducer';
import medicos from './medicosReducer';

const rootReducers = combineReducers({
  especialidades,
  auth,
  medicos,
});

export default rootReducers;
