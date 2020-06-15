import React from 'react';
import classes from './App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Layout from './components/Layout/Layout';
import Login from './containers/Login/Login';
import Signup from './containers/Signup/Signup';
import Cart from './containers/Cart/Cart';
import Orders from './containers/Orders/Orders';
import Products from './containers/Products/Products';
import Profile from './containers/Profile/Profile';
import Logout from './containers/Logout/Logout'
import Checkout from './containers/Checkout/Checkout';

function App() {
  return (

    <BrowserRouter>
      <div className={classes.App}>
      <Route path='/' component={Layout} />
        <Switch>
          <Route path='/products' component={Products} />
          <Route path='/login' component={Login} />
          <Route path='/signup' component={Signup} />
          <Route path='/orders' component={Orders} />
          <Route path='/cart' component={Cart} />
          <Route path='/profile' component={Profile} />
          <Route path='/logout'  component={Logout} />
          <Route path='/checkout'  component={Checkout} />
          <Redirect to='/products'/>
        </Switch>

      </div>
    </BrowserRouter>

  );
}

export default App;
