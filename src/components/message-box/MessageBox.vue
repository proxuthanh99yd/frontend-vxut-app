<template>
  <el-button type="text" @click="open">Click to open Message Box</el-button>
</template>

<script>
export default {
  methods: {
    open() {
      const h = this.$createElement;
      this.$msgbox({
        title: "Message",
        message: h("p", null, [
          h("span", null, "Message can be "),
          h("i", { style: "color: teal" }, "VNode"),
        ]),
        showCancelButton: true,
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = "Loading...";
            setTimeout(() => {
              done();
              setTimeout(() => {
                instance.confirmButtonLoading = false;
              }, 300);
            }, 3000);
          } else {
            done();
          }
        },
      }).then((action) => {
        this.$message({
          type: "info",
          message: "action: " + action,
        });
      });
    },
  },
};
</script>