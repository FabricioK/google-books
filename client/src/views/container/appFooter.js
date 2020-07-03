import React, { } from 'react';
import { makeStyles, AppBar } from '@material-ui/core';
import blue from '@material-ui/core/colors/blue';

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        flexDirection: "columns",
        padding: 10,
        color: blue[50],
        backgroundColor: blue[300]
    },
}));


const DefaultFooter = () => {
    const classes = useStyles();
    return <div className={classes.root} color="primary">
        {"Feito com ReactJS, Dotnet core e <3"}
    </div>
}

export default DefaultFooter;