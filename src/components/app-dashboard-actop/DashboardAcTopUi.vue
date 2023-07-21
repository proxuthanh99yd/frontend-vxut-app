<template>
  <div id="dashboard-actop">
    <el-row :gutter="10" class="dashboard-actop__row">
      <el-col :md="5"
        ><el-page-header @back="goBack" :content="detail"> </el-page-header
      ></el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    detail: String,
  },
  data() {
    return {
      input3: "",
    };
  },
  methods: {
    goBack() {
      this.$router.back();
    },
  },
};
</script>

<style lang="scss" scoped>
#dashboard-actop {
  color: black;
  &__row {
    justify-content: space-between;
  }
}
</style>