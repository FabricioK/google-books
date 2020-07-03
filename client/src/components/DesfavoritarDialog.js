
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { Dialog, DialogTitle, DialogContentText, DialogContent, DialogActions, Button } from '@material-ui/core';
import { handleAtualizarFavorito } from '../redux/actions/AuthActions';
const DesfavoritarDialog = () => {
    const dispatch = useDispatch();
    const desfavoritando = useSelector(state => (state.auth.desfavoritando));
    const [open, setOpen] = useState(false);


    useEffect(() => {
        setOpen(desfavoritando);
    }, [desfavoritando]);

    const handleClose = () => {
        setOpen(false);
    };
    if (desfavoritando == null) return <></>;

    return <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        <DialogTitle id="alert-dialog-title">Atenção!!!</DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description"  color="primary">
                Você tem certeza de que gostaria de desfavoritar o livro {desfavoritando.title}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} color="primary">
                Não
          </Button>
            <Button onClick={() => dispatch(handleAtualizarFavorito(desfavoritando))} color="primary" autoFocus>
                Sim
          </Button>
        </DialogActions>
    </Dialog>

}

export default DesfavoritarDialog;