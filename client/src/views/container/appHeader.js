import React, { } from 'react';
import { AppBar, Toolbar, Typography, Button, Avatar } from '@material-ui/core';
import {  NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { handleLogout } from '../../redux/actions/AuthActions';
import { useLocation } from 'react-router-dom';
import routes from '../routes';
import blue from '@material-ui/core/colors/blue';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: blue[500],
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    spacer: {
        flexGrow: 1,
    },
    displayName: {
        marginRight: theme.spacing(2),
    },
    navLink: {
        color: 'white',
        textDecoration: 'none',
        cursor: 'pointer',
        '&:visited': {
            textDecoration: 'none',
            cursor: 'pointer'
        }
    },
    menu: {
        marginRight: theme.spacing(2),
        borderWidth: '0 0 2px 0',
        borderStyle: ' ',
    },
    selectedMenu: {
        marginRight: theme.spacing(2),
        borderWidth: '0 0 2px 0',
        borderStyle: ' solid',
        borderColor: 'white'
    },
}));

const DefaultHeader = () => {

    const dispatch = useDispatch();
    let location = useLocation();
    const classes = useStyles();
    const usuario = useSelector(state => (state.auth.usuario));
    return <AppBar className={classes.root} position="static">
        <Toolbar>
            {
                routes.map((route, idx) => {
                    return (
                        <Typography key={idx} className={route.path === location.pathname ? classes.selectedMenu : classes.menu}>
                            <NavLink className={classes.navLink}
                                exact
                                to={`${route.path}`}
                            >{route.name}</NavLink>
                        </Typography>)
                })
            }

            <Typography className={classes.spacer}>
            </Typography>
            <Typography className={classes.displayName}>
               Bem vindo, {usuario.displayName}!
            </Typography>
            <Avatar src={usuario.displayPicture}></Avatar>
            <Button color="inherit" onClick={() => dispatch(handleLogout())}>Sair</Button>
        </Toolbar>
    </AppBar>
}
export default DefaultHeader;