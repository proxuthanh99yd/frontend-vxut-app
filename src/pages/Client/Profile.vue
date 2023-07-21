<template>
  <b-container>
    <el-page-header
      class="m-2 mb-4 col-md-10"
      @back="goBack"
      content="Profile "
    ></el-page-header>
    <b-skeleton-img
      v-if="!user"
      animation="wave"
      no-aspect
      height="434px"
    ></b-skeleton-img>
    <b-row v-else>
      <b-col cols="4">
        <b-card
          img-height="255px"
          title="Avatar"
          :img-src="baseImg + user.avatar"
          img-alt="Image"
          img-top
          tag="article"
          style="max-width: 20rem"
          class="mb-2"
        >
          <b-form
            ref="form"
            @submit.stop.prevent="avatarSubmit"
            enctype="multipart/form-data"
          >
            <b-form-file
              size="sm"
              accept="image/jpeg, image/png, image/gif"
              v-on:change="onImageChange"
              placeholder="Choose a file or drop it here..."
              drop-placeholder="Drop file here..."
            ></b-form-file>
            <b-button
              class="mt-3"
              v-if="this.avatar == true"
              @click="updateAvatar"
              variant="primary"
              >Cập nhật</b-button
            >
            <b-button
              class="mt-3"
              v-else
              disabled
              @click="updateAvatar"
              variant="primary"
              >Cập nhật</b-button
            >
          </b-form>
        </b-card></b-col
      >
      <b-col cols="8">
        <b-card no-body>
          <b-tabs card>
            <b-tab title="Profile" active>
              <b-form class="position-relative p-3" @submit.prevent="onSubmit">
                <b-row class="m-1">
                  <b-col cols="2">
                    <label>Email:</label>
                  </b-col>
                  <b-col cols="10">
                    <b-form-input
                      type="email"
                      disabled
                      :value="user.email"
                    ></b-form-input>
                  </b-col>
                </b-row>
                <b-row class="m-1">
                  <b-col cols="2">
                    <label>Name:</label>
                  </b-col>
                  <b-col cols="10">
                    <b-form-input
                      type="text"
                      v-model="user.name"
                      @change="username"
                    ></b-form-input>
                  </b-col>
                </b-row>
                <b-row class="m-1">
                  <b-col cols="2">
                    <label>Birthday:</label>
                  </b-col>
                  <b-col cols="10">
                    <b-form-input
                      type="date"
                      v-model="user.birthday"
                      @change="birthday"
                    ></b-form-input>
                  </b-col>
                </b-row>
                <b-button
                  ref="submit"
                  type="submit"
                  :disabled="busy"
                  variant="primary"
                  >Cập nhật</b-button
                >
              </b-form>
              <b-overlay
                :show="busy"
                no-wrap
                @shown="onShown"
                @hidden="onHidden"
              >
                <template #overlay>
                  <div
                    v-if="processing"
                    class="text-center p-4 bg-primary text-light rounded"
                  >
                    <b-icon icon="cloud-upload" font-scale="4"></b-icon>
                    <div class="mb-3">Processing...</div>
                    <b-progress
                      min="1"
                      max="20"
                      :value="counter"
                      variant="success"
                      height="3px"
                      class="mx-n4 rounded-0"
                    ></b-progress>
                  </div>
                  <div
                    v-else
                    ref="dialog"
                    tabindex="-1"
                    role="dialog"
                    aria-modal="false"
                    aria-labelledby="form-confirm-label"
                    class="text-center p-3"
                  >
                    <p>
                      <strong id="form-confirm-label">Are you sure?</strong>
                    </p>
                    <div class="d-flex">
                      <b-button
                        variant="outline-danger"
                        class="mr-3"
                        @click="onCancel"
                      >
                        Cancel
                      </b-button>
                      <b-button variant="outline-success" @click="onOK"
                        >OK</b-button
                      >
                    </div>
                  </div>
                </template>
              </b-overlay>
            </b-tab>
            <b-tab title="Change Password">
              <b-form class="position-relative p-3" @submit.prevent="onSubmit">
                <b-row class="m-1">
                  <b-col cols="2">
                    <label>Old Password:</label>
                  </b-col>
                  <b-col cols="10">
                    <b-form-input
                      type="password"
                      @change="password"
                      v-model="formData2.old_pass"
                    ></b-form-input>
                  </b-col>
                </b-row>
                <b-row class="m-1">
                  <b-col cols="2">
                    <label>New Password:</label>
                  </b-col>
                  <b-col cols="10">
                    <b-form-input
                      type="password"
                      v-model="formData2.new_pass"
                    ></b-form-input>
                  </b-col>
                </b-row>
                <b-button
                  ref="submit"
                  type="submit"
                  :disabled="busy"
                  variant="primary"
                  >Cập nhật</b-button
                >
              </b-form>
              <b-overlay
                :show="busy"
                no-wrap
                @shown="onShown"
                @hidden="onHidden"
              >
                <template #overlay>
                  <div
                    v-if="processing"
                    class="text-center p-4 bg-primary text-light rounded"
                  >
                    <b-icon icon="cloud-upload" font-scale="4"></b-icon>
                    <div class="mb-3">Processing...</div>
                    <b-progress
                      min="1"
                      max="20"
                      :value="counter"
                      variant="success"
                      height="3px"
                      class="mx-n4 rounded-0"
                    ></b-progress>
                  </div>
                  <div
                    v-else
                    ref="dialog"
                    tabindex="-1"
                    role="dialog"
                    aria-modal="false"
                    aria-labelledby="form-confirm-label"
                    class="text-center p-3"
                  >
                    <p>
                      <strong id="form-confirm-label">Are you sure?</strong>
                    </p>
                    <div class="d-flex">
                      <b-button
                        variant="outline-danger"
                        class="mr-3"
                        @click="onCancel"
                      >
                        Cancel
                      </b-button>
                      <b-button variant="outline-success" @click="ChangePass"
                        >OK</b-button
                      >
                    </div>
                  </div>
                </template>
              </b-overlay>
            </b-tab>
            <b-tab title="Test History"
              ><div>
                <b-table striped hover :items="resultTest" :fields="fields2">
                  <template #cell(test)="data">
                    {{ data.value.name }}
                  </template>
                  <template #cell(actions)="row">
                    <b-button
                      size="sm"
                      @click="info(row.item, row.index, $event.target)"
                      class="mr-1"
                    >
                      View
                    </b-button>
                  </template>
                </b-table>
              </div>
            </b-tab>
            <b-tab title="Test Skill History">
              <div>
                <b-table
                  striped
                  hover
                  :items="resultTestSkill"
                  :fields="fields"
                >
                  <template #cell(test_skill)="data">
                    {{ data.value.name }}
                  </template>
                  <template #cell(actions2)="row">
                    <b-button
                      size="sm"
                      @click="info2(row.item, row.index, $event.target)"
                      class="mr-1"
                    >
                      View
                    </b-button>
                  </template>
                </b-table>
              </div>
            </b-tab>
          </b-tabs>
        </b-card>
      </b-col>
    </b-row>
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
      centered: false,
      formData: {
        name: "",
        birthday: "",
      },
      formData2: {
        old_pass: "",
        new_pass: "",
      },
      avatar: false,
      fields: [
        {
          key: "id",
          label: "ID",
          sortable: true,
        },
        {
          key: "test_skill",
          label: "Test Skill",
          sortable: true,
        },
        {
          key: "SkillPoint",
          label: "Point",
          sortable: true,
        },
        { key: "actions2", label: "History" },
      ],
      fields2: [
        {
          key: "id",
          label: "ID",
          sortable: true,
        },
        {
          key: "test",
          label: "Test Skill",
          sortable: true,
        },
        {
          key: "vocabularyPoint",
          label: "vocabularyPoint",
          sortable: true,
        },
        {
          key: "grammarPoint",
          label: "grammarPoint",
          sortable: true,
        },
        {
          key: "listenPoint",
          label: "listenPoint",
          sortable: true,
        },
        { key: "actions", label: "History" },
      ],
    };
  },
  beforeDestroy() {
    this.clearInterval();
  },
  created() {
    this.getUserData();
    this.getTestSkillHistoryDataClient();
    this.getTestHistoryDataClient();
  },
  computed: {
    ...mapGetters({
      user: "auth/user",
      resultTestSkill: "clientTestSkill/testSkillClient",
      resultTest: "clientTestSkill/testClient",
      msg: "auth/msg",
    }),
  },
  methods: {
    ...mapActions("auth", ["getUserData"]),
    ...mapActions("auth", ["updateUserData"]),
    ...mapActions("auth", ["changePassUserData"]),
    ...mapActions("auth", ["updateProfileData"]),
    ...mapActions("clientTestSkill", ["getTestSkillHistoryDataClient"]),
    ...mapActions("clientTestSkill", ["getTestHistoryDataClient"]),
    goBack() {
      this.$router.back();
    },
    onImageChange(e) {
      this.file1 = e.target.files[0];
      this.avatar = true;
    },
    username(e) {
      this.profile = true;
      this.formData.name = e;
    },
    birthday(e) {
      this.profile = true;
      this.formData.birthday = e;
    },
    password(e) {
      this.profile = true;
    },
    updateAvatar() {
      this.avatarSubmit();
    },
    avatarSubmit() {
      const config = {
        headers: { "content-type": "multipart/form-data" },
      };

      let formData = new FormData();
      formData.append("image", this.file1);
      this.updateUserData(formData, config).then(() => {
        this.avatar = false;
        this.makeToast("success");
      });
    },
    clearInterval() {
      if (this.interval) {
        clearInterval(this.interval);
        this.interval = null;
      }
    },
    onShown() {
      // Focus the dialog prompt
      this.$refs.dialog.focus();
    },
    onHidden() {
      // In this case, we return focus to the submit button
      // You may need to alter this based on your application requirements
      this.$refs.submit.focus();
    },
    onSubmit() {
      this.processing = false;
      this.busy = true;
    },
    onCancel() {
      this.busy = false;
    },
    onOK() {
      this.counter = 1;
      this.processing = true;
      // Simulate an async request
      this.updateProfileData(this.formData).then(() => {
        this.clearInterval();
        this.busy = this.processing = false;
      });
    },
    ChangePass() {
      this.counter = 1;
      this.processing = true;
      // Simulate an async request
      this.changePassUserData(this.formData2).then(() => {
        this.clearInterval();
        this.busy = this.processing = false;
        this.makeToast("success");
      });
    },
    makeToast(variant = null) {
      this.$bvToast.toast(" Updated successfully.", {
        title: "success",
        variant: variant,
        solid: true,
        autoHideDelay: "1000",
      });
    },
    info(row, index, target) {
      this.$router.push("/result-history/" + row.test_id);
    },
    info2(row, index, target) {
      this.$router.push(
        "/result-skill-history/" + row.test_skill_id + "/" + row.id
      );
    },
  },
};
</script>

<style>
</style>