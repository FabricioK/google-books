import { PesquisarLivros, BuscarFavoritos, AtualizarFavorito } from "./api";

export const PESQUISAR_LIVROS = "PESQUISAR_LIVRO";
export const LOGOUT_USUARIO = "LOGOUT_USUARIO";
export const SET_USUARIO_AUTENTICACAO = "SET_USUARIO_AUTENTICACAO";
export const BUSCAR_FAVORITOS = "BUSCAR_FAVORITOS";
export const DESFAVORITAR = "DESFAVORITAR";


export const handleDesfavoritar = desfavoritando => {
    return dispatch => {
        dispatch({
            type: DESFAVORITAR,
            payload: desfavoritando
        });
    };
};

export const handleAutenticar = (token, user) => {
    return dispatch => {
        return dispatch({
            type: SET_USUARIO_AUTENTICACAO,
            payload: { token, user },
        });
    };
};

export const handleLogout = () => {
    return dispatch => {
        dispatch({
            type: LOGOUT_USUARIO
        });
    };
};

export const handlePesquisarLivros = (query) => {
    return dispatch => {
        return PesquisarLivros(query)
            .then(response => {
                dispatch({
                    type: PESQUISAR_LIVROS,
                    payload: response.data
                });
            })
            .catch(error => {
                dispatch({
                    type: "ERROR",
                    payload: error
                });
            });
    };
};

export const handleBuscarFavoritos = (query) => {
    return dispatch => {
        return BuscarFavoritos(query)
            .then(response => {
                dispatch({
                    type: BUSCAR_FAVORITOS,
                    payload: response.data
                });
            })
            .catch(error => {
                dispatch({
                    type: "ERROR",
                    payload: error
                });
            });
    };
};

export const handleAtualizarFavorito = (query) => {
    return dispatch => {
        return AtualizarFavorito(query)
            .then(response => {
                dispatch({
                    type: BUSCAR_FAVORITOS,
                    payload: response.data
                });
            })
            .catch(error => {
                dispatch({
                    type: "ERROR",
                    payload: error
                });
            });
    };
};
