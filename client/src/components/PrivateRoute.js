import React from "react";
import { connect } from 'react-redux'

import {
  Route,
  Redirect
} from "react-router-dom";
/* Actions */

const PrivateRoute = ({ component: Component, usuario, onLoad, ...rest }) => {

  
  return (
    <Route
      {...rest}
      render={
        props => {
          return (usuario != null) || props.location.pathname === '/login' ?
             <Component {...props} /> 
            : (
              <Redirect
                to={{
                  pathname: "/login",
                  state: { from: props.location }
                }}
              />
            )
        }
      }
    />
  );
}

const mapDispatchToProps = (dispatch, ownProps) => ({
 
});
const mapStateToProps = state => ({
  usuario: state.auth.usuario,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrivateRoute)
