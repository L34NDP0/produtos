<template>
  <div>
    <b-modal v-model="showModal" id="modal-1" :title="title" @ok="submit()">
      <b-form @submit.prevent="submit">
        <b-form-group label="Nome">
          <b-input type="text" name="nome" v-model="itemSelecionado.nome_produto" />
        </b-form-group>
        <b-form-group label="Marca">
          <b-input type="text" name="marca" v-model="itemSelecionado.marca_produto" />
        </b-form-group>
        <b-form-group label="Valor">
          <b-input type="text" name="valor" v-model="itemSelecionado.valor_produto" />
        </b-form-group>
        <b-form-group label="Validade">
          <b-input type="text" name="validade" v-model="itemSelecionado.validade_produto" />
        </b-form-group>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import { cloneDeep, isEmpty } from "lodash";
export default {
  name: 'ModalComponent',
  props: {
    title: String
  },
  data() {
    return {
      showModal: false,
      itemSelecionado: {
        nome_produto: null,
        marca_produto: null,
        valor_produto: null,
        validade_produto: null
      }
    };
  },
  methods: {
    mostrarModal(data = {}) {
      if (!isEmpty(data)) {
        data = {
          ...data,
          valor_produto: data.valor_produto.toFixed(2)
        }
      }
      this.itemSelecionado = cloneDeep(data);
      this.showModal = true;
    },
    submit() {
      const { id_produto } = this.itemSelecionado;
      // Emit chama funções do filho para o pai
      if (id_produto) this.$emit('atualizar', this.itemSelecionado);
      else this.$emit('salvar', this.itemSelecionado);
    }
  },
};
</script>