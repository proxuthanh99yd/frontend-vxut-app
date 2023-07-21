<template>
  <div id="exam-question" v-if="contest_id != null">
    <div v-if="this.countdown == true" class="pr-5">
      <b-card-group>
        <b-card class="col-md-10"
          ><b-img
            :src="baseImg + 'reset.png'"
            fluid-grow
            alt="Fluid-grow image"
          ></b-img></b-card
      ></b-card-group>
    </div>
    <div v-else-if="this.result == true" class="pr-5">
      <!-- result{{ resultData }} -->
      <div class="p-2" v-if="resultData.listenPoint">
        <b-card-group>
          <b-card header="Kết quả" header-tag="header" title="Kết quả">
            <b-card-text class="text-success" v-if="resultData.grammarPoint"
              >Từ vựng : {{ resultData.vocabularyPoint }}/60
            </b-card-text>
            <b-card-text class="text-success" v-else
              >Từ vựng - Ngữ pháp - Đọc hiểu :
              {{ resultData.vocabularyPoint }}/120
            </b-card-text>
            <b-card-text class="text-success" v-if="resultData.grammarPoint"
              >Ngữ pháp - Đọc hiểu : {{ resultData.grammarPoint }}/60
            </b-card-text>
            <b-card-text class="text-success"
              >Nghe hiểu : {{ resultData.listenPoint }}/60</b-card-text
            >
            <b-button size="sm" @click="info" class="mr-1"> Xem lại </b-button>
          </b-card>
        </b-card-group>
      </div>
    </div>
    <div v-else-if="this.testing == true" class="pr-5">
      <b-card-group>
        <b-card
          bg-variant="light"
          header-bg-variant="light"
          :title="title"
          class="text-center"
        >
        </b-card>
      </b-card-group>
      <b-card
        v-for="(chapter, index) in testData"
        :key="index"
        bg-variant="light"
        header-bg-variant="light"
        :header="chapter.name"
      >
        <b-form-group
          v-for="(question, index) in chapter.question"
          :key="index"
        >
          <b-list-group>
            <b-list-group-item>
              <b-row>
                <b-col cols="1"
                  ><h5>{{ index + 1 }}</h5></b-col
                ><b-col cols="11"><h5 v-html="question.question"></h5></b-col>
              </b-row>
            </b-list-group-item>
          </b-list-group>
          <b-list-group v-if="question.photo">
            <b-list-group-item
              ><b-img
                :src="baseImg + question.photo"
                fluid-grow
                alt="Fluid-grow image"
              ></b-img
            ></b-list-group-item>
          </b-list-group>
          <b-list-group>
            <b-list-group-item
              ><audio v-if="question.audio" controls>
                <source
                  :src="baseAudio + question.audio"
                  type="audio/ogg"
                /></audio
            ></b-list-group-item>
          </b-list-group>
          <b-list-group v-for="answer in question.answer" :key="answer.id">
            <b-list-group-item v-if="answer.sub_question"
              ><strong>{{ answer.sub_question }}</strong></b-list-group-item
            >
            <b-form-group>
              <b-list-group-item
                ><div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    :name="answer.id"
                    :id="answer.id + '-' + answer.answer_1"
                    v-model="picked[answer.id]"
                    :value="answer.answer_1"
                  />
                  <label
                    class="form-check-label"
                    :for="answer.id + '-' + answer.answer_1"
                  >
                    {{ answer.answer_1 }}
                  </label>
                </div>
              </b-list-group-item>
              <b-list-group-item>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    :name="answer.id"
                    :id="answer.id + '-' + answer.answer_2"
                    v-model="picked[answer.id]"
                    :value="answer.answer_2"
                  />
                  <label
                    class="form-check-label"
                    :for="answer.id + '-' + answer.answer_2"
                  >
                    {{ answer.answer_2 }}
                  </label>
                </div>
              </b-list-group-item>
              <b-list-group-item>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    :name="answer.id"
                    :id="answer.id + '-' + answer.answer_3"
                    v-model="picked[answer.id]"
                    :value="answer.answer_3"
                  />
                  <label
                    class="form-check-label"
                    :for="answer.id + '-' + answer.answer_3"
                  >
                    {{ answer.answer_3 }}
                  </label>
                </div></b-list-group-item
              >
              <b-list-group-item v-if="answer.answer_4">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    :name="answer.id"
                    :id="answer.id + '-' + answer.answer_4"
                    v-model="picked[answer.id]"
                    :value="answer.answer_4"
                  />
                  <label
                    class="form-check-label"
                    :for="answer.id + '-' + answer.answer_4"
                  >
                    {{ answer.answer_4 }}
                  </label>
                </div></b-list-group-item
              >
            </b-form-group>
          </b-list-group>
        </b-form-group>
      </b-card>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: {
    contest_id: Number,
    test_id: Number,
    level_id: Number,
  },
  data() {
    return {
      baseImg: "http://vxut-app.test/images/",
      baseAudio: "http://vxut-app.test/audio/",
      selected: null,
      data_id: {
        test_id: this.test_id,
        contest_id: this.contest_id,
      },
      options: this.answer,
      picked: {},
      title: "",
      countdown: false,
      testing: false,
      result: false,
    };
  },
  watch: {
    contest_id(newVal, oldVal) {
      if (this.level_id < 5) {
        switch (newVal) {
          case 1:
            this.countdown = false;
            this.testing = true;
            this.data_id.contest_id = 1;
            this.title = "言語知識（文字・漢字）";
            this.reload();
            switch (this.level_id) {
              case 2:
                this.$emit("startTime", Date.now());
                this.$emit("endTime", Date.now() + 1500000);
                break;
              case 3:
                this.$emit("startTime", Date.now());
                this.$emit("endTime", Date.now() + 1800000);
                break;
              case 4:
                this.$emit("startTime", Date.now());
                this.$emit("endTime", Date.now() + 1800000);
                break;
            }

            break;
          case 3:
            this.countdown = false;
            this.testing = true;
            this.data_id.contest_id = 2;
            this.title = "文法・読解";
            this.reload();
            switch (this.level_id) {
              case 2:
                this.$emit("startTime", Date.now());
                this.$emit("endTime", Date.now() + 3000000);
                break;
              case 3:
                this.$emit("startTime", Date.now());
                this.$emit("endTime", Date.now() + 3600000);
                break;
              case 4:
                this.$emit("startTime", Date.now());
                this.$emit("endTime", Date.now() + 4200000);
                break;
            }
            break;
          case 5:
            this.countdown = false;
            this.testing = true;
            this.data_id.contest_id = 3;
            this.title = "聴解";
            this.reload();
            switch (this.level_id) {
              case 2:
                this.$emit("startTime", Date.now());
                this.$emit("endTime", Date.now() + 1800000);
                break;
              case 3:
                this.$emit("startTime", Date.now());
                this.$emit("endTime", Date.now() + 2100000);
                break;
              case 4:
                this.$emit("startTime", Date.now());
                this.$emit("endTime", Date.now() + 2400000);
                break;
            }
            break;
          case 6:
            this.testing = false;
            this.result = true;
            this.$emit("startTime", Date.now());
            this.$emit("endTime", Date.now() + 300000);
            this.storeQuestionRequestClient({
              ...this.picked,
              ...this.data_id,
            }).then((rs) => {
              this.picked = {};
            });
            this.getResultDataClient(this.data_id.test_id);
            break;
          default:
            this.testing = false;
            this.countdown = true;
            this.$emit("startTime", Date.now());
            this.$emit("endTime", Date.now() + 300000);
            this.storeQuestionRequestClient({
              ...this.picked,
              ...this.data_id,
            }).then((rs) => {
              this.picked = {};
            });
            // setTimeout(this.reload(), 5000);
            break;
        }
      } else {
        switch (newVal) {
          case 1:
            this.countdown = false;
            this.testing = true;
            this.data_id.contest_id = 4;
            this.title = "言語知識（文字・語彙・文法）読解";
            this.reload();
            this.$emit("startTime", Date.now());
            this.$emit("endTime", Date.now() + 6300000);
            break;
          case 3:
            this.countdown = false;
            this.testing = true;
            this.data_id.contest_id = 3;
            this.title = "聴解";
            this.reload();
            this.$emit("startTime", Date.now());
            this.$emit("endTime", Date.now() + 3000000);
            break;
          case 4:
            this.testing = false;
            this.result = true;
            this.$emit("startTime", Date.now());
            this.$emit("endTime", Date.now() + 300000);
            this.storeQuestionRequestClient({
              ...this.picked,
              ...this.data_id,
            }).then((rs) => {
              this.picked = {};
            });
            this.getResultDataClient(this.data_id.test_id);
            break;
          case 5:
            this.$router.push("/");
            break;
          default:
            this.testing = false;
            this.countdown = true;
            this.$emit("startTime", Date.now());
            this.$emit("endTime", Date.now() + 300000);
            // setTimeout(this.reload(), 5000);
            this.storeQuestionRequestClient({
              ...this.picked,
              ...this.data_id,
            }).then((rs) => {
              this.picked = {};
            });
            break;
        }
      }
      if (this.countdown == false) {
        this.getChapterDataClient(this.data_id);
      }
    },
  },
  created() {
    if (this.data_id.contest_id != null) {
      this.getChapterDataClient(this.data_id);
    }
  },

  computed: {
    ...mapGetters({
      testData: "clientChapter/chapterClient",
      resultData: "clientResult/resultClient",
    }),
  },
  methods: {
    ...mapActions("clientChapter", ["getChapterDataClient"]),
    ...mapActions("clientQuestion", ["storeQuestionRequestClient"]),
    ...mapActions("clientResult", ["getResultDataClient"]),
    reload() {
      this.getChapterDataClient(this.data_id);
    },
  },
};
</script>

<style scoped>
</style>