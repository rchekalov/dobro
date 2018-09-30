import * as types from '../constants/ActionTypes'

const HOST = 'http://54.38.53.95:8000';
const API = {
   getDialogsList: () => `${HOST}/dialog/`
}

export const getDialogsListRequest = text => {
   return {
      type: types.GET_DIALOGS_REQUEST,
      message: {
         text
      }
   }
}

export const getDialogsListSuccess = data => {
   return {
      type: types.GET_DIALOGS_SUCCESS,
      items: data
   }
}

export const selectedDialog = dialogId => {
   return {
      type: types.SELECT_DIALOG,
      id: dialogId
   }
}

export const getDialogsList = () => {
   return dispatch => {
      dispatch(getDialogsListRequest());

      return fetch(API.getDialogsList(), { method: 'GET' })
         .then(response => {
            response.json().then(data => dispatch(getDialogsListSuccess(data)));
         });
   };
};


