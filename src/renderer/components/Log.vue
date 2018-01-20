<template>
  <div class="log-layout">
    <div>
      <div class="log-header">
        <span class="log-title">日志</span>
        <div class="log-delete">
          <el-button type="primary" icon="el-icon-delete" @click ="clear"></el-button>
        </div>
      </div>
    </div>
    <div class="log-container">
      <div class="log-txt-block" ref='scroll'>
        <div v-html="logTxt">
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ConnectionManager from '../common/ConnectionManager'
  import { DateFormat } from '../common/Utils'
  import logger from '../common/Logger'
  export default {
    data () {
      return {
        conMgr: null,
        logTxt: '',
        state: true,
        msg: false
      }
    },
    props: {
      params: {
        type: Object,
        default: {
          conNum: '1',
          simpleLog: false,
          file: true,
          gui: true
        }
      }
    },
    methods: {
      log (e, id, type) {
        logger.logGUI = this.params.gui
        logger.logFile = this.params.file
        logger.shortLog = this.params.simpleLog
        type === 'info' ? logger.info(e, id) : logger.error(e, id)
      },
      info (e, id) {
        this.logTxt += `[${DateFormat(new Date(), 'MM-dd HH:mm:ss')}]&nbsp-[${id}]&nbsp${JSON.stringify(e)}</br>`
        
        this.$nextTick().then(res => {
          this.$refs.scroll.scrollTop = this.$refs.scroll.scrollHeight
        })
      },
      error (e, id) {
        this.info('sse error', id)
      },
      clear () {
        this.logTxt = ''
      },
      connect (url) {
        console.log('connect', url)
        this.conMgr.creatConnectionWithTimes(url, parseInt(this.params.conNum))
      },
      close () {
        this.conMgr.close()
      }
    },
    mounted () {
      logger.initFileLogger()
      logger.initGuiLogger(this.info, this.error)
      this.conMgr = new ConnectionManager(this.log)
    }
  }
</script>

<style>
.log-layout {
  -webkit-box-direction: normal;
}
.log-container {
  position: absolute;
  border: solid 1px #dcdfe6;
  border-radius: 4px;
  padding: 10px 15px;
  /*margin-top: 300px;*/
  /*padding-top: 150px;*/
  left: 15px;
  top: 180px;
  bottom: 15px;
  right: 15px;
  /*overflow: auto;*/
}
.log-container .log-txt-block {
  overflow: auto;
  height: 100%;
}
.log-header {
  /*position: absolute;*/
  /*top: 150px;*/
  /*width:100%;*/
  /*padding: 0 15px;*/
  display:flex;
  justify-content:space-between;
  align-items: center;
}
.log-header .log-title, .log-header .log-delete {
  /*display: inline-block;*/
}
.log-header .log-delete {
  /*position: absolute;*/
  /*right: 0;*/
}

.log-delete .el-button.el-button--primary {
  padding: 7px 12px !important;
}
</style>