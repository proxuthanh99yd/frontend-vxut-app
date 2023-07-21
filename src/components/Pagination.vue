<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6" :offset="0"
        ><el-pagination
          background
          layout="sizes, prev, pager, next"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage2"
          :page-sizes="[5, 10, 20, 30]"
          :page-size="100"
        >
        </el-pagination
      ></el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    total: Number,
  },
  data() {
    return {
      currentPage2: 1,
    };
  },
  methods: {
    handleSizeChange(val) {
      this.$emit("handleSizeChange", val);
    },
    handleCurrentChange(val) {
      this.$emit("handleCurrentChange", val);
    },
  },
};
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>