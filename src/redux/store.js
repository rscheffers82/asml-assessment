import { createStore } from 'redux'
import initialData from '../helpers/initial-data'
import reducer from './reducer'

const store = createStore(
  reducer,
  initialData(),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;
