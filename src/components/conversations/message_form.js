import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { replyMessage } from '../../redux/actions/messages'

class MessageForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      body: '',
      conversation_id: this.props.activeConversation
    }
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.activeConversation !== prevProps.activeConversation) {
      this.setState({conversation_id: this.props.activeConversation});
    }
  }

  sanitizeInput = (data) => {
    const regex = /<|>/g;
    const trimmedData = data.replace(regex, "").trim()
    return trimmedData
  }

  sendMessage = (e) => {
    e.preventDefault();

    let sanitised = this.sanitizeInput(this.state.body);
    if(sanitised === "") { return }
    this.setState({body: sanitised});

    this.props.replyMessage(this.state);
    document.getElementById('message-input').value = '';
  }

  handleChange = (e) => {
    this.setState({body: e.target.value})
  }

  render() {
    return(
      <div className="row justify-content-center">
        <div className="col-12">
          <hr />
          <form className="m-2" onSubmit={this.sendMessage}>
            <div className="type_msg">
              <div className="input_msg_write">
                <textarea
                  rows="2"
                  cols="20"
                  wrap="hard"
                  className="write_msg"
                  onChange={this.handleChange}
                  id='message-input'
                  placeholder='Πληκτρολογήστε το μήνυμά σας...'
                />
                <button className="btn effect3 btn-primary btn-circle" type="submit">
                  <i className="fa fa-paper-plane-o" />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ replyMessage }, dispatch);
}

export default connect(null, mapDispatchToProps)(MessageForm);
