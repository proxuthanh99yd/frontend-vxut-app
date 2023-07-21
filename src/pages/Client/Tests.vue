<template>
  <b-container>
    <el-page-header
      class="m-2 mb-4 col-md-10"
      @back="goBack"
      content="Test"
    ></el-page-header>
    <b-overlay :show="true" no-wrap v-if="!testDataClient"></b-overlay>
    <b-skeleton-img
      v-if="!testDataClient"
      animation="wave"
      no-aspect
      height="434px"
    ></b-skeleton-img>
    <b-card no-body>
      <b-tabs pills card vertical>
        <b-tab
          v-for="value in testDataClient"
          :key="value.id"
          :title="value.name"
        >
          <b-card-text v-for="test in value.test" :key="test.id">
            <router-link
              :to="{ name: 'ClientTest', params: { test_id: test.id } }"
              >{{ test.name }}</router-link
            >
          </b-card-text>
        </b-tab>
      </b-tabs>
    </b-card>
  </b-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  created() {
    this.getTestDataClient();
  },
  computed: {
    ...mapGetters({
      testDataClient: "clientTest/testClient",
    }),
  },
  methods: {
    ...mapActions("clientTest", ["getTestDataClient"]),
    goBack() {
      this.$router.back();
    },
  },
};
</script>

<style scoped>
.disabled {
  opacity: 0.5;
  pointer-events: none;
}
</style>