<template>
  <div class="exam-block">
    <b-overlay
      :show="true"
      no-wrap
      v-if="!resultData || !contestData"
    ></b-overlay>
    <b-row>
      <b-col cols="3"
        ><div class="sidenav">
          <vue-countdown-timer
            @start_callback="startCallBack('event started')"
            @end_callback="endCallBack('event ended')"
            :start-time="startTime"
            :end-time="endTime"
            :interval="1000"
            :start-label="'Start:'"
            :end-label="'End:'"
            label-position="begin"
            :end-text="'Event ended!'"
            :hour-txt="' hours '"
            :minutes-txt="' minutes '"
            :seconds-txt="' seconds '"
          >
            <template slot="start-label" slot-scope="scope">
              <span
                style="color: red"
                v-if="
                  scope.props.startLabel !== '' &&
                  scope.props.tips &&
                  scope.props.labelPosition === 'begin'
                "
                >{{ scope.props.startLabel }}:</span
              >
              <span
                style="color: blue"
                v-if="
                  scope.props.endLabel !== '' &&
                  !scope.props.tips &&
                  scope.props.labelPosition === 'begin'
                "
                >{{ scope.props.endLabel }}:</span
              >
            </template>

            <template slot="countdown" slot-scope="scope">
              <span>{{ scope.props.hours }}</span
              ><i>{{ scope.props.hourTxt }}</i>
              <span>{{ scope.props.minutes }}</span
              ><i>{{ scope.props.minutesTxt }}</i>
              <span>{{ scope.props.seconds }}</span
              ><i>{{ scope.props.secondsTxt }}</i>
            </template>
            <template slot="end-text" slot-scope="scope">
              <span style="color: green">{{ scope.props.endText }}</span>
            </template>
          </vue-countdown-timer>
          <div class="mt-5" style="height: 300px">
            <el-steps
              direction="vertical"
              :active="active"
              finish-status="success"
              v-if="contestData.level_id < 5"
            >
              <el-step title="Bắt  đầu"></el-step>
              <el-step title="Từ vựng - Kanji - Ngữ pháp"></el-step>
              <el-step title="Tạm nghỉ"></el-step>
              <el-step title="Đọc hiểu"></el-step>
              <el-step title="Tạm nghỉ"></el-step>
              <el-step title="Nghe hiểu"></el-step>
              <el-step title="Kết thúc"></el-step>
            </el-steps>
            <el-steps
              direction="vertical"
              :active="active"
              finish-status="success"
              v-else
            >
              <el-step title="Bắt  đầu"></el-step>
              <el-step title="Từ vựng - Kanji - Ngữ pháp - Đọc hiểu"></el-step>
              <el-step title="Tạm nghỉ"></el-step>
              <el-step title="Nghe hiểu"></el-step>
              <el-step title="Kết thúc"></el-step>
            </el-steps>
            <el-button style="margin-top: 12px" @click="next"
              >Next step</el-button
            >
          </div>
        </div></b-col
      >
      <b-col v-if="resultData.listenPoint"
        ><div class="p-2">
          <b-card-group>
            <b-card header="Kết quả" header-tag="header" title="Kết quả">
              <b-card-text class="text-success" v-if="resultData.grammarPoint"
                >Từ vựng : {{ resultData.vocabularyPoint }}/60
              </b-card-text>
              <b-card-text class="text-success" v-else
                >Từ vựng - Ngữ pháp - Đọc hiểu :
                {{ resultData.vocabularyPoint }}/120
              </b-card-text>
              <b-card-text class="text-success" v-if="resultData.grammarPoint"
                >Ngữ pháp - Đọc hiểu : {{ resultData.grammarPoint }}/60
              </b-card-text>
              <b-card-text class="text-success"
                >Nghe hiểu : {{ resultData.listenPoint }}/60</b-card-text
              >
              <b-button size="sm" @click="info" class="mr-1">
                Xem lại
              </b-button>
            </b-card>
          </b-card-group>
        </div></b-col
      >
      <b-col v-else>
        <exam-question
          :test_id="test_id"
          :contest_id="contest_id"
          :level_id="contestData.level_id"
          @startTime="startTime = $event"
          @endTime="endTime = $event"
        ></exam-question>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import ExamQuestion from "./ExamQuestion.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    ExamQuestion,
  },
  data() {
    return {
      startTime: Date.now(),
      endTime: Date.now() + 3000,
      active: 0,
      test_id: Number(this.$route.params.test_id),
      contest_id: null,
      result: false,
    };
  },
  created() {
    this.getResultDataClient(this.test_id);
    this.getContestDataClient(this.test_id);
  },

  computed: {
    ...mapGetters({
      contestData: "clientContest/contestClient",
      resultData: "clientResult/resultClient",
    }),
  },
  name: "Timer",
  methods: {
    ...mapActions("clientContest", ["getContestDataClient"]),
    ...mapActions("clientResult", ["getResultDataClient"]),
    startCallBack: function (x) {},
    endCallBack: function (x) {
      this.next();
    },
    next() {
      if (this.active++ > 5) this.$router.push("/");
      //backhome
      this.test_id = Number(this.$route.params.test_id);
      this.contest_id = this.active;
      switch (this.contestData.level_id) {
        case 2:
          this.startTime = Date.now();
          this.endTime = Date.now() + 1500000;
          break;
        case 3:
          this.startTime = Date.now();
          this.endTime = Date.now() + 1800000;
          break;
        case 4:
          this.startTime = Date.now();
          this.endTime = Date.now() + 1800000;
          break;
        case 5:
          this.startTime = Date.now();
          this.endTime = Date.now() + 6300000;
          break;
      }
    },
    info() {
      this.$router.push("/result-history/" + this.$route.params.test_id);
    },
  },
};
</script>

<style scoped>
.exam-block {
  position: relative;
}
.sidenav {
  height: 70%;
  width: 20%;
  position: fixed;
  z-index: 1;
  background: #eee;
  overflow-x: hidden;
  padding: 8px 20px;
}
</style>