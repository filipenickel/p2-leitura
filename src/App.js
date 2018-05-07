import React, { Component } from "react";

import Router from "./Router";
import View from "./component/View";
import * as api from './utils/api'

class App extends Component {
  state = {
    post: []
  };

  componentDidMount() {
    api.getAll().then(post => {
      this.setState({ post });
    });
  }
  render() {
    
    return (
      <div>
        <Router />
        <View post={this.state.post} />
      </div>
    )
  }
}

export default App;