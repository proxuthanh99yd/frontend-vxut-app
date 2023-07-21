<template>
  <div id="test">
    <div class="container">
      <el-page-header
        class="m-2 mb-4 col-md-10"
        @back="goBack"
        content="Test"
      ></el-page-header>
    </div>
    <exam-block></exam-block>
  </div>
</template>

<script>
import ExamBlock from "../../components/ExamBlock.vue";
import ExamQuestion from "../../components/ExamQuestion.vue";

export default {
  components: {
    ExamBlock,
  },
  methods: {
    goBack() {
      this.$router.back();
    },
  },
};
</script>

<style>
</style>