<template>
  <div>
    <el-container>
      <el-main>
        <el-row>
          <el-col :span="8" :offset="8"
            ><b-overlay :show="show" rounded="sm">
              <el-card class="box-card">
                <el-form
                  :model="ruleForm"
                  status-icon
                  :rules="rules"
                  ref="ruleForm"
                  label-width="120px"
                  class="demo-ruleForm"
                >
                  <el-form-item
                    prop="email"
                    label="Email"
                    :rules="[
                      {
                        required: true,
                        message: 'Please input email address',
                        trigger: 'blur',
                      },
                      {
                        type: 'email',
                        message: 'Please input correct email address',
                        trigger: ['blur', 'change'],
                      },
                    ]"
                  >
                    <el-input
                      autocomplete="on"
                      v-model="ruleForm.email"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="Password" prop="password">
                    <el-input
                      type="password"
                      v-model="ruleForm.password"
                      autocomplete="off"
                    ></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')"
                      >Submit</el-button
                    >
                    <el-button @click="resetForm('ruleForm')">Reset</el-button>
                    <el-button @click="$router.push('/register')"
                      >Đăng kí</el-button
                    >
                  </el-form-item>
                </el-form>
              </el-card></b-overlay
            >
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Login",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please input the password"));
      } else {
        callback();
      }
    };
    return {
      show: false,
      ruleForm: {
        email: "",
        password: "",
      },
      rules: {
        password: [{ validator: validatePass, trigger: "blur" }],
      },
    };
  },
  computed: {
    ...mapGetters(["errors"]),
  },

  mounted() {
    this.$store.commit("setErrors", {});
  },
  methods: {
    ...mapActions("auth", ["sendLoginRequest"]),
    submitForm(formName) {
      this.show = true;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.sendLoginRequest(this.ruleForm).then(() => {
            this.$router.push({ name: "HomePage" });
          });
        } else {
          console.log("error submit!!");
          this.show = false;
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
<style lang="scss" scoped>
.box-card {
  margin-top: 20px;
}
</style>