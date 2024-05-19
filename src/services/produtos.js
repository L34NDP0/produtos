import { http } from "./config";

export default {
  listar: () => {
    return http.get("produtos");
  },

  salvar: (produto) => {
    return http.post("produtos", produto);
  },

  atualizar: (produto) => {
    const { id_produto } = produto;
    return http.put(`produtos/${id_produto}`, produto);
  },

  apagar: (id_produto) => {
    return http.delete(`produtos/${id_produto}`);
  },
};
