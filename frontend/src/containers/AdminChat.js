import React from 'react'
import {connect} from 'react-redux'
import Chat from '../components/Chat/Chat'
import {getChat} from '../actions/messagesActions';

class ChatContainer extends React.Component {

   state = {
      interval: null
   }

   componentDidMount() {
      const { dispatch } = this.props;
      if (this.props.dialog) {
         dispatch(getChat(this.props.dialog))
         this.setState({interval: setInterval(this.poll.bind(this), 1000)});
      }
   }

   componentDidUpdate(prevProps) {
      const { dispatch } = this.props;
      if (prevProps.dialog != this.props.dialog) {
         dispatch(getChat(this.props.dialog))
         clearInterval(this.state.interval);
         this.setState({interval: setInterval(this.poll.bind(this), 1000)});
      }
   }

   poll() {
      const { dispatch } = this.props;
      dispatch(getChat(this.props.dialog, true));
   }

   componentWillUnmount() {
      clearInterval(this.state.interval);
   }

  render() {
      return (
         <Chat messages={this.props.messages} isFetching={this.props.isFetching} sender={1}/>
      )
  }
}

const mapStateToProps = state => {
   return {
      messages: state.messages.items || [],
      dialog: state.dialogs.selectedDialog,
      isFetching: state.dialogs.isFetching
   }
}

ChatContainer = connect(mapStateToProps)(ChatContainer)

export default ChatContainer
