<template>
  <b-container>
    <el-page-header
      class="m-2 mb-4 col-md-10"
      @back="goBack"
      content="My Flash Card "
    ></el-page-header>
    <b-card no-body>
      <b-list-group>
        <b-list-group-item
          v-for="value in myFlashcard"
          :key="value.id"
          :title="value.name"
          ><router-link
            :to="{ name: 'MyFlashcard', params: { my_flashcard_id: value.id } }"
            >{{ value.name }}</router-link
          ></b-list-group-item
        >
      </b-list-group>
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
    this.getFlashcardsData();
  },
  computed: {
    ...mapGetters({
      myFlashcard: "myFlashcard/myFlashcard",
    }),
  },
  methods: {
    ...mapActions("myFlashcard", ["getFlashcardsData"]),
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