<template>
  <div class="app-modal">
    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Submit Your Name"
      @show="resetModal"
      @ok="handleSubmit"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group label="Name">
          <b-form-input v-model="form.name"></b-form-input>
        </b-form-group>
        <div>{{ modalItem }}</div>
        <b-form-group label="Level">
          <b-form-select v-model="form.level_id" :options="options">
          </b-form-select>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>
<script>
export default {
  name: "AppModal",

  props: {
    centered: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: () => "md",
    },
  },
  data() {
    return {
      form: {
        name: "",
        level_id: null,
      },
      options: [
        { value: null, text: "Please select Level" },
        { value: 2, text: "N5" },
        { value: 3, text: "N4" },
        { value: 4, text: "N3" },
        { value: 5, text: "N2" },
      ],
    };
  },
  methods: {
    showModal() {
      this.$refs["modal"].show();
    },
    hidenModal() {
      this.$refs["modal"].hide();
    },
    resetModal() {
      this.form.name = "";
      this.form.level_id = null;
    },
    handleSubmit() {
      // Push the name to submitted names
      this.$emit("on:Submit", this.form);
      // Hide the modal manually
    },
  },
};
</script>
<style lang="scss" scoped>
</style>