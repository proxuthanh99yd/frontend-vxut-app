<template>
  <b-container>
    <el-page-header
      class="m-2"
      @back="goBack"
      content="Answer"
    ></el-page-header>
    <b-card>
      <h4 v-html="answerSkillData.question.question"></h4>
      <b-img
        v-if="answerSkillData.question.photo"
        :src="baseImg + answerSkillData.question.photo"
        fluid-grow
        alt="Fluid-grow image"
      ></b-img>
      <audio v-if="answerSkillData.question.audio" controls>
        <source
          :src="baseAudio + answerSkillData.question.audio"
          type="audio/ogg"
        />
      </audio>
      <b-button class="mt-2 mb-2" block @click="create" variant="success"
        ><b-icon icon="plus-circle" aria-hidden="true"></b-icon
      ></b-button>
      <!-- User Interface controls -->
      <b-list-group v-for="(value, key) in answerSkillData.answer" :key="key"
        ><b-card :header="'answer ' + (key + 1)">
          <b-row>
            <b-col>
              <b-button
                class="mt-2 mb-2"
                block
                @click="edit(value, $event.target)"
                variant="info"
                ><b-icon icon="pencil-square" aria-hidden="true"></b-icon
              ></b-button>
            </b-col>
            <b-col>
              <b-button
                class="mt-2 mb-2"
                block
                @click="del(value)"
                variant="danger"
                ><b-icon icon="trash" aria-hidden="true"></b-icon
              ></b-button>
            </b-col>
          </b-row>
          <b-list-group-item
            >sub-quesion: {{ value.sub_question }}</b-list-group-item
          >
          <b-list-group-item>answer 1: {{ value.answer_1 }}</b-list-group-item>
          <b-list-group-item>answer 2: {{ value.answer_2 }}</b-list-group-item>
          <b-list-group-item>answer 3: {{ value.answer_3 }}</b-list-group-item>
          <b-list-group-item>answer 4: {{ value.answer_4 }}</b-list-group-item>
          <b-list-group-item>answer: {{ value.answer }}</b-list-group-item>
          <b-list-group-item
            >point: {{ value.point }}</b-list-group-item
          ></b-card
        >
      </b-list-group>
      <b-modal
        size="lg"
        :id="infoModal.id"
        :title="infoModal.title"
        @hide="resetInfoModal"
        @ok="handleOk"
      >
        <b-form-group label="Sub-Question" class="mb-0">
          <b-form-input
            v-model="formData.sub_question"
            placeholder="Enter ..."
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Answer A" class="mb-0">
          <b-form-input
            v-model="formData.answer_1"
            placeholder="Enter ..."
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Answer B" class="mb-0">
          <b-form-input
            v-model="formData.answer_2"
            placeholder="Enter ..."
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Answer C" class="mb-0">
          <b-form-input
            v-model="formData.answer_3"
            placeholder="Enter ..."
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Answer D" class="mb-0">
          <b-form-input
            v-model="formData.answer_4"
            placeholder="Enter ..."
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Answer" class="mb-0">
          <b-form-select v-model="selected" :options="options"></b-form-select>
        </b-form-group>
        <b-form-group label="Point" class="mb-0">
          <b-form-input
            v-model="formData.point"
            type="number"
            placeholder="Enter ..."
          ></b-form-input>
        </b-form-group>
        <b-form
          ref="form"
          @submit.stop.prevent="handleSubmit"
          enctype="multipart/form-data"
        >
        </b-form> </b-modal></b-card
  ></b-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  components: {},
  data() {
    return {
      baseImg: "http://vxut-app.test/images/",
      baseAudio: "http://vxut-app.test/audio/",
      infoModal: {
        id: "info-modal",
        title: "Edit Test",
      },
      selected: null,
      options: [
        { value: null, text: "Please select an option" },
        { value: "1", text: "A" },
        { value: "2", text: "B" },
        { value: "3", text: "C" },
        { value: "4", text: "D" },
      ],
      formData: {
        id: "",
        question_skill_id: "",
        sub_question: "",
        answer_1: "",
        answer_2: "",
        answer_3: "",
        answer_4: "",
        answer: "",
        point: "",
        isEdit: false,
      },
    };
  },
  created() {
    this.getAnswerSkillData(this.$route.params.question_skill_id);
  },
  computed: {
    ...mapGetters({
      answerSkillData: "answerSkill/answerSkill",
    }),
  },
  methods: {
    ...mapActions("answerSkill", ["getAnswerSkillData"]),
    ...mapActions("answerSkill", ["storeAnswerSkillRequest"]),
    ...mapActions("answerSkill", ["updateAnswerSkillRequest"]),
    ...mapActions("answerSkill", ["destroyAnswerSkillRequest"]),
    create() {
      this.infoModal.title = "Create";
      this.formData.question_skill_id = "";
      this.formData.sub_question = "";
      this.formData.answer_1 = "";
      this.formData.answer_2 = "";
      this.formData.answer_3 = "";
      this.formData.answer_4 = "";
      this.formData.answer = "";
      this.formData.point = "";
      this.formData.isEdit = false;
      this.$root.$emit("bv::show::modal", this.infoModal.id);
    },
    edit(value, button) {
      this.infoModal.title = "Edit";
      this.formData.id = value.id;
      this.formData.question_skill_id = value.question_id;
      this.formData.sub_question = value.sub_question;
      this.formData.answer_1 = value.answer_1;
      this.formData.answer_2 = value.answer_2;
      this.formData.answer_3 = value.answer_3;
      this.formData.answer_4 = value.answer_4;
      this.formData.answer = value.answer;
      this.formData.point = value.point;
      this.formData.isEdit = true;
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    del(row) {
      this.$bvModal
        .msgBoxConfirm("Please confirm that you want to delete everything.", {
          title: "Please Confirm",
          size: "sm",
          buttonSize: "sm",
          okVariant: "danger",
          okTitle: "YES",
          cancelTitle: "NO",
          footerClass: "p-2",
          hideHeaderClose: false,
          centered: true,
        })
        .then((value) => {
          if (value === true) {
            this.destroyAnswerSkillRequest(row.id).then(() => {
              this.getCustomers();
            });
          }
        })
        .catch((err) => {
          // An error occurred
        });
    },
    getCustomers() {
      this.getAnswerSkillData(this.$route.params.question_skill_id);
    },
    resetInfoModal() {
      // this.infoModal.title = "";
      // this.infoModal.content = "";
      // this.formData.level_id = "";
      // this.formData.name = "";
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    handleSubmit() {
      if (this.selected == 1) {
        this.formData.answer = this.formData.answer_1;
      }
      if (this.selected == 2) {
        this.formData.answer = this.formData.answer_2;
      }
      if (this.selected == 3) {
        this.formData.answer = this.formData.answer_3;
      }
      if (this.selected == 4) {
        this.formData.answer = this.formData.answer_4;
      }
      if (this.formData.isEdit == true) {
        this.updateAnswerSkillRequest(this.formData).then(() => {
          this.getCustomers();
        });
      } else {
        this.formData.question_skill_id = this.$route.params.question_skill_id;
        this.storeAnswerSkillRequest(this.formData).then(() => {
          this.getCustomers();
        });
      }
      this.$nextTick(() => {
        this.$bvModal.hide(this.infoModal.id);
      });
    },
    goBack() {
      this.$router.back();
    },
  },
};
</script>

<style>
</style>