import { UPDATE_ITEMS } from './actions'

const reducer = (state = {}, action) => {
    switch(action.type) {
      case UPDATE_ITEMS:
        return { ...state, items: action.payload }
      default:
        return state;
    }
  }

  export default reducer;
  