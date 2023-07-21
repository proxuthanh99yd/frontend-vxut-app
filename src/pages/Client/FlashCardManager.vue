<template>
  <b-container>
    <el-page-header
      class="m-2"
      @back="goBack"
      content="Flash Card Detail"
    ></el-page-header>
    <b-skeleton-img
      v-if="!clientFlashcardManagerDetail"
      animation="wave"
      no-aspect
      height="434px"
    ></b-skeleton-img>
    <b-card v-else>
      <b-button class="mt-2 mb-2" block @click="create" variant="success"
        ><b-icon icon="plus-circle" aria-hidden="true"></b-icon
      ></b-button>
      <!-- User Interface controls -->
      <b-list-group
        v-for="(value, key) in clientFlashcardManagerDetail"
        :key="key"
        ><b-card :header="'Card ' + (key + 1)">
          <b-row>
            <b-col cols="11">
              <b-list-group-item>Front: {{ value.front }}</b-list-group-item>
              <b-list-group-item>Back: {{ value.back }}</b-list-group-item>
            </b-col>
            <b-col cols="1">
              <b-button
                class="mt-2 mb-2"
                block
                @click="edit(value, $event.target)"
                variant="info"
                ><b-icon icon="pencil-square" aria-hidden="true"></b-icon
              ></b-button>
              <b-button
                class="mt-2 mb-2"
                block
                @click="del(value)"
                variant="danger"
                ><b-icon icon="trash" aria-hidden="true"></b-icon
              ></b-button>
            </b-col>
          </b-row>
        </b-card>
      </b-list-group>
      <b-modal
        size="lg"
        :id="infoModal.id"
        :title="infoModal.title"
        @hide="resetInfoModal"
        @ok="handleOk"
      >
        <b-form-group label="Front" class="mb-0">
          <b-form-input
            v-model="formData.front"
            placeholder="Enter ..."
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Back" class="mb-0">
          <b-form-input
            v-model="formData.back"
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
  created() {
    this.getFlashcardManagerDetailDataClient(
      this.$route.params.flashcards_manager_id
    );
  },
  data() {
    return {
      infoModal: {
        id: "info-modal",
        title: "Edit Test",
      },
      formData: {
        id: "",
        front: "",
        back: "",
        isEdit: false,
      },
      boxTwo: "",
    };
  },
  computed: {
    ...mapGetters({
      clientFlashcardManagerDetail:
        "clientFlashcardManagerDetail/flashcardManagerDetailClient",
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
    // Set the initial number of items
    this.totalRows = this.items.length;
  },
  methods: {
    ...mapActions("clientFlashcardManagerDetail", [
      "getFlashcardManagerDetailDataClient",
    ]),
    ...mapActions("clientFlashcardManagerDetail", [
      "storeFlashcardManagerDetailDataClientRequest",
    ]),
    ...mapActions("clientFlashcardManagerDetail", [
      "updateFlashcardManagerDetailDataClientRequest",
    ]),
    ...mapActions("clientFlashcardManagerDetail", [
      "destroyFlashcardManagerDetailDataClientRequest",
    ]),
    // info(item, index, button) {
    //   this.infoModal.title = `Row index: ${index}`;
    //   this.infoModal.content = item;
    //   this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    //   console.log(item);
    // },
    edit(value, button) {
      this.infoModal.title = "Edit";
      this.formData.id = value.id;
      this.formData.front = value.front;
      this.formData.back = value.back;
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
            this.destroyFlashcardManagerDetailDataClientRequest(row.id).then(
              () => {
                this.getCustomers();
              }
            );
          }
        })
        .catch((err) => {
          // An error occurred
        });
    },
    create() {
      this.infoModal.title = "Create";
      this.formData.front = "";
      this.formData.back = "";
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
      this.getFlashcardManagerDetailDataClient(
        this.$route.params.flashcards_manager_id
      );
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    handleSubmit() {
      // this.show = true;
      if (this.formData.isEdit == true) {
        this.updateFlashcardManagerDetailDataClientRequest(this.formData).then(
          () => {
            this.getCustomers();
          }
        );
      } else {
        // call create customer
        let form = new FormData();
        form.append("front", this.formData.front);
        form.append("back", this.formData.back);
        form.append(
          "flashcard_title_id",
          this.$route.params.flashcards_manager_id
        );
        this.storeFlashcardManagerDetailDataClientRequest(form).then(() => {
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
<style scoped>
</style>