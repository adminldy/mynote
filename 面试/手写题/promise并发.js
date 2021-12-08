const urls = [{
  info: 'link1',
  time: 3000,
}, {
  info: 'link2',
  time: 2500
}, {
  info: 'link3',
  time: 1600
}, {
  info: 'link4',
  time: 1000
}, {
  info: 'link5',
  time: 2000
}]

function loadImg(url) {
  return new Promise((resolve, reject) => {
    console.log('----' + url.info + 'start: ')
    setTimeout(() => {
      console.log('---end' + url.info)
      resolve(url.info)
    }, url.time)
  })
}