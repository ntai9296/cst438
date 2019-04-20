import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import InventoryPage from '../pages/InventoryPage';

class Main extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/" exact component={HomePage} />
          <Route path="/hey" exact component={InventoryPage} />
        </div>
      </Router>
    );
  }
}

export default Main;
