const {loadImg, urls} = require('./1. mock')

class PromiseQueue {
  constructor(options = {}) {
    this.concurrency = options.concurrency || 1
    this.currentCount = 0
    this.pendingList = []
  }

  add(obj) {
    this.pendingList.push({fn: obj.fn, priority: obj.priority})
    this.run()
  }
  
  run() {
    if(this.pendingList.length !== 0 && this.currentCount < this.concurrency) {
      const pendingList = this.pendingList.sort((a, b) => b.priority - a.priority)
      this.currentCount++
      const cb = pendingList.shift()['fn']
      cb().then(() => {
        this.currentCount--
        this.run()
      })
    }
  }
}

const queue = new PromiseQueue({ concurrency: 3 })

const formatTask = (url) => {
  return {
    fn: () => loadImg(url),
    priority: url.priority
  }
}

urls.forEach(url => {
  queue.add(formatTask(url))
})

const highPriorityTask = {
  priority: 10,
  info: 'high!!!!',
  time: 2000
}

queue.add(formatTask(highPriorityTask))