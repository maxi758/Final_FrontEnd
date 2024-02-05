import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import rootReducers from './reducers/rootReducer';
//import { composeWithDevTools } from '@redux-devtools/extension';

const store = configureStore({
  reducer: rootReducers,
  //devTools: composeWithDevTools(applyMiddleware(thunk)),
});

export default store;
