<template>
  <b-container>
    <el-page-header
      class="m-2"
      @back="goBack"
      content="Question"
    ></el-page-header>
    <b-card>
      <!-- User Interface controls -->
      <b-row class="mb-3">
        <b-button class="ml-3" lg="1" @click="create" variant="success"
          ><b-icon icon="plus-circle" aria-hidden="true"></b-icon
        ></b-button>
        <b-col lg="5" class="my-1">
          <b-form-group
            label="Sort"
            label-for="sort-by-select"
            label-cols-sm="3"
            label-align-sm="right"
            label-size="sm"
            class="mb-0"
            v-slot="{ ariaDescribedby }"
          >
            <b-input-group size="sm">
              <b-form-select
                id="sort-by-select"
                v-model="sortBy"
                :options="sortOptions"
                :aria-describedby="ariaDescribedby"
                class="w-75"
              >
                <template #first>
                  <option value="">-- none --</option>
                </template>
              </b-form-select>

              <b-form-select
                v-model="sortDesc"
                :disabled="!sortBy"
                :aria-describedby="ariaDescribedby"
                size="sm"
                class="w-25"
              >
                <option :value="false">Asc</option>
                <option :value="true">Desc</option>
              </b-form-select>
            </b-input-group>
          </b-form-group>
        </b-col>

        <b-col lg="6" class="my-1">
          <b-form-group
            label="Filter"
            label-for="filter-input"
            label-cols-sm="3"
            label-align-sm="right"
            label-size="sm"
            class="mb-0"
          >
            <b-input-group size="sm">
              <b-form-input
                id="filter-input"
                v-model="filter"
                type="search"
                placeholder="Type to Search"
              ></b-form-input>

              <b-input-group-append>
                <b-button :disabled="!filter" @click="filter = ''"
                  >Clear</b-button
                >
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>
      </b-row>
      <!-- Main table element -->
      <b-table
        :aria-hidden="show ? 'true' : null"
        :key="key"
        v-if="questionSkillData"
        :items="questionSkillData"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        :filter="filter"
        :filter-included-fields="filterOn"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :sort-direction="sortDirection"
        stacked="md"
        show-empty
        small
        @filtered="onFiltered"
        :busy="isBusy"
      >
        <template #cell(question)="data">
          <router-link
            custom
            :to="{
              name: 'AnswerSkill',
              params: { question_skill_id: data.item.id },
            }"
            v-slot="{ href, navigate }"
          >
            <a :href="href" @click="navigate"
              ><span v-html="data.value"></span></a
          ></router-link>
        </template>
        <template #cell(photo)="data">
          <img
            v-if="data.value"
            :src="baseImg + data.value"
            width="30px"
            height="30px"
            alt="null"
          /> </template
        ><template #cell(audio)="data">
          <audio v-if="data.value" controls>
            <source :src="baseAudio + data.value" type="audio/ogg" />
          </audio>
        </template>
        <template #cell(actions)="row">
          <b-button
            variant="outline-success"
            size="sm"
            @click="edit(row.item, row.index, $event.target)"
            class="mr-1"
          >
            <b-icon icon="pencil-square"></b-icon>
          </b-button>
          <b-button
            variant="outline-danger"
            size="sm"
            @click="MsgBoxDel(row.item, row.index, $event.target)"
          >
            <b-icon icon="trash"></b-icon>
          </b-button>
        </template>
      </b-table>
      <loader-table
        v-else
        :rows="5"
        :columns="4"
        :table-props="{ bordered: true, striped: true }"
      />
      <!-- User Interface controls -->
      <b-row>
        <b-col sm="7" md="6" class="my-1">
          <b-pagination
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            align="fill"
            size="sm"
            class="my-0"
          ></b-pagination>
        </b-col>
        <b-col sm="5" md="6" class="my-1">
          <b-form-group
            label="Per page"
            label-for="per-page-select"
            label-cols-sm="6"
            label-cols-md="4"
            label-cols-lg="3"
            label-align-sm="right"
            label-size="sm"
            class="mb-0"
          >
            <b-form-select
              id="per-page-select"
              v-model="perPage"
              :options="pageOptions"
              size="sm"
            ></b-form-select>
          </b-form-group>
        </b-col>
      </b-row>
      <!-- Info modal -->
      <b-modal
        size="md"
        :id="infoModal.id"
        :title="infoModal.title"
        @hide="resetInfoModal"
        @ok="handleOk"
      >
        <b-form
          ref="form"
          @submit.stop.prevent="handleSubmit"
          enctype="multipart/form-data"
        >
          <b-form-group label="Image File:" label-cols-sm="2"
            ><b-form-file
              accept="image/jpeg, image/png, image/gif"
              v-on:change="onImageChange"
              placeholder="Choose a file or drop it here..."
              drop-placeholder="Drop file here..."
            ></b-form-file
          ></b-form-group>
          <b-form-group label="Audio File:" label-cols-sm="2"
            ><b-form-file
              v-on:change="onAudioChange"
              accept="audio/*"
              placeholder="Choose a file or drop it here..."
              drop-placeholder="Drop file here..."
            ></b-form-file
          ></b-form-group>
          <b-form-group
            label-size="lg"
            label="Question Name"
            label-for="input-2"
            ><ckeditor
              v-model="formData.question"
              :config="editorConfig"
              :editor-url="editorUrl"
            ></ckeditor
          ></b-form-group>
        </b-form>
      </b-modal>
    </b-card>
  </b-container>
</template>

