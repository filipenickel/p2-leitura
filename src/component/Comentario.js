import React, { Component } from "react";
import { Comment, Rating } from "semantic-ui-react";

class Comentario extends Component {
  render() {
    const { post } = this.props;

    console.log(post);
    return (
      <div>
        <Comment.Group>
          <Comment>
            <Comment.Content>
              <Comment.Text>Categoria: {this.props.post.category}</Comment.Text>
              <Comment.Author as="a">
                Author: {this.props.post.author}
              </Comment.Author>
              <Comment.Metadata>
                <div>{this.props.post.timestamp} </div>
                <Rating
                  maxRating={6}
                  defaultRating={this.props.post.voteScore}
                />
              </Comment.Metadata>
              <Comment.Text>{this.props.post.title}</Comment.Text>
              <Comment.Text>{this.props.post.body}</Comment.Text>
              <Comment.Actions>
                <Comment.Action>Comentar</Comment.Action>
              </Comment.Actions>
            </Comment.Content>
          </Comment>
        </Comment.Group>
      </div>
    );
  }
}

export default Comentario;
