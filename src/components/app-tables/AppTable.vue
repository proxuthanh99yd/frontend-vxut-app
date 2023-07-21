<template>
  <div class="app-table">
    AppTable
    <b-table striped hover :fields="fields" :items="tableItem">
      <template v-slot:cell(actions)="data">
        <b-button @click="onUpdate(data.item)" class="mr-3" variant="success"
          ><BIconPencilSquare
        /></b-button>
        <b-button @click="ondelete(data.item)" variant="danger"
          ><BIconTrash
        /></b-button>
      </template>
    </b-table>
  </div>
</template> 
<script>
import { BIconTrash, BIconPencilSquare } from "bootstrap-vue";
export default {
  name: "AppTable",
  props: {
    tableItem: {
      type: Array,
    },
    fields: {
      type: Array,
    },
  },
  components: {
    BIconTrash,
    BIconPencilSquare,
  },
  data() {
    return {};
  },
  methods: {
    ondelete(data) {
      this.$emit("on:DeleteTest", data.id);
    },
    onUpdate(data) {
      this.$emit("on:UpdateTest", data.id);
    },
  },
};
</script>
<style lang="scss">
</style>