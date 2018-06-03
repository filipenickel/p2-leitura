import React, { Component } from "react";
import "./index.css";
import { Route, Switch,browserHistory,Router } from "react-router-dom";
import CategoriasList from "./component/CategoriasList";
import PostsTable from "./component/PostsTable";
import CriarPostagem from "./component/CriarPostagem";
import EditarPostagem from "./component/EditarPostagem";
import EditarComentario from "./component/EditarComentario";
import Post from "./component/Post";
import Erro from "./component/Erro";

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <header>
          <h1 style={{ textAlign: "center" }}>Comentarios</h1>
        </header>
        <main>
          <CategoriasList />
          
          <Switch>
            <Route exact path="/" render={props => <PostsTable {...props} />} />
            <Route
              exact
              path="/:categoria"
              render={props => <PostsTable {...props}
               />
            }
            />
            <Route exact path="/postagens/criar" component={CriarPostagem} />
            <Route exact path="/:categoria/:id" component={Post} />
            <Route
              exact
              path="/postagens/:id/editar"
              component={EditarPostagem}
            />
            <Route
              exact
              path="/comentarios/:id/editar"
              component={EditarComentario}
            />
            <Route path='*' component={Erro} />
            
          </Switch> 
          
        </main>
      </div>
    );
  }
}

export default App;
