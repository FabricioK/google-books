import { PESQUISAR_LIVROS } from "../actions/AuthActions";

let initialState = {
    pesquisa: [],
};

export default function BooksReducer(state = initialState, action) {
    switch (action.type) {
        case PESQUISAR_LIVROS :
            return {
                ...state,
                pesquisa: action.payload,
              };
              
        default:
            return state;
    }
}