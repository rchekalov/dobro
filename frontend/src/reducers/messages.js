import * as types from '../constants/ActionTypes'

const messages = (state = {
   items: [],
   isFetching: false,
   isSending: true,
   dialog: '',
   id: null
}, action) => {
  switch (action.type) {
    case types.SEND_MESSAGE_REQUEST:
      return Object.assign({}, state, {
         isSending: true,
         items: [...state.items || [], action.message]
      })
    case 'SEND_MESSAGE_SUCCESS':
      return Object.assign({}, state, {
         isSending: false,
         dialog: action.dialog
      })
   case 'SEND_MESSAGE_FAILED':
      return Object.assign({}, state, {
        isSending: true
      })
    case 'GET_CHAT_REQUEST':
      return Object.assign({}, state, {
         isFetching: !action.silent
      })
    case 'GET_CHAT_SUCCESS':
      return Object.assign({}, state, {
         isFetching: false,
         items: action.items
      })
   case 'GET_CHAT_FAILED':
      return Object.assign({}, state, {
        isFetching: true
      })
    default:
      return state
  }
}

export default messages
