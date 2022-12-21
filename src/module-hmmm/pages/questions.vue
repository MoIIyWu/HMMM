<template>
  <div class="container">
    <el-card>
      <el-form :model="baseSubjectForm">
        <el-row type="flex" justify="space-between">
          <p class="description">说明：目前支持学科和关键字条件筛选</p>
          <el-form-item>
            <el-button size="small" type="success" icon="el-icon-edit" @click="$router.push('/questions/new')">新增试题</el-button>
          </el-form-item>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="学科" label-width="80px" prop="subjectID">
              <el-select
                placeholder="请选择"
                @focus="onSelectSub"
                v-model="baseSubjectForm.subjectID"
                @change="onChangeSub(baseSubjectForm.subjectID)">
                <el-option
                  :label="item.label"
                  :value="item.value"
                  v-for="(item, index) in subjectList"
                  :key="item[index]">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <!-- <el-form-item label="二级目录" label-width="80px">
              <el-select placeholder="请选择" v-model="baseSubjectForm.twoLevelDirectory">
                <el-option :label="item.label" :value="item.value" v-for="(item,index) in twoLevelDirectoryList" :key="item[index]"></el-option>
              </el-select>
            </el-form-item> -->
            <el-form-item label="二级目录" label-width="80px">
              <el-select
                placeholder="请选择"
                v-model="baseSubjectForm.twoLevelDirectory">
                <el-option
                  :label="item.directoryName"
                  :value="item.id"
                  v-for="(item, index) in twoLevelDirectoryList"
                  :key="item[index]">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="标签" label-width="80px">
              <el-select placeholder="请选择" v-model="baseSubjectForm.tags">
                <el-option
                  :label="item.label"
                  :value="item.value"
                  v-for="(item, index) in TagsList"
                  :key="item[index]">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="关键字" label-width="80px">
              <el-input
                placeholder="根据题干搜索"
                v-model="baseSubjectForm.keyword">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="试题类型" label-width="80px">
              <el-select
                placeholder="请选择"
                v-model="baseSubjectForm.questionType">
                <el-option
                  :label="item.label"
                  :value="item.value"
                  v-for="(item, index) in questionType"
                  :key="item[index]">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="难度" label-width="80px">
              <el-select
                placeholder="请选择"
                v-model="baseSubjectForm.difficulty">
                <el-option :label="item.label"
                  :value="item.value"
                  v-for="(item, index) in difficulty"
                  :key="item[index]">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="方向" label-width="80px">
              <el-select
                placeholder="请选择"
                v-model="baseSubjectForm.direction">
                <el-option :label="item"
                  :value="item"
                  v-for="(item, index) in direction"
                  :key="item[index]">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item
              label="录入人"
              label-width="80px">
              <el-select placeholder="请选择" @focus="getUsersList" v-model="baseSubjectForm.creatorID">
                <el-option :label="item.username" :value="item.id" v-for="(item,index) in creatorID" :key="item[index]"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item
              label="题目备注"
              label-width="80px">
              <el-input v-model="baseSubjectForm.remarks"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="企业简称" label-width="80px">
              <el-input v-model="baseSubjectForm.shortName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="城市" label-width="80px">
              <el-row type="flex" justify="space-between">
                <el-select
                  placeholder="请选择"
                  class="selectCity"
                  @change="laodArea"
                  v-model="baseSubjectForm.province">
                  <el-option :label="item" :value="item" v-for="(item,index) in provinceList" :key="index"></el-option>
                </el-select>
                <el-select placeholder="请选择" v-model="baseSubjectForm.city">
                  <el-option :label="item" :value="item" v-for="(item,index) in cityList" :key="index"></el-option>
                </el-select>
              </el-row>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-row type="flex" justify="end">
              <el-button size="small" @click="onClernAll">清除</el-button>
              <el-button size="small" type="primary" @click="onSearch">搜索</el-button>
            </el-row>
          </el-col>
        </el-row>

        <el-alert
          :title="`数据一共${total}条`"
          type="info"
          :closable="false"
          show-icon>
        </el-alert>

        <el-table :data="baseTitleList">
          <el-table-column
            label="试题编号"
            prop="number"
            width="120px">
          </el-table-column>
          <el-table-column label="学科" prop="subject"></el-table-column>
          <el-table-column label="目录" prop="catalog"></el-table-column>
          <el-table-column label="题型" prop="questionType">
            <template v-slot="{ row }">
              {{ row.questionType | filterQuestionType }}
            </template>
          </el-table-column>
          <el-table-column label="题干" prop="question" width="280px">
            <template v-slot="{ row }">
              {{ row.question | html2Text }}
            </template>
          </el-table-column>
          <el-table-column label="录入时间" prop="addDate" width="180px">
            <template v-slot="{ row }">
              {{ row.addDate | formatAddTime }}
            </template>
          </el-table-column>
          <el-table-column label="难度" prop="difficulty">
            <template v-slot="{ row }">
              {{ row.difficulty | filterDifficulty }}
            </template>
          </el-table-column>
          <el-table-column label="录入人" prop="creator"></el-table-column>
          <el-table-column label="操作" width="200px">
            <template v-slot="{ row }">
              <el-button
                type="primary"
                icon="el-icon-view"
                circle
                title="预览"
                @click="onPreview(row.id)"
                >
              </el-button>
              <el-button
                type="success"
                icon="el-icon-edit"
                circle
                title="修改"
                @click="$router.push(`/questions/new?id=${id}`)"
                >
              </el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                circle
                title="删除"
                @click="onDel(row.id)"
                >
              </el-button>
              <el-button
                type="warning"
                icon="el-icon-check"
                circle
                title="加入精选"
                @click="onChoiceState(row.id)"
                >
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="this.pageInfo.page"
          :page-sizes="[5, 10, 20, 50]"
          :page-size="this.pageInfo.pagesize"
          layout=" prev, pager, next,sizes, jumper"
          :total="total">
        </el-pagination>
      </el-form>
    </el-card>

    <!-- 题目预览弹窗 -->
    <questionsPreview :isVisible.sync="isVisible" ref="questionsPreviewRef" />
  </div>
