
import React, { } from 'react';
import DefaultHeader from './appHeader';
import DefaultFooter from './appFooter';
import DefaultContent from './appContent';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100vh'
    },
    center: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column'
    }
}));


const MainContent = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <DefaultHeader />
            <DefaultContent />
            <DefaultFooter />
        </div>)

}

export default MainContent;