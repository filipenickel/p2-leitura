import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  callCarregarPostagem,
  callCarregarComentarios,
  callExcluirPostagem,
  callVotar
} from "../actions";
import { connect } from "react-redux";
import { capitalize } from "../utils/helpers";
import Moment from "moment";
import Comentarios from "./Comentarios";
import { Button, Comment } from "semantic-ui-react";
import NoMatch from './NoMatch'

class Post extends Component {
  componentDidMount() {
    this.props.callCarregarPostagem(this.props.match.params.id);
    this.props.callCarregarComentarios(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    let postagem = nextProps.postagem.postagem;

    if (postagem.deleted === true) {
      this.props.history.push("/NoMatch");
    }
  }

  handleExcluirPostagem = id => {
    let confirm = window.confirm("Deseja mesmo excluir este registro?");

    if (confirm === true) {
      this.props.callExcluirPostagem(id);

      window.location = "/";
    }
  };

  handleVotar = (id, option) => {
    let data = {
      option: option
    };

    this.props.callVotar(id, data, "posts", true);
  };

  
  render() {

    let postagem = this.props.postagem.postagem;
    if( Object.keys(postagem).length === 0 ){
      return <NoMatch location={this.props.location}/> }
    let comentarios = this.props.comentarios.comentarios;

    return (
      <main>
        <Comment.Group>
          <Comment>
            <Link to="/">
              <Button>Voltar</Button>
            </Link>
            <br />
            <br />
            <Comment.Content>
              <h3>{postagem.title}</h3>
              <Comment.Text>
                Categoria:{" "}
                {postagem.category !== undefined &&
                  capitalize(postagem.category)}{" "}
              </Comment.Text>
              <Comment.Author as="a">{postagem.author}</Comment.Author>
              <Comment.Metadata>
                <div>
                  em{" "}
                  {Moment.unix(postagem.timestamp / 1000).format("DD/MM/YYYY")}
                </div>
              </Comment.Metadata>
              <Comment.Text>
                <span>{comentarios.length} comentarios | </span>
                <span>{postagem.voteScore} votos</span>
                <Button
                  size="mini"
                  style={{ marginRight: "5px" }}
                  onClick={() => this.handleVotar(postagem.id, "upVote")}
                >
                  +
                </Button>
                <Button
                  size="mini"
                  onClick={() => this.handleVotar(postagem.id, "downVote")}
                >
                  {" "}
                  -
                </Button>
              </Comment.Text>
              <Comment.Text>Comentario: {postagem.body}</Comment.Text>
              <Comment.Actions>
                <Link to={`/postagens/${postagem.id}/editar`}>
                  <Button size="mini" style={{ marginRight: "5px" }}>
                    Editar
                  </Button>
                </Link>
                <Button
                  size="mini"
                  onClick={() => this.handleExcluirPostagem(postagem.id)}
                >
                  Excluir
                </Button>
              </Comment.Actions>
            </Comment.Content>
          </Comment>
          <Comentarios id={this.props.match.params.id} />
        </Comment.Group>
      </main>
    );
  }
}

const mapStateToProps = ({ postagem, comentarios }) => ({
  postagem,
  comentarios
});

export default connect(mapStateToProps, {
  callCarregarPostagem,
  callCarregarComentarios,
  callExcluirPostagem,
  callVotar
})(Post);