</template>

<script>
import {
  getBaseQuestionList,
  getSubjectsList,
  getTwoLevelDirectoryList,
  getTagsById,
  getUsersList,
  setchoiceState
} from '@/api/hmmm/questions.js'
import { questionType, difficulty, direction } from '@/api/hmmm/constants.js'
import { provinces, citys } from '@/api/hmmm/citys.js'
import questionsPreview from '../components/questions-preview.vue'

export default {
  name: 'questions',

  components: {
    questionsPreview
  },
  data () {
    return {
      pageInfo: {
        page: 1,
        pagesize: 5,
        keyword: ''
      },
      total: 0,
      baseTitleList: [],
      baseSubjectForm: {
        subjectID: '',
        twoLevelDirectory: '',
        tags: '',
        keyword: '',
        questionType: null,
        difficulty: null,
        direction: null,
        creatorID: '',
        remarks: '',
        shortName: '',
        province: '',
        city: ''
      },
      subjectList: [],
      twoLevelDirectoryList: [],
      TagsList: [],
      questionType: [],
      difficulty: [],
      direction: [],
      creatorID: [],
      provinceList: [],
      cityList: [],
      isVisible: false
    }
  },
  mounted () {
    this.loadBaseTitleList()
    // 页面一加载的时候就加载市
    this.laodCity()

    this.questionType = questionType
    this.difficulty = difficulty
    this.direction = direction
  },
  methods: {
    handleSizeChange (newPageSize) {
      this.pageInfo.pagesize = newPageSize
      this.loadBaseTitleList()
    },
    handleCurrentChange (newPage) {
      this.pageInfo.page = newPage
      this.loadBaseTitleList()
    },
    async loadBaseTitleList () {
      const { data } = await getBaseQuestionList(this.pageInfo)
      this.baseTitleList = data.items
      this.total = data.counts
    },
    async onSelectSub () {
      this.baseSubjectForm.twoLevelDirectory = ''
      this.baseSubjectForm.tags = ''
      const { data } = await getSubjectsList()
      this.subjectList = data
      // console.log(this.subjectList)
    },
    // async onChangeSub (subjectID) {
    //   const { data } = await getTwoLevelDirectoryList(subjectID)
    //   this.twoLevelDirectoryList = data
    //   // console.log(this.twoLevelDirectoryList)
    // }
    async onChangeSub (subjectID) {
      const { data } = await getTwoLevelDirectoryList({ subjectID })
      this.twoLevelDirectoryList = data.items
      // 获取标签详情
      const tags = await getTagsById({ subjectID })
      this.TagsList = tags.data
    },
    async getUsersList () {
      const { data } = await getUsersList()
      this.creatorID = data
    },
    // 渲染城市
    laodCity () {
      this.provinceList = provinces()
    },
    // 渲染区
    async laodArea (value) {
      this.baseSubjectForm.city = ''
      this.cityList = await citys(value)
    },
    onClernAll () {
      this.baseSubjectForm = {
        subjectID: '',
        twoLevelDirectory: '',
        tags: '',
        keyword: '',
        questionType: null,
        difficulty: null,
        direction: null,
        creatorID: '',
        remarks: '',
        shortName: '',
        province: '',
        city: ''
      }
      // 再重新请求一次所有的数据
      this.loadBaseTitleList()
    },
    async onSearch () {
      // 将搜索时需要的参数定义成一个对象
      const newObj = {
        page: this.pageInfo.page,
        pagesize: this.pageInfo.pagesize,
        keyword: this.baseSubjectForm.keyword,
        subjectID: this.baseSubjectForm.subjectID
      }
      try {
        const { data } = await getBaseQuestionList({ ...newObj })
        // 将得到的总数和新数组重新赋值给baseTitleList
        this.total = data.counts
        this.baseTitleList = data.items
        this.$message.success('下列是您按照条件搜索的结果~~')
      } catch (error) {
        this.$message.warning('没搜索到^-^!!')
      }
    },
    async onPreview (id) {
      this.$refs.questionsPreviewRef.getQuestionDetailById(id)
      this.isVisible = true
    },
    async onChoiceState (id) {
      try {
        await this.$confirm('此操作将该题目加入精选, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        })
        await setchoiceState(id)
        this.$message.success('加入精选成功')
      } catch (error) {
        this.$message.warning('取消了加入精选')
      }
    },
    async onDel (id) {
      try {
        await this.$confirm('此操作将永久删除该题目, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await setchoiceState(id)
        this.$message.success('删除成功')
      } catch (error) {
        this.$message.warning('取消了删除')
      }
    }
  },
  filters: {
    formatAddTime: function (time) {
      const date = new Date(time)
      const year = date.getFullYear()
      const month = (date.getMonth() + '').padStart(2, '0')
      const day = (date.getDate() + '').padStart(2, '0')
      const hh = (date.getHours() + '').padStart(2, '0')
      const mm = (date.getMinutes() + '').padStart(2, '0')
      const ss = (date.getSeconds() + '').padStart(2, '0')
      return `${year}-${month}-${day} ${hh}:${mm}:${ss}`
    },
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

<style scoped lang="less">
.el-card {
  margin: 10px;
  .description {
    font-size: 12px;
    color: pink;
    margin: 0;
  }
  .selectCity {
    margin-right: 5px;
  }
  ::v-deep .el-input--medium .el-input__inner {
    height: 32px;
    line-height: 32px;
  }
  ::v-deep .el-table {
    margin-top: 15px;
    margin-bottom: 25px;
    .el-button--primary {
      color: #409eff;
      background: #ecf5ff;
      border-color: #b3d8ff;
      &:hover {
        color: #fff;
        background-color: #409eff;
        border-color: #409eff;
      }
    }
    .el-button--success {
      color: #67c23a;
      background: #f0f9eb;
      border-color: #c2e7b0;
      &:hover {
        color: #fff;
        background-color: #67c23a;
        border-color: #67c23a;
      }
    }
    .el-button--danger {
      color: #f56c6c;
      background: #fef0f0;
      border-color: #fbc4c4;
      &:hover {
        color: #fff;
        background-color: #f56c6c;
        border-color: #f56c6c;
      }
    }
    .el-button--warning {
      color: #e6a23c;
      background: #fdf6ec;
      border-color: #f5dab1;
      &:hover {
        color: #fff;
        background-color: #e6a23c;
        border-color: #e6a23c;
      }
    }
  }
  .el-pagination {
    text-align: end;
    ::v-deep .el-pagination__jump {
      margin-left: 0;
    }
  }
}
</style>
