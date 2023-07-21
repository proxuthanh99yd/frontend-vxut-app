<template>
  <b-container>
    <el-page-header
      class="m-2 mb-4 col-md-10"
      @back="goBack"
      content="Test skills "
    ></el-page-header>
    <b-overlay :show="true" no-wrap v-if="!testSkillDataClient"></b-overlay>
    <!-- User Interface controls -->
    <b-card>
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
      <!-- Main table element -->
      <b-table
        :aria-hidden="show ? 'true' : null"
        :key="key"
        v-if="testSkillDataClient"
        :items="testSkillDataClient"
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
              name: 'ClientTestSkillQuestion',
              params: { test_skill_id: data.item.id },
            }"
            >{{ data.value }}</router-link
          >
        </template>
        <template #cell(level)="data">
          {{ data.value.name }}
        </template>
        <template #cell(skill)="data">
          {{ data.value.name }}
        </template>
        <template #cell(user)="data">
          {{ data.value.name }}
        </template>
      </b-table>
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
          label: "Test Skill Name",
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
          key: "skill",
          label: "Skill",
          sortable: true,
          class: "text-right",
        },
        {
          key: "user",
          label: "User Created",
          sortable: true,
          class: "text-right",
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
    };
  },
  created() {
    this.getTestSkillDataClient({
      level_id: this.$route.params.level_id,
      skill_id: this.$route.params.skill_id,
    });
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length;
  },
  computed: {
    ...mapGetters({
      testSkillDataClient: "clientTestSkill/testSkillClient",
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
  methods: {
    ...mapActions("clientTestSkill", ["getTestSkillDataClient"]),
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
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