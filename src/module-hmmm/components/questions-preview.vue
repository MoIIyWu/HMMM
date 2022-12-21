<template>
  <div class='container'>
    <el-dialog title="题目预览" width="60%" :visible="isVisible" @close="onClose">
        <el-row>
          <el-col :span="6">【题型】：{{ questionDetail.questionType | filterQuestionType }}</el-col>
          <el-col :span="6">【编号】：{{ questionDetail.id }}</el-col>
          <el-col :span="6">【难度】：{{ questionDetail.difficulty | filterDifficulty }}</el-col>
          <el-col :span="6">【标签】：{{ questionDetail.tags }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6">【学科】：{{ questionDetail.subjectName }}</el-col>
          <el-col :span="6">【目录】：{{ questionDetail.directoryName }}</el-col>
          <el-col :span="6">【方向】：{{ questionDetail.direction }}</el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row>【题干】：</el-row>
        <el-row class="questionBox">{{ questionDetail.question | html2Text }}</el-row>
        <!-- 如果题型为1的话是单选 -->
        <el-row v-show=" questionDetail.questionType === '1' ">
          <el-row>【{{ questionDetail.questionType | filterQuestionType }}】 选项：（以下选中的选项为正确答案）</el-row>
            <template>
              <el-radio-group v-model="radio">
                  <el-radio :label="item.isRight" @change="onSetCheckList" v-for="(item,index) in questionDetail.options" :key="index">{{ item.title }}</el-radio>
              </el-radio-group>
            </template>
        </el-row>
        <!-- 如果题型为2的话是多选 -->
        <el-row v-show=" questionDetail.questionType === '2' ">
          <el-row>【{{ questionDetail.questionType | filterQuestionType }}】 选项：（以下选中的选项为正确答案）</el-row>
            <template>
              <el-checkbox-group v-model="checkList">
                 <el-checkbox :label="item.title" @change="onSetCheckList" v-for="(item,index) in questionDetail.options" :key="index">{{ item.title }}</el-checkbox>
              </el-checkbox-group>
            </template>
        </el-row>
        <!-- 如果题型为3的话是简答，简答题没有选择框 -->
        <el-row v-show=" questionDetail.questionType === '3' ">
          <el-row>【{{ questionDetail.questionType | filterQuestionType }}】</el-row>
        </el-row>
        <el-divider></el-divider>
        <el-row type="flex" align="middle">
          <el-col :span="6">【参考答案】：</el-col>
          <el-col>
            <el-button type="danger" size="small" @click="controls = !controls">视频答案预览</el-button>
          </el-col>
        </el-row>
        <el-row class="video" v-if="controls">
          <video v-if="questionDetail.videoURL.status === true" v-on:error.prevent="videoLoadError(videoItem)" :src="questionDetail.videoURL" autoplay muted controls></video>
          <video v-else src="../video/videoTest.mp4" autoplay muted controls></video>
        </el-row>
        <el-divider></el-divider>
        <el-row>
          <el-col>【答案解析】：{{ questionDetail.answer | html2Text }}</el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row>
          <el-col>【题目备注】：{{ questionDetail.remarks }}</el-col>
        </el-row>
      <!-- 底部按钮 -->
      <template>
        <el-row type="flex" justify="center">
          <el-button type="primary" @click="onClose" class="closeBtn">关闭</el-button>
        </el-row>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { getQuestionDetailById } from '@/api/hmmm/questions.js'
import { questionType, difficulty } from '@/api/hmmm/constants.js'

export default {
  name: 'questionsPreview',
  props: {
    isVisible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      questionDetail: {},
      checkList: [],
      radio: 1,
      controls: false
    }
  },
  methods: {
    onClose () {
      this.$emit('update:isVisible', false)
      this.controls = false
    },
    async getQuestionDetailById (id) {
      this.checkList = []
      const { data } = await getQuestionDetailById(id)
      this.questionDetail = data
      this.questionDetail.options.forEach(item => {
        if (item.isRight === 1) {
          this.checkList.push(item.title)
        }
      })
    },
    onSetCheckList () {
      // setTimeout(() => {

      // }, 3000)
      this.checkList = []
      this.radio = 1
      this.questionDetail.options.forEach(item => {
        if (item.isRight === 1) {
          this.checkList.push(item.title)
        }
      })
    },
    videoLoadError (videoItem) {
      videoItem.status = false
    }
  },
  filters: {
    filterQuestionType: function (value) {
      const type = questionType.find(item => item.value === Number(value))
      return type ? type.label : ''
    },
    filterDifficulty: function (value) {
      const difficult = difficulty.find(item => item.value === Number(value))
      return difficult ? difficult.label : ''
    }
  }
}
</script>

<style scoped lang='less'>
.el-row{
  margin-bottom: 15px;
}
.closeBtn{
  margin-top: 30px;
}
.el-divider{
  margin: 15px 0;
}
.questionBox{
  color: blue;
}
::v-deep .el-radio{
  display: block;
  margin:15px 0;
}
::v-deep .el-checkbox{
  display: block;
  margin:15px 0;
}
.video video{
  width: 50%;
  height: 50%;
}
</style>
