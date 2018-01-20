import EventSrcPolly from 'eventsource'

class Connection {
  constructor (url, logger, id) {
    console.log('new Connection')
    this.es = new EventSrcPolly(url)
    this.es.onmessage = e => {
      logger(e, id, 'info')
    }
    this.es.onerror = e => {
      logger(e, id, 'error')
      this.es.close()
    }
    this.es.onopen = e => {
      logger(e, id, 'info')
    }
  }
  es
}

class ConnectionManager {
  constructor (logger) {
    this.logger = logger
  }
  count = 0
  connections = []
  creatConnection (url) {
    this.connections.push(new Connection(url, this.logger, this.count))
  }
  creatConnectionWithTimes (url, times) {
    console.log(url, times)
    for (let i = 0; i < times; i++) {
      this.count++
      this.creatConnection(url)
    }
  }

  close () {
    this.connections.forEach(con => con.es.close())
    this.connections = []
    this.count = 0
  }
}

export default ConnectionManager
