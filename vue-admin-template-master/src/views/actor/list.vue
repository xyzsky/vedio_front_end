<template>
  <div class="app-container">
    <!-- 查询表单 -->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="姓名">
        <el-input v-model="actorQuery.name" placeholder="演员姓名" />
      </el-form-item>
      <el-form-item label="演员类别">
        <el-select v-model="actorQuery.level" placeholder="演员类别">
          <el-option label="喜剧演员" value="1" />
          <el-option label="电影演员" value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="出生时间">
        <el-date-picker
          v-model="actorQuery.createTime"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
          placeholder="选择日期"
        />
      </el-form-item>
      <el-button
        type="primary"
        icon="el-icon-search"
        @click="getActorList()"
      >查询</el-button
      >
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>
    <!-- 列表 -->
    <el-table :data="list" style="width: 100%">
      <el-table-column width="180" label="序号" prop="id" />
      <el-table-column width="180" label="姓名" prop="name" />
      <el-table-column width="180" label="简介" prop="intro" />
      <el-table-column width="180" label="职业类型" prop="career" />
      <el-table-column label="创建时间" prop="createTime" />
      <el-table-column align="right">
        <template slot-scope="scope">
          <router-link :to= "`/actor/edit/${scope.row.id}`" >
            <el-button size="mini" type="primary" icon="el-icon-edit">Edit</el-button>
          </router-link>
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="handleDelete(scope.row.id)"
          >Delete</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页功能 -->
    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      background
      layout="prev, pager, next, total, jumper"
      @current-change="getActorList"
    />
  </div>
</template>

<script>
import actor from '@/api/actor/actor'
export default {
  components: {},
  props: {},
  data() {
    return {
      list: null,
      page: 1,
      limit: 10,
      total: 0,
      actorQuery: {}
    }
  },
  computed: {},
  watch: {},
  beforeCreate() {},
  created() {
    this.getActorList()
  },
  mounted() {},
  methods: {
    getActorList(page = 1) {
      this.page = page
      actor.getActorList(this.page, this.limit, this.actorQuery)
        .then(response => {
          this.list = response.data.list
          this.total = response.data.total
        }).catch(err => { console.log(err) })
    },

    // 清空查询条件
    resetData() {
      this.actorQuery = {}
      this.getActorList()
    },

    // 删除事件
    handleDelete(id) {
      this.$confirm('此操作将删除该演员信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        actor.deleteActorById(id).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getActorList()
        }).catch(err => {
          console.log(err)
        })
      })
    }
  }
}
</script>

<style scoped></style>
