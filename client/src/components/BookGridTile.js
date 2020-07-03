import React, { } from 'react';
import clsx from 'clsx';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import {
    IconButton,
    GridListTile,
    Card,
    CardHeader,
    Collapse,
    CardMedia,
    CardContent,
    Typography,
    CardActions,
} from '@material-ui/core';

import { handleAtualizarFavorito, handleDesfavoritar } from '../redux/actions/AuthActions';


const BookGridTile = ({ fore, key, favoriteIds, classes, handleExpandClick, expanded ,dispatch}) => {
    const { id, volumeInfo, eTag, kind } = fore;
    const { imageLinks } = volumeInfo;

    const BookGridCard = (volumeid, volumeInfo, imageLinks, kind, eTag) => {
        return <Card className={classes.cardroot}>
            {imageLinks != null ?
                <CardMedia
                    className={classes.media}
                    image={imageLinks.thumbnail}
                    title={volumeInfo.title}
                />
                : null
            }

            <CardContent>

            </CardContent>
            <CardActions disableSpacing>
                <IconButton
                    className={clsx({
                        [classes.favOnList]: favoriteIds.includes(volumeid),
                    })}
                    aria-label="add to favorites"
                    onClick={() => {
                        const favorited = {
                            id: volumeid,
                            title: volumeInfo.title,
                            thumbnail: imageLinks != null ? imageLinks.thumbnail : null,
                            authors: volumeInfo.authors != null ? volumeInfo.authors.join(', ') : 'Desconhecido',
                            eTag,
                            kind,
                        };
                        favoriteIds.includes(volumeid) ?
                            dispatch(handleDesfavoritar(favorited)) :
                            dispatch(handleAtualizarFavorito(favorited))

                    }}>
                    <FavoriteIcon />
                </IconButton>
                {volumeInfo.description != null ? <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded.includes(volumeid),
                    })}
                    onClick={() => handleExpandClick(volumeid)}
                    aria-expanded={expanded.includes(volumeid)}
                    aria-label="mostrar resumo"
                >
                    <ExpandMoreIcon />
                </IconButton> : null}
            </CardActions>
            <CardHeader
                title={volumeInfo.title}
                subheader={`por:  ${volumeInfo.authors != null ? volumeInfo.authors.join(', ') : 'Desconhecido'}`}
            />
            <Collapse in={expanded.includes(volumeid)} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>Resumo:</Typography>
                    <Typography paragraph>
                        {volumeInfo.description}
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    }

    return <GridListTile className={classes.gridListTile} key={key} cols={1} style={{ height: 'auto' }} >
        {BookGridCard(id, volumeInfo, imageLinks, eTag, kind)}
    </GridListTile>
}




export default BookGridTile;