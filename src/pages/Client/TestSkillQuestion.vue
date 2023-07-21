<template>
  <b-container>
    <el-page-header
      class="m-2 mb-4 col-md-10"
      @back="goBack"
      content="Test skills "
    ></el-page-header>
    <b-overlay
      :show="true"
      no-wrap
      v-if="!testSkillQuestionDataClient"
    ></b-overlay>
    <div class="pr-5" v-if="this.result == true">
      <b-list-group
        v-for="result in testSkillQuestionDataClient"
        :key="result.id"
      >
        <b-list-group-item
          >TestName : {{ result.test_skill.name }}</b-list-group-item
        >
        <b-list-group-item>Point :{{ result.SkillPoint }}</b-list-group-item>
        <b-list-group-item>Name : {{ result.user.name }}</b-list-group-item>
      </b-list-group>
    </div>
    <div v-else id="exam-question">
      <div class="pr-5">
        <b-card
          v-for="(chapter, index) in testSkillQuestionDataClient"
          :key="index"
          bg-variant="light"
          header-bg-variant="light"
          :title="chapter.name"
          class=""
        >
          <b-form-group
            v-for="(question, index) in chapter.question_skill"
            :key="index"
          >
            <b-list-group>
              <b-list-group-item
                ><strong>
                  Câu {{ index + 1 }} :
                  <h4 v-html="question.question"></h4></strong
              ></b-list-group-item>
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
            <b-list-group
              v-for="answer in question.answer_skill"
              :key="answer.id"
            >
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
                      :id="answer.answer_1"
                      v-model="picked[answer.id]"
                      :value="answer.answer_1"
                    />
                    <label class="form-check-label" :for="answer.answer_1">
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
                      :id="answer.answer_2"
                      v-model="picked[answer.id]"
                      :value="answer.answer_2"
                    />
                    <label class="form-check-label" :for="answer.answer_2">
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
                      :id="answer.answer_3"
                      v-model="picked[answer.id]"
                      :value="answer.answer_3"
                    />
                    <label class="form-check-label" :for="answer.answer_3">
                      {{ answer.answer_3 }}
                    </label>
                  </div></b-list-group-item
                >
                <b-list-group-item>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      :name="answer.id"
                      :id="answer.answer_4"
                      v-model="picked[answer.id]"
                      :value="answer.answer_4"
                    />
                    <label class="form-check-label" :for="answer.answer_4">
                      {{ answer.answer_4 }}
                    </label>
                  </div></b-list-group-item
                >
              </b-form-group>
            </b-list-group>
          </b-form-group>
          <template #footer>
            <b-button variant="primary" @click="submit">Nộp Bài</b-button>
          </template></b-card
        >
      </div>
    </div>
  </b-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      baseImg: "http://vxut-app.test/images/",
      baseAudio: "http://vxut-app.test/audio/",
      selected: null,
      data_id: {
        test_skill_id: this.$route.params.test_skill_id,
      },
      options: this.answer,
      picked: {},
      title: "",
      result: false,
    };
  },
  created() {
    this.getQuestionSkillDataClient(this.$route.params.test_skill_id);
  },
  computed: {
    ...mapGetters({
      testSkillQuestionDataClient:
        "clientTestSkillQuestion/questionSkillClient",
    }),
  },
  methods: {
    ...mapActions("clientTestSkillQuestion", ["getQuestionSkillDataClient"]),
    ...mapActions("clientTestSkillQuestion", [
      "storeQuestionSkillRequestClient",
    ]),
    submit() {
      this.storeQuestionSkillRequestClient({
        ...this.picked,
        ...this.data_id,
      }).then((rs) => {
        this.picked = {};
        this.result = true;
      });
    },
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