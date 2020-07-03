import React from 'react';

import { GoogleLogin } from 'react-google-login';
import { useDispatch, useSelector } from "react-redux";
import { handleAutenticar } from '../../redux/actions/AuthActions';
import { Redirect } from 'react-router-dom';
import { Container, makeStyles, Card, CardContent, CardActions } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh'
    },
    center: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column'
    }
}));

const Login = () => {
    const dispatch = useDispatch();

    const usuario = useSelector(state => (state.auth.usuario));
    const classes = useStyles();
    const onFailure = (error) => {
        console.log(error);
    };

    const googleResponse = (response) => {
        const token = new Blob([JSON.stringify({ tokenId: response.tokenId }, null, 2)], { type: 'application/json' });
        const options = {
            method: 'POST',
            body: token,
            mode: 'cors',
            cache: 'default'
        };
        fetch(process.env.REACT_APP_GOOGLE_AUTH_CALLBACK_URL, options)
            .then(r => {
                r.json().then(user => {
                    const token = user.token;
                    dispatch(handleAutenticar(token, user));
                });
            })
    };

    if (usuario != null)
        return <Redirect to={{ pathname: '/' }} />;

    return (
        <Container className={classes.root}>
            <Card>
                <CardContent className={classes.center}>
                    <h2 >Biblioteca Virtual</h2>
                    <h3 >com Google Book</h3>
                    <GoogleLogin
                        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                        buttonText="Entrar com Google"
                        onSuccess={googleResponse}
                        onFailure={onFailure}
                        scope={"profile email https://www.googleapis.com/auth/books"}
                        cookiePolicy={'single_host_origin'} />
                </CardContent>
                <CardActions>
                </CardActions>
            </Card>
        </Container>
    )
}


export default Login;
