import React, { Component } from 'react'
import './index.css'
import { Route, Switch } from 'react-router-dom'
import { Link } from 'react-router-dom'
import CategoriasList from './component/CategoriasList'
import PostsTable from './component/PostsTable'
import CriarPostagem from './component/CriarPostagem'
import EditarPostagem from './component/EditarPostagem'
import EditarComentario from './component/EditarComentario'
import Post from './component/Post'


class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <h1 style={{textAlign: 'center'}}><Link to="/">Comentarios</Link></h1>
        </header>
        <Route exact path='/' render={(props) => (
          <main>
            <CategoriasList {...props}/>
            <PostsTable {...props}/>
          </main>
        )}/>
        <Switch>
          <Route exact path='/:categoria' render={(props) => (
            <main>
              <CategoriasList {...props}/>
              <PostsTable {...props}/>
            </main>
          )}/>
          <Route exact path='/postagens/criar' component={CriarPostagem}/>
          <Route exact path='/:categoria/:id' component={Post}/>
          <Route exact path='/postagens/:id/editar' component={EditarPostagem}/>
          <Route exact path='/comentarios/:id/editar' component={EditarComentario}/>
        </Switch>
      </div>
    );
  }
}

export default App;