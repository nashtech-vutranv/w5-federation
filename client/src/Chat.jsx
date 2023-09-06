import React from 'react';
import { useMutation, gql } from '@apollo/client';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Messages} from './components/Messages'

const POST_MESSAGE = gql`
  mutation($user: String!, $content: String!) {
    postMessage(user: $user, content: $content)
  }
`

export default function Chat() {
  const [state, setState] = React.useState({
    user: 'Vu Tran',
    content: ''
  })

  const [postMessage] = useMutation(POST_MESSAGE);

  const handleChangeUser = (event) => {
    setState({
      ...state,
      user: event.target.value
    })
  }

  const handleChangeContent = (event) => {
    setState({
      ...state,
      content: event.target.value
    })
  }

  const handleSendContent = () => {
    if (state.content.length === 0) return
    setState({
      ...state,
      content: ''
    });
    postMessage({
      variables: state
    })
  }

  return (
    <Container>
      <Messages user={state.user}/>
      <Row>
        <Col xs={2}>
          <Form.Control
            id="username"
            aria-describedby="user-name"
            onChange={handleChangeUser}
          />
        </Col>
        <Col xs={8}>
          <Form.Control
            id="content"
            aria-describedby="user-content"
            onChange={handleChangeContent}
            onKeyDown={(e) => {
              if (e.keyCode === 13) handleSendContent()
            }}
            value={state.content}
          />
        </Col>
        <Col xs={2}>
          <Button onClick={handleSendContent}>Submit</Button>
        </Col>
      </Row>
    </Container>  
  )
}

