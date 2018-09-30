import React from 'react'
import {Helmet} from 'react-helmet'
import Websocket from 'react-websocket';
import {connect} from 'react-redux'
import {sendMessage} from '../../actions/messagesActions';

class MessageInput extends React.Component {

   constructor(props) {
      super(props);
      this.onTextChange = this.onTextChange.bind(this);
      this.sendMessage = this.sendMessage.bind(this);
      this.messageInput = React.createRef();
      this.onKeyDown = this.onKeyDown.bind(this);
   }

   state = {
      text: ''
   }

   onTextChange(event) {
      const text = event.target.value;
      this.setState({text: text})
   }

   onKeyDown(event) {
      if (event.which == 13) {
         this.sendMessage();
         event.preventDefault();
         event.stopPropagation();
      }
   }

   sendMessage() {
      const { dispatch } = this.props;
      const message = {
         text: this.state.text
      }
      if (this.state.text.length) {
         dispatch(sendMessage(message, this.props.dialog, this.props.sender));
         this.setState({text: ''}, () => this.props.onMessageSend())
         this.messageInput.current.focus();
      }
   }

   render() {
      return (
         <div className="message-input">
            <textarea onChange={this.onTextChange} onKeyDown={this.onKeyDown} value={this.state.text} ref={this.messageInput}/>
            <input type="button" value=">" onClick={this.sendMessage}/>
         </div>
      )
   }
}

const mapStateToProps = state => {
  return {
    isFetching: state.messages.isFetching,
    isSending: state.messages.isSending,
    dialog: state.messages.dialog
  }
}


MessageInput = connect(mapStateToProps)(MessageInput)

export default MessageInput;
