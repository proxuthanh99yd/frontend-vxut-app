<template>
  <div class="app-dashboard-actop">
    <div class="app-dashboard-actop__search">
      <b-form-input
        @keyup="onSearch"
        placeholder="Enter your name"
      ></b-form-input>
    </div>
    <div class="app-dashboard-actop__sort">
      <b-form-select
        @change="onSort"
        v-model="selected"
        :options="options"
      ></b-form-select>
    </div>
    <div class="app-dashboard-actop__button">
      <b-button @click="onCreateTest" variant="success">Button</b-button>
    </div>
  </div>
</template>
<script>
export default {
  name: "DashboardAcTop",
  data() {
    return {
      selected: null,
      options: [
        { value: null, text: "Please select an option" },
        { value: "a", text: "This is First option" },
        { value: "b", text: "Selected Option" },
        { value: { C: "3PO" }, text: "This is an option with object value" },
        { value: "d", text: "This one is disabled", disabled: true },
      ],
    };
  },
  methods: {
    onSearch() {},
    onSort() {},
    onCreateTest() {
      this.$emit("on:CreateTest");
    },
  },
};
</script>
<style lang="scss">
.app-dashboard-actop {
  color: black;
  display: flex;
  justify-content: space-between;
  &__search {
    width: 35%;
  }
  &__sort {
    width: 35%;
  }
}
</style>