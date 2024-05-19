<template>
    <div class="mx-5">
        <b-row>
            <b-col class="text-end">
                <b-button variant="primary" @click="adicionar()">ADICIONAR</b-button>
            </b-col>
        </b-row>
        <b-table striped hover :items="data" :fields="fields" responsive>
            <template #cell(acoes)="row">
                <b-button variant="warning" class="mr-3" @click="editar(row.item)">
                    <b-icon icon="pencil"></b-icon>
                </b-button>
                <b-button variant="danger" @click="excluir(row.item.id_produto)">
                    <b-icon icon="trash"></b-icon>
                </b-button>
            </template>
        </b-table>
        <Modal ref="modal" :title="title" :showModal="showModal" @atualizar="atualizar" @salvar="salvar" />
    </div>
</template>

<script>
import Modal from "./Modal.vue"; // Componente de Navbar
export default {
    components: {
        Modal,
    },
    name: 'TableComponent',
    props: {
        data: Array,
        fields: Array
    },
    data() {
        return {
            showModal: false,
            produto: {},
            title: null,
        }
    },
    methods: {
        atualizar(dados) {
            this.$emit('atualizar', dados);
        },
        salvar(dados) {
            this.$emit('salvar', dados);
        },
        editar(data) {
            // Por meio do Refs é possível chamar uma função do componente filho
            this.title = "Alterar";
            this.$refs.modal.mostrarModal(data);
        },
        adicionar() {
            this.title = "Adicionar";
            this.$refs.modal.mostrarModal();
        },
        excluir(id_produto) {
            // Por meio do Emit é possível chamar uma função do componente pai
            this.$emit('excluir', id_produto);
        }
    }
};
</script>

<style></style>