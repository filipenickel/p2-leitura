import React, { Component } from "react";
import { Container, Comment, Form, Button } from "semantic-ui-react";
import Comentario from "./Comentario";

class View extends Component {
  state = {
    post: []
  };
  render() {
    return (
      <div>
        <Container text>
          <Comment.Group>
            <Comment>
              {this.props.post.map(post => (
                <div key={post.id}>
                  <Comentario post={post} />
                </div>
              ))}
            </Comment>
          </Comment.Group>
          <Form reply>
            <Form.TextArea />
            <Button
              content="Nova Postagem"
              labelPosition="left"
              icon="edit"
              primary
            />
          </Form>
        </Container>
      </div>
    );
  }
}

export default View;
