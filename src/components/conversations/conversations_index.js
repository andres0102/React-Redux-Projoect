import React, { Component } from 'react';
import ConversationsList from './conversations_list';

export default class Conversations extends Component {
  render() {
    return(
      <div className="container">
        <div className="ui effect3">
          <ConversationsList />
        </div>
      </div>
    );
  }
}
