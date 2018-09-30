import * as types from '../constants/ActionTypes'

const HOST = 'http://54.38.53.95:8000';
const API = {
   sendMessage: dialog => `${HOST}/message/`,
   getMessages: dialog => `${HOST}/message/?dialog=${dialog}`
}

export const sendMessageRequest = (text, sender) => {
   return {
      type: types.SEND_MESSAGE_REQUEST,
      message: {
         text,
         sender
      },
   }
}

export const sendMessageSuccess = () => {
   return {
      type: types.SEND_MESSAGE_SUCCESS
   }
}

export const sendMessage = (message, dialog, sender) => {
   return dispatch => {
      dispatch(sendMessageRequest(message.text, sender));

      return fetch(API.sendMessage(dialog), {
         method: 'POST',
         headers:{'content-type': 'application/json'},
         body: JSON.stringify({
            text: message.text,
            dialog,
            sender
         })
      })
      .then(response => {
         response.json().then(data => {
            dispatch({
               type: types.SEND_MESSAGE_SUCCESS,
               ...data
            });
         });
      });
   };
};

export const getChatRequest = (dialog, silent) => {
   return {
      type: types.GET_CHAT_REQUEST,
      dialog,
      silent
   }
}

export const getChatSuccess = data => {
   return {
      type: types.GET_CHAT_SUCCESS,
      items: data
   }
}

export const getChat = (dialogId, silent) => {
   return dispatch => {
      dispatch(getChatRequest(dialogId, silent));

      return fetch(API.getMessages(dialogId), {
         method: 'GET'
      })
      .then(response => {
         response.json().then(data => {
            dispatch(getChatSuccess(data));
         });
      });
   };
};

