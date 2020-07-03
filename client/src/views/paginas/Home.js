import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import SearchIcon from '@material-ui/icons/Search';

import {
    Container,
    InputBase, IconButton,
    makeStyles,
    Paper,
    GridList
} from '@material-ui/core';

import { red } from '@material-ui/core/colors';
import { handlePesquisarLivros, handleBuscarFavoritos } from '../../redux/actions/AuthActions';
import BookGridTile from '../../components/BookGridTile';

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

function Home() {
    const classes = useStyles();
    const dispatch = useDispatch();

    const favoritos = useSelector(state => (state.auth.favoritos));
    const pesquisa = useSelector(state => (state.books.pesquisa));
    const [favoriteIds, setFavoriteIds] = useState([]);
    const [query, setQuery] = useState("");

    const [expanded, setExpanded] = useState([]);

    
    useEffect(() => {
        setFavoriteIds(favoritos.map(x => x.id));
    }, [favoritos]);


    useEffect(() => {
        dispatch(handleBuscarFavoritos());
    }, [dispatch])


    const handleExpandClick = volumeid => {
        if (expanded.includes(volumeid)) {
            setExpanded(expanded.filter(e => e !== volumeid))
        } else {
            setExpanded(expanded.concat([volumeid]));
        }

    };
    return (
        <Container className={classes.pesquisarRoot} maxWidth={false}>
            <Paper className={classes.paper} component="form" onSubmit={(e) => {
                e.preventDefault();
                dispatch(handlePesquisarLivros(query))
            }}>

                <InputBase
                    className={classes.input}
                    placeholder="Buscar livros"
                    inputProps={{ 'aria-label': 'pesquisar livros no google books' }}
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                />
                <IconButton type="submit" className={classes.iconButton} aria-label="search">
                    <SearchIcon />
                </IconButton>
            </Paper>
            <div className={classes.wrapper}>
                <GridList className={classes.gridList} cols={5}>
                    {pesquisa.map((fore, key) => BookGridTile({ fore, key, favoriteIds, classes, handleExpandClick, expanded  ,dispatch}))}
                </GridList>
            </div>
        </Container>)
}

export default Home;
