import { createStore, combineReducers } from 'redux';
import userReducer from './reducres/userReducer'
import postReducer from './reducres/postReducer'

const rootReducer = combineReducers({
  user: userReducer,
  post: postReducer,
});

const store = createStore(rootReducer);

export default store;
