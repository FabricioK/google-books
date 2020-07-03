import React, { Suspense } from 'react';

import { Route, Switch } from "react-router-dom";
import { Container, makeStyles } from '@material-ui/core';
import routes from '../routes';
import DesfavoritarDialog from '../../components/DesfavoritarDialog';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '100%',
        margin: 0,
        padding: 20,
        overflow: 'hidden'
    },
}));

const DefaultContent = () => {

    const classes = useStyles();

    const loading = () => {
        return <div> Carregando </div>;
    };

    return <Container className={classes.root} maxWidth={false}>
        <DesfavoritarDialog />
        <Suspense fallback={loading()}>
            <Switch>
                {routes.map((route, idx) => {
                    return route.component ? (
                        <Route
                            key={idx}
                            path={route.path}
                            exact={route.exact}
                            name={route.name}
                            render={props => (
                                < >
                                    <route.component {...props} />
                                </>

                            )} />
                    ) : (null);
                })}
            </Switch>
        </Suspense>
    </Container>
}


export default DefaultContent;