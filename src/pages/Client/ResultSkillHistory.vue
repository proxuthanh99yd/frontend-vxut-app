<template>
  <b-container>
    <el-page-header
      class="m-2 mb-4 col-md-10"
      @back="goBack"
      content="Result "
    ></el-page-header>
    <b-skeleton-img
      v-if="!resultTest"
      animation="wave"
      no-aspect
      height="434px"
    ></b-skeleton-img>
    <b-card v-else bg-variant="light" header-bg-variant="light">
      <b-form-group v-for="(question, index) in resultTest" :key="index">
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
        <b-list-group v-for="answer in question.answer_skill" :key="answer.id">
          <b-list-group-item v-if="answer.sub_question"
            ><strong>{{ answer.sub_question }}</strong></b-list-group-item
          >
          <b-form-group>
            <b-list-group-item
              ><div class="form-check">
                <input
                  disabled
                  class="form-check-input"
                  type="radio"
                  :name="answer.id"
                  :id="answer.id + '-' + answer.answer_1"
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
                  disabled
                  class="form-check-input"
                  type="radio"
                  :name="answer.id"
                  :id="answer.id + '-' + answer.answer_2"
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
                  disabled
                  class="form-check-input"
                  type="radio"
                  :name="answer.id"
                  :id="answer.id + '-' + answer.answer_3"
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
                  disabled
                  class="form-check-input"
                  type="radio"
                  :name="answer.id"
                  :id="answer.id + '-' + answer.answer_4"
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
            <b-list-group-item
              v-for="answer_skill in answer.student_answer_skill"
              :key="answer_skill.index"
            >
              <b-alert
                v-if="answer.answer == answer_skill.answer"
                variant="success"
                show
                >Đáp án bạn chọn : {{ answer_skill.answer }}</b-alert
              >
              <b-alert v-else show variant="danger"
                >Đáp án bạn chọn : {{ answer_skill.answer }}</b-alert
              >
            </b-list-group-item>
            <b-list-group-item>
              <b-alert variant="success" show
                >Đáp án : {{ answer.answer }}</b-alert
              >
            </b-list-group-item>
          </b-form-group>
        </b-list-group>
      </b-form-group>
    </b-card>
  </b-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      busy: false,
      processing: false,
      counter: 1,
      interval: null,
      file1: null,
      baseImg: "http://vxut-app.test/images/",
      baseAudio: "http://vxut-app.test/audio/",
      centered: false,
    };
  },
  created() {
    this.getResultSkillHistoryDataClient({
      test_skill_id: this.$route.params.test_skill_id,
      result_skill_id: this.$route.params.result_skill_id,
    });
  },
  computed: {
    ...mapGetters({
      resultTest: "clientResult/resultClient",
    }),
  },
  methods: {
    ...mapActions("clientResult", ["getResultSkillHistoryDataClient"]),
    goBack() {
      this.$router.back();
    },
  },
};
</script>

<style>
</style>