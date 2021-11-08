let http = require('http')
http.createServer(function(req,res){
  let url = req.url
  if(url === '/users') {
    res.end(JSON.stringify([
      {
        "name": "ldy",
        "age": 18
      }
    ]))
  }else {
    res.end('Not Found')
  }
 
}).listen(3000)