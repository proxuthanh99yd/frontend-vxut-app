<template>
  <div id="edit-test">
    <el-dialog
      :width="width"
      title="Edit Test"
      :visible.sync="dialogFormVisible"
    >
      <slot></slot>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleCancel">Cancel</el-button>
        <el-button type="primary" @click="dialogFormVisibleOk"
          >Confirm</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "AppModalUi",
  props: {
    width: String,
    formLabelWidth: String,
  },
  data() {
    return {
      dialogFormVisible: false,
    };
  },
  methods: {
    dialogFormVisibleOpen() {
      this.dialogFormVisible = true;
    },
    dialogFormVisibleCancel() {
      this.$message("This is cancel edit.");
      this.dialogFormVisible = false;
    },
    dialogFormVisibleOk() {
      this.$emit("Updated");
      this.$message({
        message: "Congrats, this is a success message.",
        type: "success",
      });
      this.dialogFormVisible = false;
    },
  },
};
</script>

<style>
</style>