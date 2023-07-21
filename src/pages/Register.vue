<template>
  <div>
    <el-container>
      <el-main>
        <el-row>
          <el-col :span="8" :offset="8">
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
                  prop="name"
                  label="Name"
                  :rules="[
                    {
                      required: true,
                      message: 'Please input name',
                      trigger: 'blur',
                    },
                  ]"
                >
                  <el-input
                    autocomplete="on"
                    v-model="ruleForm.name"
                  ></el-input>
                </el-form-item>
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
                <el-form-item label="Confirm" prop="c_password">
                  <el-input
                    type="password"
                    v-model="ruleForm.c_password"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm')"
                    >Submit</el-button
                  >
                  <el-button @click="resetForm('ruleForm')">Reset</el-button>
                  <el-button @click="$router.push('/login')"
                    >Đăng nhập</el-button
                  >
                </el-form-item>
              </el-form>
            </el-card>
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
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please input the password again"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("Two inputs don't match!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        name: "",
        email: "",
        password: "",
        c_password: "",
      },
      rules: {
        password: [{ validator: validatePass, trigger: "blur" }],
        c_password: [{ validator: validatePass2, trigger: "blur" }],
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
    ...mapActions("auth", ["sendRegisterRequest"]),
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.sendRegisterRequest(this.ruleForm).then((rs) => {
            this.$router.push({ name: "HomePage" });
          });
          console.log(this.ruleForm);
        } else {
          console.log("error submit!!");
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