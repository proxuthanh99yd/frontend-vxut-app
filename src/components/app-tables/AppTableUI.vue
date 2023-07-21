<template>
  <div id="app-table-ui">
    <app-ac-top :detail="detail" v-if="tableData" />
    <el-table
      highlight-current-row
      :data="
        pagedTableData.filter(
          (data) =>
            !search || data.name.toLowerCase().includes(search.toLowerCase())
        )
      "
      style="width: 100%"
    >
      <el-table-column v-if="detail != 'Question'" label="ID" prop="id">
      </el-table-column
      ><el-table-column v-if="detail === 'Question'" type="expand">
        <template slot-scope="props">
          <ul
            class="list-group list-group-flush"
            v-for="prop in props.row.answer"
            :key="prop.index"
          >
            <li class="list-group-item">Caau tra loi 1 : {{ prop.answer1 }}</li>
            <li class="list-group-item">Caau tra loi 2 : {{ prop.answer2 }}</li>
            <li class="list-group-item">Caau tra loi 3 : {{ prop.answer3 }}</li>
            <li class="list-group-item">Caau tra loi 4 : {{ prop.answer4 }}</li>
          </ul>
        </template>
      </el-table-column>
      <el-table-column v-if="detail === 'Question'" label="Name" prop="name">
      </el-table-column>
      <el-table-column v-else label="Name">
        <template slot-scope="scope">
          <router-link :to="nextPage">{{ scope.row.name }}</router-link>
        </template>
      </el-table-column>
      <el-table-column label="Level" prop="level.name"> </el-table-column>
      <el-table-column label="UserCreate" prop="user.name"> </el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="">
          <el-button size="lager" @click="handleCreate">Create</el-button>
        </template>
        <template slot-scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
            >Edit</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click.native.prevent="deleteRow(scope.$index, tableData)"
            >Delete</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { BIconShieldSlashFill } from "bootstrap-vue";
import AppAcTop from "../app-dashboard-actop/DashboardAcTopUi.vue";
export default {
  components: { AppAcTop },
  props: {
    tableData: Array,
    detail: String,
    handleSizeChange: Number,
    handleCurrentChange: Number,
    nextPage: Object,
    question: String,
  },
  data() {
    return {
      search: "",
      page: 1,
      pageSize: 10,
    };
  },
  computed: {
    pagedTableData() {
      return this.tableData.slice(
        this.handleSizeChange * this.handleCurrentChange -
          this.handleSizeChange,
        this.handleSizeChange * this.handleCurrentChange
      );
    },
  },
  methods: {
    handleEdit(index, row) {
      this.$emit("edit", index, row);
    },
    deleteRow(index, row) {
      this.$confirm("delete  Continue?", "Warning", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "warning",
      })
        .then(() => {
          row.splice(index, 1);
          this.$message({
            type: "success",
            message: "Delete completed",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Delete canceled",
          });
        });
    },
    handleCreate() {
      this.$emit("create");
    },
  },
};
</script>
<style lang="scss" scoped>
</style>