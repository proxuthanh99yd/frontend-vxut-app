<template>
  <b-container>
    <el-page-header
      class="m-2 mb-4 col-md-10"
      @back="goBack"
      content="FlashCard "
    ></el-page-header>
    <b-overlay :show="true" no-wrap v-if="!myFlashcard"></b-overlay>
    <b-card no-body>
      <b-tabs card>
        <b-tab title="Flashcard" active>
          <!-- User Interface controls -->
          <b-row class="mb-3">
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
              v-if="myFlashcard"
              :items="myFlashcard"
              :fields="fields2"
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
            >
              <template #cell(name)="data">
                <router-link
                  :to="{
                    name: 'MyFlashcard',
                    params: { my_flashcard_id: data.item.id },
                  }"
                  >{{ data.value }}</router-link
                >
              </template>
              <template #cell(user)="data">
                {{ data.value.name }}
              </template>
            </b-table>

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
        </b-tab>
        <b-tab title="My Flashcard">
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
              v-if="clientFlashcardManager"
              :items="clientFlashcardManager"
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
            >
              <template #cell(name)="data">
                <router-link
                  :to="{
                    name: 'MyFlashcard',
                    params: { my_flashcard_id: data.item.id },
                  }"
                  >{{ data.value }}</router-link
                >
              </template>
              <template #cell(public)="data">
                <b-icon
                  v-if="data.value == 1"
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
                <b-button
                  variant="outline-primary"
                  size="sm"
                  @click="detail(row.item, row.index, $event.target)"
                >
                  Details
                </b-button>
              </template>
            </b-table>

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
                label="Test Name"
                label-for="input-1"
              >
                <b-form-input
                  id="input-1"
                  v-model="formData.name"
                ></b-form-input>
              </b-form-group>
              <b-form-checkbox v-model="checked" name="check-button" switch>
                Share
              </b-form-checkbox>
            </b-form>
          </b-modal>
        </b-tab>
      </b-tabs>
    </b-card>
  </b-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
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
          label: "Card Name",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "public",
          label: "Public",
          sortable: true,
          class: "text-right",
        },
        { key: "actions", label: "Actions", class: "text-right" },
      ],
      fields2: [
        {
          key: "id",
          label: "ID",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "name",
          label: "Card Name",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "user",
          label: "User Created",
          sortable: true,
          sortDirection: "desc",
        },
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
        public: "",
        isEdit: false,
      },
      boxTwo: "",
    };
  },
  created() {
    this.getAllFlashcardsData();
    this.getFlashcardManagerDataClient();
  },
  computed: {
    ...mapGetters({
      myFlashcard: "myFlashcard/myFlashcard",
      clientFlashcardManager: "clientFlashcardManager/flashcardManagerClient",
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
    ...mapActions("clientFlashcardManager", ["getFlashcardManagerDataClient"]),
    ...mapActions("clientFlashcardManager", [
      "storeFlashcardManagerDataClientRequest",
    ]),
    ...mapActions("clientFlashcardManager", [
      "updateFlashcardManagerDataClientRequest",
    ]),
    ...mapActions("clientFlashcardManager", [
      "destroyFlashcardManagerDataClientRequest",
    ]),
    ...mapActions("myFlashcard", ["getAllFlashcardsData"]),
    edit(item, index, button) {
      this.formData.public = "";
      this.formData.name = "";
      this.infoModal.title = `Row index: ${index}`;
      this.formData.id = item.id;
      this.formData.name = item.name;
      this.formData.public = item.public;
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
      this.infoModal.title = "Create";
      this.formData.public = "";
      this.formData.name = "";
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
      this.getFlashcardManagerDataClient();
      this.show = false;
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

        this.updateFlashcardManagerDataClientRequest(this.formData).then(() => {
          this.getCustomers();
        });
      } else {
        // call create customer
        let form = new FormData();
        form.append("name", this.formData.name);
        if (this.checked == true) {
          form.append("public", 1);
        } else {
          form.append("public", 0);
        }
        this.storeFlashcardManagerDataClientRequest(form).then(() => {
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
            this.destroyFlashcardManagerDataClientRequest(item.id).then(() => {
              this.getCustomers();
            });
          }
        })
        .catch((err) => {
          // An error occurred
        });
    },
    detail(row, index, target) {
      this.$router.push("/flashcard-manager/" + row.id);
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