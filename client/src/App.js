import React, { } from 'react';

import { BrowserRouter as Router, Switch } from "react-router-dom";

import Login from "./views/paginas/Login";
import PrivateRoute from './components/PrivateRoute';

import { makeStyles } from '@material-ui/core';
import MainContent from './views/container';


const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
    background: '#f2f2f2',
    fontFamily: 'Roboto'
  }
}));



const App = () => {
  const classes = useStyles();

  const loading = () => {
    return <div> Carregando </div>;
  };

  return (<div className={classes.root}>
    <Router>
      <React.Suspense fallback={loading()}>
        <Switch>
          <PrivateRoute exact path="/login" name="Login" component={Login} />
          <PrivateRoute path="/" name="Main" component={MainContent} />
        </Switch>
      </React.Suspense>
    </Router>
  </div>
  );
}

export default App;
