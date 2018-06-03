import React, { Component } from "react";
import { Link } from "react-router-dom";
import { capitalize } from "../utils/helpers";
import { callCarregarCategorias, selecionarCategoria } from "../actions";
import { connect } from "react-redux";
import { Menu } from "semantic-ui-react";

class CategoriasList extends Component {
  componentDidMount() {
    this.props.callCarregarCategorias();
  }
  handleSelecionarCategoria = e => {
    e.preventDefault();

    let categoria = e.target.attributes.getNamedItem("categoria").value;

    this.props.selecionarCategoria(categoria);

    window.location = "/" + categoria;
  };

  render() {
    let categorias = this.props.categorias.categorias;

    return (
      <section className="categorias-wrapper">
        <Menu>
          <Menu.Item>
            <h3>Categorias</h3>
          </Menu.Item>

          <Menu.Item>
            <Link to="/">Todas</Link>
          </Menu.Item>
          {categorias !== undefined &&
            categorias.map(categoria => (
              <Menu.Item key={categoria.name}>
                <Link to={`/${categoria.path}`}>
                  {capitalize(categoria.name)}
                </Link>
              </Menu.Item>
            ))}
        </Menu>
      </section>
    );
  }
}

const mapStateToProps = ({ categoria, categorias }) => ({
  categoria,
  categorias
});

export default connect(mapStateToProps, {
  callCarregarCategorias,
  selecionarCategoria
})(CategoriasList);
