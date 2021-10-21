#### 一、流程
首先启动一个服务

1. 当用户访问/时 拦截入口请求， 返回给用户处理过的html文件

```js
app.get('/', (req, res) => {
  res.set('Content-Type', 'text/html')
  // 获取html文件绝对路径
  const htmlPath = join(__dirname, '../target', 'index.html')
  // 根据路径读取文件， 获取到文件的字符串
  let html = readFileSync(htmlPath, 'utf-8')
  // 塞入客户端代码
  html = html.replace('<head>', '<head>\n<script type="module" src="/@vite/client.js"></script>') // 这时浏览器会发送这个src请求
  // 把html返回给浏览器
  res.send(html)
})
```
2. 拦截客户端代码

```ts
app.get('/@vite/client', (req,res) => {
  res.set('Content-Type', 'application/javascript')
  res.send(
    transformCode({
      code: readFileSync(join(__dirname, 'client.js'))
    }).code // 利用esbuild 把 代码转成es6格式的
  )
})
```
client

```ts
// 客户端 - 服务端建立一个通信
const socket = new WebSocket(`ws://${host}`, 'vite-hmr');

// 监听通信，拿数据，然后做处理
socket.addEventListener('message', async ({ data }) => {
  handleMessage(JSON.parse(data)).catch(console.error);
})

async function handleMessage(payload) {
  switch(payload.type) {
    case 'connected': 
      console.log('[vite] connected.');

      setInterval(() => socket.send('ping'), 30000);
      break;
    case 'update': 
      payload.updates.forEach( async (update) => {
        if (update.type === 'js-update') {
          console.log('[vite] js update....');
          await import(`/target/${update.path}?t=${update.timestamp}`);

          // mock
          location.reload();
        }
      })
      break;
  }
}

```

3. 静态文件的处理， 返回给浏览器能认识的
  
```ts
app.get('/target/*', (res ,res) => {
  // 分别处理对应的请求
  switch(extname(req.path)) {
    case '.svg': 
    case '.css':
    case '.jsx' // 把jsx转成js
    // 判断import的是从node_modules中还是本地的
    // 本地的直接绝对路径 然后去请求, node_modules则通过预处理把他缓存起来 以后在请求直接读取缓存
  }
})
```

4. 服务端监听文件改变， 通知浏览器re-render（重新渲染）

```ts
// 文件变化了执行的回调，里面其实就是用 websocket 推送变更数据
function handleHMRUpdate(opts) {
  const {file, ws} = opts;
  const shortFile = getShortName(file, targetRootPath);
  const timestamp = Date.now();
  let updates
  if (shortFile.endsWith('.css') || shortFile.endsWith('.jsx')) {
    updates = [
      {
        type: 'js-update',
        timestamp,
        path:  `/${shortFile}`,
        acceptedPath: `/${shortFile}`
      }
    ]

  ws.send({
    type: 'update',
    updates
  })
}
```

#### 二、梳理: 

1. 启一个node服务
2. 模板项目的文件， 就都走静态资源路径了
3. html返回
4. html返回之前，塞一个client进去 <script src="@/vite/client" type="module"></script>
5. 写这个接口 @/vite/client -> 内置的client.js -> HMR
6. server - websocket - client
7. 监听文件变更(通过第三方库) -> 封装一个数据结构(变更) -> websocket -> client
8. 其他类型的文件 如.css .jsx 的处理
9. css -> js -> createElement('style') -> header
10. .jsx -> .js (引用三方，本地) / 三方(缓存) + 本地(拼路径)
11. plugin 系统

// 每次import浏览器都会发一个请求