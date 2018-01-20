const log4js = require('log4js')
const fs = require('fs')

class Logger {
  static getInstance() { // 单例
    if (!Logger._instance) {
      Logger._instance = new Logger();
    }
    return Logger._instance;
  }

  logFile = true // 是否记录到文件
  logGUI = true // 是否记录到界面
  shortLog = false // 是否仅记录时间

  guiLogger
  fileLogger

  info(e, id) {
    console.log(this.fileLogger)
    this.logFile && this.fileLogger && this.fileLogger.info(this.shortLog ? `[${id}]` : `[${id}] ${JSON.stringify(e)}`)
    this.logGUI && this.guiLogger && this.guiLogger.info(e, id)
  }
  error(e, id) {
    this.logFile && this.fileLogger.error('sse error')
    this.logGUI && this.guiLogger.error(e, id)
  }

  async initFileLogger() {
    const hasFolder = await checkFolder()
    this.fileLogger = hasFolder ? initLog4js() : undefined
  }

  initGuiLogger(info, error) {
    this.guiLogger = {
      info: info,
      error: error
    }
  }
}

const checkFolder = () => {
  return new Promise((resolve, reject) => {
    fs.stat('./sse-log', (err, stats) => {
      if (err) {
        // Directory doesn't exist or something.
        console.log('Folder doesn\'t exist, so I made the folder ')
        fs.mkdir('sse-log', err => {
          resolve(true)
        })
      } else if (!stats.isDirectory()) {
        // This isn't a directory!
        resolve(false)
      } else {
        resolve(true)
      }
    })
  })
}

const initLog4js = () => {
  log4js.configure({
    appenders: {
      sse: {
        type: 'file',
        filename: './sse-log/info.log',
        axLogSize: 10485760
      }
    },
    categories: { default: { appenders: ['sse'], level: 'info' } }
  })

  return log4js.getLogger('sse')
}

const logger = Logger.getInstance()
export default logger
