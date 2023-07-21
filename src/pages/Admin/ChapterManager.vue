<template>
  <b-container>
    <el-page-header
      class="m-2"
      @back="goBack"
      content="Chapter"
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
        v-if="chapterData"
        :items="chapterData"
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
        <template #cell(name)="data">
          <router-link
            :to="{ name: 'Question', params: { chapter_id: data.item.id } }"
            >{{ data.value }}</router-link
          >
        </template>
        <template #cell(actions)="row">
          <b-button
            variant="outline-success"
            size="sm"
            @click="edit(row.item, row.index, $event.target)"
            class="mr-1"
          >
            Edit
          </b-button>
          <b-button
            variant="outline-danger"
            size="sm"
            @click="MsgBoxDel(row.item, row.index, $event.target)"
          >
            Delete
          </b-button>
        </template>

        <template #row-details="row">
          <b-card>
            <ul>
              <li v-for="(value, key) in row.item" :key="key">
                {{ key }}: {{ value }}
              </li>
            </ul>
          </b-card>
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
        :id="infoModal.id"
        :title="infoModal.title"
        @hide="resetInfoModal"
        @ok="handleOk"
      >
        <b-form ref="form" @submit.stop.prevent="handleSubmit">
          <b-form-group
            id="fieldset-1"
            label="Chapter Name"
            label-for="input-1"
          >
            <b-form-input id="input-1" v-model="formData.name"></b-form-input>
          </b-form-group>
          <b-form-select
            v-if="formData.isEdit == false"
            v-model="selected"
            class="mb-3"
          >
            <b-form-select-option :value="null"
              >Please select an option</b-form-select-option
            >
            <b-form-select-option :value="1">Từ vựng</b-form-select-option>
            <b-form-select-option :value="2"
              >Ngữ pháp - đọc hiểu</b-form-select-option
            >
            <b-form-select-option :value="3">Nghe hiểu</b-form-select-option>
            <b-form-select-option :value="4"
              >Từ vựng - Ngữ pháp - Đọc hiểu(N2,N1)</b-form-select-option
            >
          </b-form-select>
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
    this.getChapterData(this.$route.params.test_id);
  },
  data() {
    return {
      isBusy: false,
      selected: null,
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
          key: "name",
          label: "ChapterName",
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
        name: "",
        contest_id: "",
        isEdit: false,
      },
      boxTwo: "",
    };
  },
  computed: {
    ...mapGetters({
      chapterData: "chapter/chapter",
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
    this.totalRows = this.chapterData.length;
  },
  methods: {
    ...mapActions("chapter", ["getChapterData"]),
    ...mapActions("chapter", ["storeChapterRequest"]),
    ...mapActions("chapter", ["updateChapterRequest"]),
    ...mapActions("chapter", ["destroyChapterRequest"]),
    // info(item, index, button) {
    //   this.infoModal.title = `Row index: ${index}`;
    //   this.infoModal.content = item;
    //   this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    //   console.log(item);
    // },
    edit(item, index, button) {
      this.formData.name = "";
      this.infoModal.title = `Edit`;
      this.formData.id = item.id;
      this.formData.name = item.name;
      this.formData.isEdit = true;
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    create() {
      this.infoModal.title = "Create";
      this.formData.name = "";
      this.selected = null;
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
      this.getChapterData(this.$route.params.test_id);
      this.show = false;
      this.isBusy = false;
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
        this.isBusy = true;
        this.updateChapterRequest(this.formData).then(() => {
          this.getCustomers();
        });
      } else {
        this.formData.id = this.$route.params.test_id;
        this.formData.contest_id = this.selected;
        this.isBusy = true;
        this.storeChapterRequest(this.formData).then(() => {
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
            this.destroyChapterRequest(item.id).then(() => {
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