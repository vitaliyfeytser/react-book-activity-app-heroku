import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Books from './pages/Books';
import Nav from './components/Nav';
import Detail from './pages/Detail';

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={Books} />
          <Route exact path="/books" component={Books} />
          <Route exact path="/books/:id" component={Detail} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;