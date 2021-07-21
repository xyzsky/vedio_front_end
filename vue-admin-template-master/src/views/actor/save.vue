<template>
  <div class="app-container">
    <h2>{{ this.$route.meta.title }}</h2>
    <el-form ref="form" :model="actor" label-width="120px">
      <el-form-item label="演员姓名">
        <el-input v-model="actor.name"/>
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="actor.level" placeholder="请选择演员类型">
          <el-option :value="1" label="喜剧演员"/>
          <el-option :value="2" label="电影演员"/>
        </el-select>
      </el-form-item>
      <el-form-item label="职业">
        <el-input v-model="actor.career"/>
      </el-form-item>
      <el-form-item label="排序">
        <el-input v-model="actor.sort"/>
      </el-form-item>
      <el-form-item label="简介">
        <el-input v-model="actor.intro" :rows="10" type="textarea"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import actor from '@/api/actor/actor'
export default {
  components: {},
  props: {},
  data() {
    return {
      actor: {
        name: '',
        intro: '',
        career: '',
        level: 1,
        sort: 0,
        avatar: null
      }
    }
  },
  computed: {},
  watch: {
    // 监听，因为缓存可能造成一些bug
    $route(to, from) { // 路由变化
      this.init()
    }
  },
  beforeCreate() {},
  created() {
    this.init()
  },
  mounted() {},
  methods: {
    init() {
      if (this.$route.params && this.$route.params.id) {
        const id = this.$route.params.id
        this.getActorInfo(id)
      } else {
        this.actor = {}
      }
    },
    onReset() {
      this.actor = {}
    },
    onSubmit() {
      this.$confirm(`确定${this.$route.name}?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.$route.name === '添加') {
          this.saveActor()
        } else {
          this.updateActor()
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消' + this.$route.name
        })
      })
    },
    // 根据 id 得到演员信息
    getActorInfo(id) {
      actor.getActorInfo(id).then(res => {
        this.actor = res.data.actor
      })
    },
    // 修改信息
    updateActor() {
      actor.updateActor(this.actor)
        .then(res => {
          this.$message({
            type: 'success',
            message: `成功修改演员 ${this.actor.name} 的信息!`
          })
          // 进行路由跳转
          this.$router.push({ path: '/actor/list' })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消更新'
          })
        })
    },
    // 保存信息
    saveActor() {
      actor.addActor(this.actor).then(res => {
        this.$message({
          type: 'success',
          message: `成功添加演员 ${this.actor.name} !`
        })
        // 进行路由跳转
        this.$router.push({ path: '/actor/list' })
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
</style>
