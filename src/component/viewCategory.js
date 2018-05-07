import React, { Component } from "react";
import { Comment, Form, Button } from "semantic-ui-react";

class viewCategory extends Component {
  state = {
    post: []
  };
  render() {
    return (
      <div>
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
      </div>
    );
  }
}

export default viewCategory;
