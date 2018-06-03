import React, { Component } from "react";
import { Link } from "react-router-dom";
import { callCarregarCategorias, callCriarPostagem } from "../actions";
import { connect } from "react-redux";
import { Button, Form } from "semantic-ui-react";

class CriarPostagem extends Component {
  componentDidMount() {
    this.props.callCarregarCategorias();
  }

  handleCriarPostagem = e => {
    e.preventDefault();

    let postagem = {
      id: Date.now(),
      timestamp: Date.now(),
      author: this.state.author,
      body: this.state.body,
      title: this.state.title,
      category: this.state.category
    };

    this.props.callCriarPostagem(postagem);

    this.props.history.push("/");
  };

  render() {
    let categorias = this.props.categorias.categorias;

    const getCategories = categorias =>
      categorias
        ? categorias.map(({ name }) => ({ key: name, value: name, text: name }))
        : [];

    return (
      <main>
        <Form onSubmit={this.handleCriarPostagem}>
          <h3 style={{ textAlign: "center" }}>Criar uma nova postagem</h3>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              required
              label="Titulo"
              placeholder="Titulo"
              onChange={(e, obj) => this.setState({ title: obj.value })}
            />
            <Form.Input
              fluid
              label="Autor"
              placeholder="Autor"
              name="author"
              required
              onChange={(e, obj) => this.setState({ author: obj.value })}
            />
            <Form.Select
              fluid
              selection
              label="Categoria"
              placeholder="Categoria"
              options={getCategories(categorias)}
              onChange={(e, obj) => this.setState({ category: obj.value })}
            />
          </Form.Group>
          <Form.TextArea
            name="body"
            required
            label="Mensagem"
            placeholder="Digite sua postagem......"
            onChange={(e, obj) => this.setState({ body: obj.value })}
          />
          <Form.Group>
            <Button type="submit">Criar</Button>
          </Form.Group>
        </Form>
        <Button>
          <Link to="/">Voltar</Link>
        </Button>
      </main>
    );
  }
}

const mapStateToProps = ({ categorias }) => ({
  categorias
});

export default connect(mapStateToProps, {
  callCarregarCategorias,
  callCriarPostagem
})(CriarPostagem);
