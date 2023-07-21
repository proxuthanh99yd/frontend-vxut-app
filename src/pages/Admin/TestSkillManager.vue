<template>
  <b-container>
    <el-page-header
      class="m-2"
      @back="goBack"
      content="Test-skill"
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
      <b-overlay :show="show" rounded="sm">
        <!-- Main table element -->
        <b-table
          :aria-hidden="show ? 'true' : null"
          :key="key"
          v-if="testSkillData"
          :items="testSkillData"
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
              :to="{
                name: 'QuestionSkill',
                params: { test_skill_id: data.item.id },
              }"
              >{{ data.value }}</router-link
            >
          </template>
          <template #cell(active)="row">
            <b-icon
              v-if="row.item.active == 1"
              variant="success"
              icon="circle-fill"
              @click="active(row.item)"
              aria-hidden="true"
            ></b-icon>
            <b-icon
              v-else
              variant="danger"
              icon="circle-fill"
              @click="active(row.item)"
              aria-hidden="true"
            ></b-icon>
          </template>
          <template #cell(skill)="data">
            {{ data.value.name }}
          </template>
          <template #cell(level)="data">
            {{ data.value.name }}
          </template>
          <template #cell(user)="data">
            {{ data.value.name }}
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
      </b-overlay>
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
            label="Test SKill Name"
            label-for="input-1"
          >
            <b-form-input id="input-1" v-model="formData.name"></b-form-input>
          </b-form-group>
          <b-form-group label="Level" label-for="input-2">
            <b-form-select
              id="input-2"
              v-model="level_id"
              :options="options"
              class="mb-3"
            >
              <!-- This slot appears above the options from 'options' prop -->
              <template #first>
                <b-form-select-option :value="null" disabled
                  >-- Please select an option --</b-form-select-option
                >
              </template>
            </b-form-select>
          </b-form-group>
          <b-form-group label="SKill" label-for="input-2">
            <b-form-select
              id="input-2"
              v-model="skill_id"
              :options="options1"
              class="mb-3"
            >
              <!-- This slot appears above the options from 'options' prop -->
              <template #first>
                <b-form-select-option :value="null" disabled
                  >-- Please select an option --</b-form-select-option
                >
              </template>
            </b-form-select>
          </b-form-group>
          <b-form-checkbox v-model="checked" name="check-button" switch>
            Public
          </b-form-checkbox>
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
    this.getTestSkillData();
  },
  data() {
    return {
      isBusy: false,
      checked: true,
      show: false,
      key: 0,
      items: [],
      fields: [
        {
          key: "id",
          label: "ID",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "name",
          label: "TestSkillName",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "active",
          label: "Public",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "skill",
          label: "Skill",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "level",
          label: "Level",
          sortable: true,
          class: "text-right",
        },
        {
          key: "user",
          label: "UserCreated",
          sortable: true,
          class: "text-right",
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
        level_id: "",
        skill_id: "",
        public: true,
        isEdit: false,
      },
      level_id: null,
      options: [
        { value: "2", text: "N5" },
        { value: "3", text: "N4" },
        { value: "4", text: "N3" },
        { value: "5", text: "N2" },
      ],
      skill_id: null,
      options1: [
        { value: "1", text: "Từ vựng - Chữ hán" },
        { value: "2", text: "Ngữ pháp" },
        { value: "3", text: "Đọc hiểu" },
        { value: "4", text: "Nghe hiểu" },
      ],
      boxTwo: "",
    };
  },
  computed: {
    ...mapGetters({
      testSkillData: "testSkill/testSkill",
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
    ...mapActions("testSkill", ["getTestSkillData"]),
    ...mapActions("testSkill", ["storeTestSkillRequest"]),
    ...mapActions("testSkill", ["updateTestSkillRequest"]),
    ...mapActions("testSkill", ["destroyTestSkillRequest"]),
    // info(item, index, button) {
    //   this.infoModal.title = `Row index: ${index}`;
    //   this.infoModal.content = item;
    //   this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    //   console.log(item);
    // },
    edit(item, index, button) {
      this.formData.level_id = "";
      this.formData.skill_id = "";
      this.formData.name = "";
      this.infoModal.title = `Edit`;
      this.formData.id = item.id;
      this.formData.name = item.name;
      this.formData.level_id = item.level_id;
      this.level_id = item.level_id;
      this.skill_id = item.skill_id;
      this.formData.public = item.active;
      if (this.formData.public == 1) {
        this.checked = true;
      } else {
        this.checked = false;
      }
      this.formData.isEdit = true;
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    create() {
      this.level_id = null;
      this.skill_id = null;
      this.infoModal.title = "Create";
      this.formData.id = null;
      this.formData.level_id = "";
      this.formData.skill_id = "";
      this.formData.name = "";
      this.formData.public = "";
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
      this.getTestSkillData();
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
        if (this.checked == true) {
          this.formData.public = 1;
        } else {
          this.formData.public = 0;
        }
        this.formData.level_id = this.level_id;
        this.formData.skill_id = this.skill_id;
        this.isBusy = true;
        this.updateTestSkillRequest(this.formData).then(() => {
          this.getCustomers();
        });
      } else {
        // call create customer
        let form = new FormData();
        if (this.checked == true) {
          form.append("public", 1);
        } else {
          form.append("public", 0);
        }
        form.append("name", this.formData.name);
        form.append("skill_id", this.skill_id);
        form.append("level_id", this.level_id);
        this.isBusy = true;
        this.storeTestSkillRequest(form).then(() => {
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
            this.destroyTestSkillRequest(item.id).then(() => {
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