<script>
import LoaderTable from "../../components/loader-table.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    LoaderTable,
  },
  created() {
    this.getQuestionSkillData(this.$route.params.test_skill_id);
  },
  data() {
    return {
      isBusy: false,
      editorUrl: "https://cdn.ckeditor.com/4.14.1/full-all/ckeditor.js",
      editorConfig: {
        toolbarGroups: [
          { name: "document", groups: ["mode", "document", "doctools"] },
          { name: "clipboard", groups: ["clipboard", "undo"] },
          {
            name: "editing",
            groups: ["find", "selection", "spellchecker", "editing"],
          },
          { name: "forms", groups: ["forms"] },
          { name: "basicstyles", groups: ["basicstyles", "cleanup"] },
          {
            name: "paragraph",
            groups: ["list", "indent", "blocks", "align", "bidi", "paragraph"],
          },
          { name: "links", groups: ["links"] },
          { name: "insert", groups: ["insert"] },
          { name: "styles", groups: ["styles"] },
          { name: "colors", groups: ["colors"] },
          { name: "tools", groups: ["tools"] },
          { name: "others", groups: ["others"] },
          { name: "about", groups: ["about"] },
        ],
        removeButtons:
          "NewPage,Print,Save,Templates,Replace,Find,SelectAll,Scayt,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,CreateDiv,Anchor,Flash,Smiley,PageBreak,ShowBlocks,About,Language,Iframe,Image",
      },
      baseImg: "http://vxut-app.test/images/",
      baseAudio: "http://vxut-app.test/audio/",
      file1: null,
      file2: null,
      show: false,
      key: 0,
      fields: [
        {
          key: "id",
          label: "ID",
          sortable: true,
          class: "text-left",
        },
        {
          key: "question",
          label: "QuestionName",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "photo",
          label: "Photo",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "audio",
          label: "Audio",
          sortable: true,
          sortDirection: "desc",
        },
        { key: "actions", label: "Actions", class: "text-right" },
      ],
      fields1: [
        {
          key: "id",
          label: "ID",
          sortable: true,
          class: "text-left",
        },
        {
          key: "sub_question",
          label: "subQuestion",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "point",
          label: "Point",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "updated_at",
          label: "Updated",
          sortable: true,
          sortDirection: "desc",
        },
        { key: "actions", label: "Actions", class: "text-right" },
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 15,
      pageOptions: [5, 10, 15, { value: 100, text: "Show a lot" }],
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      filterOn: [],
      infoModal: {
        id: "info-modal",
        title: "Edit Test",
      },
      formData: {
        id: "",
        question: "",
        chapter_id: "",
        isEdit: false,
      },
    };
  },
  computed: {
    ...mapGetters({
      questionSkillData: "questionSkill/questionSkill",
    }),
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => {
          return { text: f.label, value: f.key };
        });
    },
  },
  mounted() {
    if (this.questionSkillData) {
      this.totalRows = this.questionSkillData.length;
    }
    // Set the initial number of items
  },
  methods: {
    ...mapActions("questionSkill", ["getQuestionSkillData"]),
    ...mapActions("questionSkill", ["storeQuestionSkillRequest"]),
    ...mapActions("questionSkill", ["updateQuestionSkillRequest"]),
    ...mapActions("questionSkill", ["destroyQuestionSkillRequest"]),
    // info(item, index, button) {
    //   this.infoModal.title = `Row index: ${index}`;
    //   this.infoModal.content = item;
    //   this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    //   console.log(item);
    // },
    edit(item, index, button) {
      this.formData.question = "";
      this.file1 = null;
      this.file2 = null;
      this.infoModal.title = `Edit`;
      this.formData.id = item.id;
      this.formData.question = item.question;
      this.formData.isEdit = true;
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    create() {
      this.infoModal.title = "Create";
      this.file1 = null;
      this.file2 = null;
      this.formData.question = "";
      this.formData.id = "";
      this.formData.isEdit = false;
      this.$root.$emit("bv::show::modal", this.infoModal.id);
    },
    resetInfoModal() {
      // this.infoModal.title = "";
      // this.infoModal.content = "";
      // this.formData.level_id = "";
      // this.formData.name = "";
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    getCustomers() {
      this.getQuestionSkillData(this.$route.params.test_skill_id);
      this.show = false;
      this.isBusy = false;
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    onImageChange(e) {
      this.file1 = e.target.files[0];
    },
    onAudioChange(e) {
      this.file2 = e.target.files[0];
    },
    handleSubmit() {
      // this.show = true;
      if (this.formData.isEdit == true) {
        const config = {
          headers: { "content-type": "multipart/form-data" },
        };

        let formData = new FormData();
        formData.append("image", this.file1);
        formData.append("audio", this.file2);
        formData.append("question", this.formData.question);
        formData.append("id", this.formData.id);
        this.isBusy = true;
        this.updateQuestionSkillRequest(formData, config).then(() => {
          this.getCustomers();
        });
      } else {
        this.formData.id = this.$route.params.test_skill_id;
        const config = {
          headers: { "content-type": "multipart/form-data" },
        };

        let formData = new FormData();
        formData.append("image", this.file1);
        formData.append("audio", this.file2);
        formData.append("id", this.formData.id);
        formData.append("question", this.formData.question);
        this.isBusy = true;
        this.storeQuestionSkillRequest(formData, config).then(() => {
          this.getCustomers();
        });
      }

      this.$nextTick(() => {
        this.$bvModal.hide(this.infoModal.id);
      });
    },
    MsgBoxDel(item, index, button) {
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
            this.isBusy = true;
            this.destroyQuestionSkillRequest(item.id).then(() => {
              this.getCustomers();
            });
          }
        })
        .catch((err) => {
          // An error occurred
        });
    },
    goBack() {
      this.$router.back();
    },
  },
};
</script>
<style scoped>
</style>