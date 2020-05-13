import React from 'react';
import { ActionCable } from 'react-actioncable-provider';

const Cable = ({ conversation_id, handleReceivedMessage }) => {
  return (
    <ActionCable
      key={conversation_id}
      channel={{ channel: 'MessageChannel', conversation_id: conversation_id }}
      onReceived={handleReceivedMessage}
    />
  );
};

export default Cable;
