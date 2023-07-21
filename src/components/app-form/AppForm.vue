<template>
  <div class="app-form">
    <form ref="form" @submit.stop.prevent="handleSubmit" @ok="handleOk">
    <b-form-input
      v-model="form.name"
      placeholder="Enter ..."
      class="mb-3"
    ></b-form-input>
    <b-form-select v-model="form.selected" :options="form.level" class="mb-3"></b-form-select>
     </form>
  </div>
</template>
<script>
export default {
  name: "AppForm",
  data() {
    return {
      form: {
        name: "",
        selected:null,
        level: [
            { value: null, text: "Please select an option" },
            { value: 2, text: "N5" },
            { value: 3, text: "N4" },
            { value: 4, text: "N3" },
            { value: 5, text: "N2" }
        ],
      },
    };
  },
  methods:{
    handleOk() {
      console.log(2123)
      // Trigger submit handler
      this.$emit("on:handleSubmit",this.form);
    },
    handleSubmit() {
      // Push the name to submitted names
      this.$emit("on:handleSubmit",this.form);
    },
  }


};
</script>
<style lang="scss">
</style>