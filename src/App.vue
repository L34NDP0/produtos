<template>
  <div id="app">
    <Navbar />
    <Table :data="produtos" :fields="fields" @atualizar="atualizar" @salvar="salvar" @excluir="excluir" />
    <Modal ref="modal" title="Adicionar" :showModal="showModal" />
  </div>
</template>

<script>
import Produtos from "./services/produtos";
import Navbar from "./components/Navbar.vue"; // Componente de Navbar
import Table from "./components/Table.vue"; // Componente de Navbar
import Modal from "./components/Modal.vue"; // Componente de Navbar

export default {
  components: {
    Navbar,
    Table,
    Modal
  },
  data() {
    return {
      produto: {
        id_produto: "",
        nome_produto: "",
        marca_produto: "",
        valor_produto: "",
        validade_produto: "",
      },
      produtos: [],
      fields: [
        {
          key: "id_produto",
        },
        {
          key: "nome_produto",
        },
        {
          key: "marca_produto",
        },
        {
          key: "valor_produto",
          formatter: value => {
            return `R$ ${value.toFixed(2)}`;
          }
        },
        {
          key: "validade_produto",
        },
        {
          key: "acoes",
          label: "Ações",
        },
      ],
      showModal: false,
    };
  },

  mounted() {
    this.listar();
  },

  methods: {
    listar() {
      Produtos.listar().then((resposta) => {
        const { data } = resposta.data;
        this.produtos = data;
      }).catch((error) => {
        alert("Erro ao listar produtos: " + error);
      });
    },

    async salvar(dados) {
      try {
        const { nome_produto, marca_produto, valor_produto, validade_produto } = dados;
        if (!nome_produto || !marca_produto || !valor_produto || !validade_produto) {
          alert("Por favor, preencha todos os campos antes de adicionar.");
          return;
        }
        await Produtos.salvar(dados);
        alert("Adicionado com sucesso.");
      } catch (error) {
        alert("Erro ao adicionar.");
      } finally {
        this.listar();
      }
    },

    async atualizar(dados) {
      try {
        const { id_produto, nome_produto, marca_produto, valor_produto, validade_produto } = dados;
        if (!id_produto || !nome_produto || !marca_produto || !valor_produto || !validade_produto) {
          alert("Por favor, preencha todos os campos antes de atualizar.");
          return;
        }
        await Produtos.atualizar(dados);
        alert("Atualizado com sucesso.");
      } catch (error) {
        alert("Erro ao atualizar.");
      } finally {
        this.listar();
      }
    },

    async excluir(id_produto) {
      const confirmacao = confirm("Tem certeza que deseja excluir este produto?");
      if (confirmacao) {
        try {
          await Produtos.apagar(id_produto);
          alert("Excluído com sucesso!");
        } catch (error) {
          alert("Erro ao excluir. Por favor, tente novamente.");
        } finally {
          this.listar();
        }
      } else {
        alert("Exclusão cancelada.");
      }
    },
  }
};
</script>