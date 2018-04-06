import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './Header';
import Home from './Home';
import Sobre from './Sobre';
import Contato from './Contato';
import Campanhas from './Campanhas';
import Admin from './Admin';
import Footer from './Footer';

class App extends Component {
  render() {
    return (
      <Router>
      <div>
        <Header />

        <Route exact path='/' component={Home} />
        <Route path='/sobre' component={Sobre} />
        <Route path='/campanhas' component={Campanhas} />
        <Route path='/contato' component={Contato} />
        <Route path='/admin' component={Admin} />

        <Footer />
      </div>
      </Router>
    );
  }
}

export default App;
