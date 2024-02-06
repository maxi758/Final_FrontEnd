import { combineReducers } from 'redux';
import especialidades from './especialidadesReducer'
import auth from './authReducer'

const rootReducers = combineReducers({
    especialidades,
    auth
});

export default rootReducers;
