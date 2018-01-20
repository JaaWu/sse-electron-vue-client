<template>
  <div class="layout">
      <div class="connection-container">
        <el-input placeholder="请输入URL" v-model="url" class="input-with-select">
          <!-- <el-select v-model="select" slot="prepend" placeholder="请选择">
          </el-select> -->
          <el-button slot="append" type="primary" @click="connect">{{connected?'断开连接':'建立连接'}}</el-button>
        </el-input>
        <div class="connection-form-wrapper">
          <!-- <el-row :gutter="10"> -->
            <span>连接数</span>
            <el-input size="mini" style="width:100px;" placeholder="请输入连接数" v-model="form.conNum"></el-input>
            <el-col :span="2"><div style="height:40px;"></div></el-col>
            <span>短日志</span>
            <el-switch v-model="form.simpleLog"></el-switch>
            <el-col :span="2"><div style="height:40px;"></div></el-col>
            <span>文件日志</span>
            <el-switch v-model="form.file"></el-switch>
            <el-col :span="2"><div style="height:40px;"></div></el-col>
            <span>滚动日志</span>
            <el-switch v-model="form.gui"></el-switch>
          <!-- </el-row> -->
        </div>
<!--         <div class="connection-form-wrapper">
          <label>连接数</label>
            <el-input placeholder="请输入连接数" v-model="form.conNum"></el-input>
          
            <el-switch v-model="form.cleanLog"></el-switch>
        </div> -->
      </div>
      <log ref="log" :params = "form"></log>
    </div>
</template>

<script>
import Log from './Log'
import SystemInformation from './SystemInformation'

export default {
  data () {
    return {
      connected: false,
      url: '',
      form: {
        conNum: '1',
        simpleLog: false,
        file: true,
        gui: true
      }
    }
  },
  components: {
    Log,
    SystemInformation
  },
  methods: {
    connect () {
      if (!this.isPInt(this.form.conNum)) {
        // console.log(Number.isInteger(this.form.conNum), parseInt(this.form.conNum))
        alert('连接数请输入正整数')
        return
      }

      if (this.connected) {
        this.$refs.log.close()
      } else {
        this.$refs.log.connect(this.url)
      }
      this.connected = !this.connected
    },
    isPInt (str) {
      var g = /^[1-9]*[1-9][0-9]*$/
      return g.test(str)
    }
  }
}
</script>

<style>
.connection-container {
  /*position: fixed;*/
  height: 120px;
}
.layout {
  padding: 15px;
}
.connection-form-wrapper {
  margin-top: 15px;
  height: 40px;
  line-height: 40px;
  display:flex;
  align-items: center;
  /*justify-content:space-between;*/
}
.connection-form-wrapper span {
  /*width:70px;*/
  margin-right: 10px;
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
}
</style>