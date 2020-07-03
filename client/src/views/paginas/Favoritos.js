import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from "react-redux";
import { Container, makeStyles, GridList } from '@material-ui/core';
import { handleBuscarFavoritos } from '../../redux/actions/AuthActions';
import BookGridTile from '../../components/BookGridTile';

import { red } from '@material-ui/core/colors';
const useStyles = makeStyles((theme) => ({
    pesquisarRoot: {
        margin: '2px 4px',
        display: 'flex',
        flexDirection: 'column',
        height: "100%",
        width: "100%",

    },
    paper: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        height: '3em',
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
    wrapper: {
        flex: 1,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
        margin: 10,
    },
    gridList: {
        width: '100%',
        height: '100%',
    },
    imgFullHeight: {
        top: '50%',
        width: '50%',
        position: 'relative',
        transform: 'translateY(-50%)'

    },
    cardroot: {
        maxWidth: 345,
        margin: 10
    },
    media: {
        paddingTop: '100%', // 16:9
        height: '128px'
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    favOnList: {
        color: red[500],
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

const Favoritos = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const favoritos = useSelector(state => (state.auth.favoritos));
    const [favoriteIds, setFavoriteIds] = useState([]);
    const [expanded, setExpanded] = useState([]);

    const handleExpandClick = volumeid => {
        if (expanded.includes(volumeid)) {
            setExpanded(expanded.filter(e => e !== volumeid))
        } else {
            setExpanded(expanded.concat([volumeid]));
        }

    };
    useEffect(() => {
        dispatch(handleBuscarFavoritos());
    }, [dispatch])

    useEffect(() => {
        setFavoriteIds(favoritos.map(x => x.id));
    }, [favoritos]);

    return (
        <Container className={classes.pesquisarRoot} maxWidth={false}>            
            <div className={classes.wrapper}>
                <GridList className={classes.gridList} cols={5}>
                    {favoritos.map((fore, key) => BookGridTile({
                        fore: {
                            id: fore.id,
                            eTag: fore.eTag,
                            kind: fore.kind,
                            volumeInfo: {
                                title: fore.title,
                                authors: [fore.authors],
                                imageLinks: {
                                    thumbnail: fore.thumbnail
                                }
                            }
                        }, key, favoriteIds, classes, handleExpandClick, expanded ,dispatch
                    }))}
                </GridList>
            </div>
        </Container>)
}

export default Favoritos;
