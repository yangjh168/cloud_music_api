const fs = require('fs')
const path = require('path')
const express = require('express')
const { cookieToJson } = require('./utils/index')
const fetch = require('./axios/index')

// const { get } = require('http')

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
// const routeMapping = {
//   'daily_signin.js': '/daily_signin',
//   'fm_trash.js': '/fm_trash',
//   'personal_fm.js': '/personal_fm'
// }

// 获取某目录下所有文件
function getAllFile(dirPath) {
  const fileList = []
  function getFiles(dPath, prePath) {
    var list = fs.readdirSync(dPath)
    list.forEach(item => {
      let currentPath = prePath
      const itemPath = dPath + '\\' + item
      const stat = fs.statSync(itemPath)
      currentPath = currentPath ? (currentPath + '\\' + item) : item
      if (stat.isDirectory() === true) {
        getFiles(itemPath, currentPath)
      } else {
        fileList.push(currentPath)
      }
    })
  }
  getFiles(dirPath, '')
  return fileList
}

// 公共
var fileList = getAllFile(path.join(__dirname, 'module'))// fs.readdirSync(path.join(__dirname, 'module')).reverse()
// console.log(fileList)
fileList.forEach((file) => {
  // 必须js后缀
  if (!file.endsWith('.js')) return
  // router
  // const route = file in routeMapping ? routeMapping[file] : '/' + file.replace(/\.js$/i, '').replace(/_/g, '/')
  const folder = file.split('\\').length > 1 ? file.split('\\')[0] : ''
  const route = '/' + file.replace(/\.js$/i, '').replace(/_/g, '/').replace(/\\/g, '/')
  // console.log("添加路由"+route)
  const module = require(path.join(__dirname, 'module', file))
  // 添加路由
  app.use(route, (req, res) => {
    console.log('[req]', decodeURIComponent(req.originalUrl))
    console.log('[query]', req.query);

    [req.query, req.body].forEach((item) => {
      if (typeof item.cookie === 'string') {
        item.cookie = cookieToJson(decodeURIComponent(item.cookie))
      }
    })
    // 没有传平台参数，默认网易云
    req.query.platform = req.query.platform ? req.query.platform.toString() : '1'
    var platformKey
    console.log('[folder]', folder)
    if (folder) {
      platformKey = folder
      switch (platformKey) {
        case 'kugou':
          req.query.platform = '2'
          break
        case 'kuwo':
          req.query.platform = '3'
          break
        default:
          req.query.platform = '1'
          break
      }
    } else {
      switch (req.query.platform) {
        case '2':
          platformKey = 'kugou'
          break
        case '3':
          platformKey = 'kuwo'
          break
        default:
          platformKey = 'netease'
          break
      }
    }
    // 请求参数
    const query = Object.assign(
      {},
      { cookie: req.cookies },
      req.query,
      req.body,
      req.files
    )
    // 请求配置
    const mapping = folder ? module : module.mapping[platformKey]
    const responseType = mapping.responseType ? mapping.responseType : 'json'
    console.log(mapping.url)
    // 存在url时发送请求，否则走自定义处理
    if (mapping.url) {
      // 发生请求
      fetch.request(
        mapping.type,
        mapping.url,
        mapping.data(query),
        mapping.options(query)
      ).then(async(result) => {
        console.log('[OK]', decodeURIComponent(req.originalUrl))
        res.append('Set-Cookie', result.cookie)
        // 映射数据
        if (responseType === 'xml' || responseType === 'document') {
          // 返回xml
          const body = await mapping.body(result.body)
          result.body = {
            code: 200,
            result: body
          }
        } else {
          // 返回json
          console.log('[code]', result.body.code)
          if (result.body.code === 200) {
            if (result.body.result) {
              result.body.result = await mapping.body(result.body.result, query)
            } else {
              // 返回映射数据给前台
              result.body = {
                code: result.body.code,
                result: await mapping.body(JSON.parse(JSON.stringify(result.body)))
              }
            }
          } else {
            // 返回xml
            const body = await mapping.body(result.body)
            result.body = {
              code: 200,
              result: body
            }
          }
        }
        res.status(result.status).send(result.body)
        console.log('[响应结果]', JSON.stringify(result.body))
      }, (error) => {
        console.log('[ERR]', decodeURIComponent(req.originalUrl), {
          status: error.status,
          body: error.body
        })
        if (error.body.code === '301') error.body.msg = '需要登录'
        res.append('Set-Cookie', error.cookie)
        res.status(error.status).send(error.body)
      }).catch((error) => {
        console.log('[catch]', decodeURIComponent(req.originalUrl), {
          status: 500,
          body: '服务器异常：' + error
        })
        res.status(500).send('服务器异常')
      })
    } else {
      var body = {
        code: 200,
        result: mapping.body(req)
      }
      console.log('[自定义响应结果]', JSON.stringify(body))
      res.status(200).send(body)
    }
  })
})

// 开启端口服务
app.listen(port, host, () => {
  console.log(`server running @ http://${host || 'localhost'}:${port}`)
})

module.exports = app
