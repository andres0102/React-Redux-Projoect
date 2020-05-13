import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  getConversations,
  getConversation,
  deleteConversation,
  deleteAllConversations,
  clearingMessages,
  applyMessage
} from '../../redux/actions/conversations'
import Conversation from './conversation'
import SweetAlert from 'sweetalert2-react';
import MessagesContainer from './messages_container';
import Loader from 'react-loader-spinner';

class ConversationsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      swalIsOpen: false,
      swalDeleteAllIsOpen: false,
      selectedConversation: '',
      sidebarVisible: true
    }
  }

  componentDidMount() {
    this.props.getConversations();
  }

  componentWillUnmount() {
    this.props.clearingMessages();
  }

  renderLoader = () => {
    return (
      <div className="col-12 text-center">
        <Loader type="Hearts" color="red" height={80} width={80} />
      </div>
    )
  }

  handleGetConversationClick = (conversation_id) => {
    this.setState({sidebarVisible: false});
    this.props.getConversation(conversation_id);
  }

  handleReceivedMessage = (message) => {
    this.props.applyMessage(message)
  }

  handleDeleteConversationClick = (conversation_id) => {
    this.setState({
      selectedConversation: conversation_id,
      swalIsOpen: true
    });
  }

  handleDeleteAllConversationsClick = () => {
    this.setState({swalDeleteAllIsOpen: true});
  }

  renderConversation = (conversation) => {
    return (
      <Conversation
        key={conversation.id}
        conversation={conversation}
        handleGetConversationClick={this.handleGetConversationClick}
        handleReceivedMessage={this.handleReceivedMessage}
        handleDeleteConversationClick={this.handleDeleteConversationClick}
      />
    )
  }

  renderConversations = () => {
    if(this.props.conversations.length <= 0) return;
    return this.props.conversations.map(this.renderConversation)
  }

  deleteConversationSubmit = () => {
    this.props.deleteConversation(this.state.selectedConversation);
    this.setState({
      selectedConversation: '',
      swalIsOpen: false,
      swalDeleteAllIsOpen: false
    });
  }

  deleteAllConversationsSubmit = () => {
    this.props.deleteAllConversations();
    this.setState({
      selectedConversation: '',
      swalIsOpen: false,
      swalDeleteAllIsOpen: false
    });
  }

  renderSwal = () => {
    return (
      <SweetAlert
        show={this.state.swalIsOpen}
        type="warning"
        title="Διαγραφή συνομιλίας"
        text='Είστε σίγουρος/η?'
        showCancelButton={true}
        confirmButtonText="Ναί"
        cancelButtonText="Όχι"
        onConfirm={this.deleteConversationSubmit}
        onCancel={() => this.setState({swalIsOpen: false})}
      />
    )
  }

  renderDeleteAllSwal = () => {
    return (
      <SweetAlert
        show={this.state.swalDeleteAllIsOpen}
        type="warning"
        title="Διαγραφή συνομιλιών"
        text='Είστε σίγουρος/η?'
        showCancelButton={true}
        confirmButtonText="Ναί"
        cancelButtonText="Όχι"
        onConfirm={this.deleteAllConversationsSubmit}
        onCancel={() => this.setState({swalDeleteAllIsOpen: false})}
      />
    )
  }

  sidebarToggleClick = (e) => {
    e.preventDefault();
    const toggled = this.state.sidebarVisible ? false : true
    this.setState({sidebarVisible: toggled});
  }

  renderSideBar = () => {
    return (
      <div id="left-menu">
        { this.renderSwal() }
        { this.renderDeleteAllSwal() }
        <div className="col">
          <button
            onClick={this.handleDeleteAllConversationsClick}
            className="d-inline-block btn btn-outline-light btn-sm m-1"
          >
            Διαγραφή όλων
          </button>
          <a
            href=""
            onClick={this.sidebarToggleClick}
            className="d-inline-block closebtn pull-right"
          >
            <i className="fa fa-bars" />
          </a>
          <hr />
        </div>
        <ul className="list-group">
          {
            this.props.isFetchingConversations
            ? this.renderLoader()
            : this.renderConversations()
          }
        </ul>
      </div>
    )
  }

  renderSmallSidebar = () => {
    return (
      <div id="left-menu-small">
        <a
          href=""
          onClick={this.sidebarToggleClick}
          className="d-inline-block closebtn"
        >
          <i className="fa fa-bars" />
        </a>
        <hr className="ml-2" />
        <ul className="list-group">
          {
            this.props.isFetchingConversations
            ? this.renderLoader()
            : this.renderConversations()
          }
        </ul>
      </div>
    )
  }

  render() {
    return(
      <Fragment>
        {
          this.state.sidebarVisible ?
          this.renderSideBar() :
          this.renderSmallSidebar()
        }
        <MessagesContainer handleReceivedMessage={this.handleReceivedMessage} />
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    conversations: state.conversations.results,
    isFetchingConversations: state.conversations.isFetchingConversations,
    isDeletingConversation: state.conversations.isDeletingConversation
  };
}

function mapDispatchToProps(dispatch) {
  return {
      ...bindActionCreators({
      getConversations,
      getConversation,
      deleteConversation,
      deleteAllConversations,
      clearingMessages,
      applyMessage
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ConversationsList);
