import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  callCarregarComentarios,
  callCriarComentario,
  callExcluirComentario,
  callVotar
} from "../actions";
import { connect } from "react-redux";
import Moment from "moment";
import sortBy from "sort-by";
import { Button, Input } from "semantic-ui-react";

class Comentarios extends Component {
  state = {
    ordem: "voteScore"
  };

  componentDidMount() {
    this.props.callCarregarComentarios(this.props.id);
  }

  handleCriarComentario = e => {
    e.preventDefault();

    let comentario = {
      id: Date.now(),
      parentId: this.props.id,
      timestamp: Date.now(),
      author: e.target.autor.value,
      body: e.target.corpo.value
    };

    this.props.callCriarComentario(comentario);

    window.location = "/postagens/" + this.props.id;
  };

  handleExcluirComentario = id => {
    let confirm = window.confirm("Deseja mesmo excluir este registro?");

    if (confirm === true) {
      this.props.callExcluirComentario(id);
    }

    window.location = "/postagens/" + this.props.id;
  };

  handleVotar = (id, option) => {
    let data = {
      option: option
    };

    this.props.callVotar(id, data, "comments");
  };

  render() {
    let comentarios = this.props.comentarios.comentarios;

    comentarios.sort(sortBy(`-${this.state.ordem}`));

    return (
      <section className="comentarios-wrapper">
        <ul>
          {comentarios !== undefined &&
            comentarios.map(comentario => (
              <li key={comentario.id} className="comentario">
                <div>
                  <b>
                    {comentario.author} em{" "}
                    {Moment.unix(comentario.timestamp / 1000).format(
                      "DD/MM/YYYY"
                    )}:
                  </b>
                </div>
                <div className="comentario-body">{comentario.body}</div>
                <div className="comentario-footer">
                  <div>
                    <Button size="mini" style={{ marginRight: "5px" }}>
                      <Link to={`/comentarios/${comentario.id}/editar`}>
                        Editar
                      </Link>
                    </Button>
                    <Button
                      size="mini"
                      onClick={() =>
                        this.handleExcluirComentario(comentario.id)
                      }
                    >
                      Excluir
                    </Button>
                  </div>
                  <br />
                  <div className="votes-wrapper">
                    <span>{comentario.voteScore} votos</span>
                    <Button
                      size="mini"
                      style={{ marginRight: "5px" }}
                      onClick={() => this.handleVotar(comentario.id, "upVote")}
                    >
                      +
                    </Button>

                    <Button
                      size="mini"
                      onClick={() =>
                        this.handleVotar(comentario.id, "downVote")
                      }
                    >
                      -
                    </Button>
                  </div>
                </div>
                <hr />
              </li>
            ))}
        </ul>

        <form
          className="comentario-form"
          onSubmit={this.handleCriarComentario}
          style={{ textAlign: "center" }}
        >
          <div style={{ marginBottom: "10px" }}>
            <b>Comentar</b>
          </div>
          <Input
            name="autor"
            type="text"
            placeholder="Autor"
            style={{ marginBottom: "10px" }}
            required
          />
          <br />
          <Input name="corpo" placeholder="Comentario...." required />
          <br />
          <br />
          <Button size="mini">Comentar</Button>
        </form>
      </section>
    );
  }
}

const mapStateToProps = ({ comentarios, comentario, ordem }) => ({
  comentarios,
  comentario,
  ordem
});

export default connect(mapStateToProps, {
  callCarregarComentarios,
  callCriarComentario,
  callExcluirComentario,
  callVotar
})(Comentarios);
