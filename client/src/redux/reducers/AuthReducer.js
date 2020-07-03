import { setCookie, deleteCookie } from "@pagueveloz/cookies";
import { SET_USUARIO_AUTENTICACAO, LOGOUT_USUARIO, BUSCAR_FAVORITOS, DESFAVORITAR } from "../actions/AuthActions";

let initialState = {
    usuario: JSON.parse(localStorage.getItem("USUARIO")),
    favoritos: [],
    desfavoritando: null
};

export default function AuthReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USUARIO_AUTENTICACAO:
            setCookie("TOKEN", action.payload.token);
            localStorage.setItem("USUARIO", JSON.stringify(action.payload.user));
            return {
                ...state,
                refreshToken: action.payload.token,
                usuario: action.payload.user,
            };
        case LOGOUT_USUARIO:
            deleteCookie("TOKEN");
            localStorage.setItem("USUARIO", null);
            return {
                ...state,
                usuario: null,
            };
        case BUSCAR_FAVORITOS:
            return {
                ...state,
                favoritos: action.payload,
                desfavoritando: null
            };
        case DESFAVORITAR: 
        return {
            ...state,
            desfavoritando: action.payload
        };
        default:
            return state;
    }
}