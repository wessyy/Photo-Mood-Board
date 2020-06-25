import { combineReducers } from 'redux';
import itemReducer from './itemReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import photoReducer from './photoReducer';
import boardReducer from './boardReducer';

export default combineReducers({
  item: itemReducer,
  error: errorReducer,
  auth: authReducer,
  photo: photoReducer,
  board: boardReducer,
});
