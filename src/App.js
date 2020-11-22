import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout'
import Orders from './containers/Orders/Orders'
import Auth from './containers/Auth/Auth'
import Logout from './containers/Auth/Logout/Logout'
import * as actions from './store/actions/index'
class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignUp();
  }
  render() {
    let routes = (<Switch>
      <Route path="/Auth" exact component={Auth} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>);
    if (this.props.isAuthenticated) {
      routes = (<Switch>
        <Route path="/Checkout" component={Checkout} />
        <Route path="/Orders" component={Orders} />
        <Route path="/Auth" exact component={Auth} />
        <Route path="/logout" exact component={Logout} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>);
    }
    return (
      <div className="App">
        <Layout>
          {routes}
          {/* <BurgerBuilder/> */}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
};
const mapDispathToProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispathToProps)(App));
