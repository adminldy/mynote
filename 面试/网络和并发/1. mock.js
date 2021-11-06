const urls = [
  {
    info: 'link1',
    time: 1000,
    priority: 1
  },
  {
    info: 'link2',
    time: 2000,
    priority: 2
  },
  {
    info: 'link3',
    time: 3000,
    priority: 3
  },
  {
    info: 'link4',
    time: 3000,
    priority: 4
  },
  {
    info: 'link5',
    time: 1000,
    priority: 5
  }
]

function loadImg(url) {
  return new Promise((resolve, reject) => {
    console.log('----'+url.info+'---start')
    setTimeout(() => {
      console.log('---' + url.info + '---ok')
      resolve()
    }, url.time)
  })
}

module.exports = {
  urls,
  loadImg
}

