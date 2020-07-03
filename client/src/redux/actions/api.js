import API from "../../util/API";

export const PesquisarLivros = query => API.get(`books?q=${query}`);
export const BuscarFavoritos = () => API.get(`favorited`);
export const AtualizarFavorito = favorited => API.post(`favorited`,favorited);
