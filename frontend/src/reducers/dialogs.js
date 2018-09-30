import * as types from '../constants/ActionTypes'

const dialogs = (state = {
   items: [],
   isFetching: false,
   selectedDialog: null
}, action) => {
   switch (action.type) {
      case types.GET_DIALOGS_REQUEST:
         return Object.assign({}, state, {
            isFetching: true
         })
      case types.GET_DIALOGS_SUCCESS:
         return Object.assign({}, state, {
            isFetching: false,
            items: action.items
         })
      case types.GET_DIALOGS_FAILED:
         return Object.assign({}, state, {
            isFetching: true
         })
      case types.SELECT_DIALOG:
         return Object.assign({}, state, {
            selectedDialog: action.id
         })
      default:
         return state
  }
}

export default dialogs
