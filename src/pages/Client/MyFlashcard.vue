<template>
  <b-container>
    <div class="row">
      <el-page-header
        class="m-2 mb-4 col-md-10"
        @back="goBack"
        content="Flash Card "
      ></el-page-header>
      <div class="col-md-1">
        <b-button @click="reset"
          ><b-icon icon="arrow-counterclockwise"></b-icon
        ></b-button>
      </div>
    </div>
    <b-card no-body class="col-md-6 mx-auto">
      <b-carousel
        id="carousel-1"
        v-model="slide"
        controls
        :interval="0"
        background="#ababab"
        img-width="1024"
        img-height="480"
        style="text-shadow: 1px 1px 2px #333"
        @sliding-start="onSlideStart"
        @sliding-end="onSlideEnd"
      >
        <b-carousel-slide v-for="data in myFlashcard" :key="data.id">
          <template #img>
            <vue-flashcard :front="data.front" :back="data.back">
            </vue-flashcard>
          </template>
        </b-carousel-slide>
        <!-- Slide with blank fluid image to maintain slide aspect ratio -->
      </b-carousel>
    </b-card>
  </b-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import vueFlashcard from "vue-flashcard";
export default {
  components: { vueFlashcard },
  data() {
    return { slide: 0, sliding: null };
  },
  created() {
    this.getFlashcardData(this.$route.params.my_flashcard_id);
  },
  computed: {
    ...mapGetters({
      myFlashcard: "myFlashcard/myFlashcard",
    }),
  },
  methods: {
    ...mapActions("myFlashcard", ["getFlashcardData"]),
    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    },
    goBack() {
      this.$router.back();
    },
    reset() {
      this.getFlashcardData(this.$route.params.my_flashcard_id);
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