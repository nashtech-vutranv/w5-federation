import React from 'react';
import { useSubscription, gql } from '@apollo/client';

const MESSAGE_SUBSCRIPTION = gql`
  subscription {
    messages {
      id
      user
      content
    }
  }
`;

export const Messages = ({ user }) => {
  const { data, loading, error } = useSubscription(MESSAGE_SUBSCRIPTION);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  
  const messages = data ? data.messages : [];

  return messages.map(({id, user: messageUser, content}) => (
    <div
      key={id}
      style={{
        display: 'flex',
        justifyContent: user === messageUser ? 'flex-end': 'flex-start',
        paddingBottom: '1em'
      }}
    >
      {
        user !== messageUser && (
          <div
            style={{
              display: 'flex',
              height: 45,
              width: 45,
              marginRight: '0.5em',
              border: '2px solid #e5e6ea',
              borderRadius: 25,
              textAlign: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16pt',
            }}
          >
            {messageUser.slice(0,2).toUpperCase()}
          </div>
        )
      }
      <div
        style={{
          background: user === messageUser ? '#58bf56' : '#e5e6ea',
          color: user === messageUser ? 'white' : 'black',
          padding: '1em',
          borderRadius: '1em',
          maxWidth: '60%'
        }}
      >
          {content}
      </div>
    </div>
  ))
}