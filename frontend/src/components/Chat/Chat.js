import React from 'react'
import {Helmet} from 'react-helmet'
import Websocket from 'react-websocket';
import MessageInput from './MessageInput';
import {connect} from 'react-redux'


class Chat extends React.Component {

   constructor(props) {
      super(props);
      this.messagesContainer = React.createRef();
      this.onMessageSend = this.onMessageSend.bind(this);
   }

   componentDidMount() {
      this.scrollToEnd();
   }

   componentDidUpdate(prevProps) {
      if (!prevProps.items.length && this.props.items && this.props.items.length){
         this.scrollToEnd();
      }
      if (this.props.items && prevProps.items.length < this.props.items.length) {
         this.scrollToEnd();
      }
   }

   onMessageSend() {
      this.scrollToEnd();
   }

   scrollToEnd() {
      this.messagesContainer.current.scrollTop = this.messagesContainer.current.scrollHeight;
   }
   
   render() {
      const messages = this.props.messages.map((message, index) => {
            const cls = !!message.sender;
            return (
               <div className={`message ${cls ? 'align-right' : ''}`} key={index}>
                  <div className="message-conent">{message.text}</div>
               </div>
            )
         }
      )

      const { isFetching } = this.props;

      return (
         <div className="chat-wrapper">
            <div className="messages-wrapper" ref={this.messagesContainer}>
               {isFetching ? <div className="loading-indicator">...loading...</div> : messages}
            </div>
            <MessageInput onMessageSend={this.onMessageSend} sender={this.props.sender} dialog={this.props.dialog}/>
         </div>
      )
   }
}

const mapStateToProps = state => {
   const items = state.messages.items || [];
   return {
      isFetching: state.messages.isFetching,
      items
   }
}


Chat = connect(mapStateToProps)(Chat)

export default Chat;
