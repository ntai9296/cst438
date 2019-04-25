import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import InventoryPage from '../pages/InventoryPage';
import rootReducer from '../reducers';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import ShopPage from '../pages/ShopPage';
import MyOrderPage from '../pages/MyOrderPage';
import ServicePage from '../pages/ServicePage';
import MyServicePage from '../pages/MyServicePage';

const store = createStore(rootReducer, applyMiddleware(thunk));

class Main extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Route path="/" exact component={HomePage} />
            <Route path="/shop" exact component={ShopPage} />
            <Route path="/services" exact component={ServicePage} />
            <Route path="/parts" exact component={InventoryPage} />
            <Route path="/myservices" exact component={MyServicePage} />
            <Route path="/orders" exact component={MyOrderPage} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default Main;
