import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';
import MessageForm from './message_form';
import Message from './message';
import Cable from './cable';

class MessagesContainer extends Component {
  renderMessage = (message) => {
    return (
      <Message
        key={message.id}
        message={message}
        currentUser={this.props.currentUser}
      />
    )
  }

  handleReceivedMessage = (response) => {
    this.props.handleReceivedMessage(response.message)
  }

  renderMessages = () => {
    if(this.props.messages === undefined) { return }
    return this.props.messages.map(this.renderMessage)
  }

  renderLoader = () => {
    return (
      <div className="col-12 text-center">
        <Loader type="Hearts" color="red" height={80} width={80} />
      </div>
    )
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  componentDidMount = () => {
    this.scrollToBottom();
  }

  componentDidUpdate = () => {
    this.scrollToBottom();
  }

  render() {
    return(
      <div className="chat">
        <div className="user-avatar" />
        <ul id="messages" className="col-12 messages justify-content-center">
          { this.props.isFetchingConversation
            ? this.renderLoader()
            : this.renderMessages() }
          <div
            style={{ float:"left", clear: "both" }}
            ref={(el) => { this.messagesEnd = el; }}
          />
        </ul>
        {
          this.props.activeConversation ?
          <Fragment>
            <MessageForm activeConversation={this.props.activeConversation}/>
            <Cable
              conversation_id={this.props.activeConversation}
              handleReceivedMessage={this.handleReceivedMessage}
            />
          </Fragment> :
          null
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    activeConversation: state.conversations.activeConversation,
    messages: state.conversations.messages,
    currentUser: state.currentUser.result,
    isFetchingConversation: state.conversations.isFetchingConversation
  };
}

export default connect(mapStateToProps, null)(MessagesContainer);
