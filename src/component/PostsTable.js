import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  callCarregarPostagens,
  callCarregarPostagensPorCategoria,
  callExcluirPostagem,
  selecionarOrdem,
  callVotar
} from "../actions";
import Moment from "moment";
import sortBy from "sort-by";
import { Button, Table } from "semantic-ui-react";

class PostsTable extends Component {
  state = {
    ordem: "voteScore"
  };

  componentDidMount() {
    let categoria = this.props.match.params.categoria;

    if (categoria === undefined) {
      this.props.callCarregarPostagens();
    } else {
      this.props.callCarregarPostagensPorCategoria(categoria);
    }
  }

  componentWillReceiveProps(nextProps) {
    let ordem = nextProps.ordem.ordem;
    const { categoria } = this.props.match.params;
    const proximaCategoria = nextProps.match.params.categoria;

    if (categoria !== proximaCategoria)
      this.props.callCarregarPostagensPorCategoria(proximaCategoria);

    this.setState({
      ordem: ordem
    });
  }

  handleExcluirPostagem = id => {
    let confirm = window.confirm("Deseja mesmo excluir este registro?");

    if (confirm === true) {
      this.props.callExcluirPostagem(id);
    }
  };

  handleSelecionarOrdem = e => {
    let ordem = e.target.value;

    this.props.selecionarOrdem(ordem);
  };

  handleVotar = (id, option) => {
    let data = {
      option: option
    };

    this.props.callVotar(id, data, "posts");
  };

  render() {
    let postagens = this.props.postagens.postagens;

    postagens.sort(sortBy(`-${this.state.ordem}`));

    return (
      <section className="posts-table-wrapper" style={{ textAlign: "center" }}>
        <h3>Todas as postagens</h3>
        <div className="ordenar-por">
          <label>Ordenar por:</label>
          <select onChange={this.handleSelecionarOrdem}>
            <option value="voteScore">Votos</option>
            <option value="timestamp">Data</option>
          </select>
        </div>
        <Table celled>
          <div className="h3-wrapper" />
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Título</Table.HeaderCell>
              <Table.HeaderCell>Categoria</Table.HeaderCell>
              <Table.HeaderCell>Autor</Table.HeaderCell>
              <Table.HeaderCell>Data</Table.HeaderCell>
              <Table.HeaderCell>Comentários</Table.HeaderCell>
              <Table.HeaderCell>Votos</Table.HeaderCell>
              <Table.HeaderCell>Ações</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <tbody>
            {postagens !== undefined &&
              postagens.map(postagem => (
                <tr key={postagem.id}>
                  <td>{postagem.title}</td>
                  <td>{postagem.category}</td>
                  <td>{postagem.author}</td>
                  <td>
                    {Moment.unix(postagem.timestamp / 1000).format(
                      "DD/MM/YYYY"
                    )}
                  </td>
                  <td>{postagem.commentCount}</td>
                  <td>
                    <span style={{ marginRight: "5px" }}>
                      {postagem.voteScore}
                    </span>
                    <Button
                      style={{ marginRight: "5px" }}
                      onClick={() => this.handleVotar(postagem.id, "upVote")}
                    >
                      +
                    </Button>
                    <Button
                      onClick={() => this.handleVotar(postagem.id, "downVote")}
                    >
                      -
                    </Button>
                  </td>
                  <td>
                    <Button style={{ marginRight: "5px" }}>
                      <Link to={`/${postagem.category}/${postagem.id}`}>
                        Ver
                      </Link>
                    </Button>
                    <Button style={{ marginRight: "5px" }}>
                      <Link to={`/postagens/${postagem.id}/editar`}>
                        Editar
                      </Link>
                    </Button>
                    <Button
                      onClick={() => this.handleExcluirPostagem(postagem.id)}
                    >
                      Excluir
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
        <Button>
          <Link to="/postagens/criar">Nova Postagem</Link>
        </Button>
      </section>
    );
  }
}

const mapStateToProps = ({ postagens, postagem, ordem }) => ({
  postagens,
  postagem,
  ordem
});

export default connect(mapStateToProps, {
  callCarregarPostagens,
  callCarregarPostagensPorCategoria,
  callExcluirPostagem,
  selecionarOrdem,
  callVotar
})(PostsTable);
