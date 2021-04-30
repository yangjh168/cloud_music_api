const fs = require('fs')
const path = require('path')
const express = require('express')
const request = require('./utils/request')
const { cookieToJson } = require('./utils/index')
const config = require('./config/index')

const app = express()
const port = process.env.PORT || 3030
const host = process.env.HOST || ''

// CORS & Preflight request
app.use((req, res, next) => {
  if (req.path !== '/' && !req.path.includes('.')) {
    res.set({
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Origin': req.headers.origin || '*',
      'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type',
      'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
      'Content-Type': 'application/json; charset=utf-8'
    })
  }
  req.method === 'OPTIONS' ? res.status(204).end() : next()
})

// cookie parser
app.use((req, res, next) => {
  req.cookies = {}
  ;(req.headers.cookie || '').split(/\s*;\s*/).forEach((pair) => {
    const crack = pair.indexOf('=')
    if (crack < 1 || crack === pair.length - 1) return
    req.cookies[
      decodeURIComponent(pair.slice(0, crack)).trim()
    ] = decodeURIComponent(pair.slice(crack + 1)).trim()
  })
  next()
})

// body parser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// 静态资源
app.use(express.static(path.join(__dirname, 'public')))

// cache
// app.use(cache('2 minutes', (req, res) => res.statusCode === 200))

// 文件路径路由映射
const routeMapping = {
  'daily_signin.js': '/daily_signin',
  'fm_trash.js': '/fm_trash',
  'personal_fm.js': '/personal_fm'
}
// 平台
const platform = 'Netease'

var fileList = fs.readdirSync(path.join(__dirname, 'module')).reverse()
fileList.forEach((file) => {
  // 必须js后缀
  if (!file.endsWith('.js')) return
  // router
  const route = file in routeMapping ? routeMapping[file] : '/' + file.replace(/\.js$/i, '').replace(/_/g, '/')
  // console.log("添加路由"+route)
  const module = require(path.join(__dirname, 'module', file))
  // 添加路由
  app.use(route, (req, res) => {
    [req.query, req.body].forEach((item) => {
      if (typeof item.cookie === 'string') {
        item.cookie = cookieToJson(decodeURIComponent(item.cookie))
      }
    })
    // 请求参数
    const query = Object.assign(
      {},
      { cookie: req.cookies },
      req.query,
      req.body,
      req.files
    )
    // 请求配置
    const mapping = module.mapping[platform]
    // 请求链接
    const path = config.host[platform] + mapping.url
    // 发生请求
    request(
      mapping.type,
      path,
      mapping.data(query),
      mapping.headers(query)
    ).then((result) => {
      console.log('[OK]', decodeURIComponent(req.originalUrl))
      res.append('Set-Cookie', result.cookie)
      // 映射数据
      console.log(result.body.code)
      if (result.body.code === 200) {
        if (result.body.result) {
          result.body.result = mapping.body(result.body.result)
        } else {
          // 返回映射数据给前台
          result.body = {
            code: result.body.code,
            result: mapping.body(JSON.parse(JSON.stringify(result.body)))
          }
        }
      }
      res.status(result.status).send(result.body)
    }, (error) => {
      console.log('[ERR]', decodeURIComponent(req.originalUrl), {
        status: error.status,
        body: error.body
      })
      if (error.body.code === '301') error.body.msg = '需要登录'
      res.append('Set-Cookie', error.cookie)
      res.status(error.status).send(error.body)
    }).catch((error) => {
      console.log('[ERR]', decodeURIComponent(req.originalUrl), {
        status: 500,
        body: '服务器异常：' + error
      })
      res.status(500).send('服务器异常')
    })
  })
})
// 开启端口服务
app.listen(port, host, () => {
  console.log(`server running @ http://${host || 'localhost'}:${port}`)
})

module.exports = app
