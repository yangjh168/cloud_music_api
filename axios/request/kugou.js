// const encrypt = require('../crypto')
const axios = require('axios')
const queryString = require('querystring')
// const PacProxyAgent = require('pac-proxy-agent')
// const http = require('http')
// const https = require('https')
// const tunnel = require('tunnel')
// const qs = require('url')

// const chooseUserAgent = require('../agent')
// request.debug = true // 开启可看到更详细信息

const request = (method, url, data, options) => {
  return new Promise((resolve, reject) => {
    const answer = { status: 500, body: {}, cookie: [] }
    console.log('请求方式:' + method)
    console.log('请求url:' + url)
    console.log('请求参数:' + queryString.stringify(data))
    const settings = {
      method: method,
      url: url,
      // headers: headers,
      [method.toUpperCase() === 'POST' ? 'data' : 'params']: method.toUpperCase() === 'POST' ? queryString.stringify(data) : data
    }
    axios(settings)
      .then((res) => {
        const body = res.data
        try {
          answer.body = body
          answer.status = answer.body.code || res.status
          if ([201, 302, 400, 502, 800, 801, 802, 803].indexOf(answer.body.code) > -1) {
            // 特殊状态码
            answer.status = 200
          }
        } catch (e) {
          // console.log(e)
          answer.body = body
          answer.status = res.status
        }

        answer.status = (answer.status > 100 && answer.status < 600) ? answer.status : 400
        if (answer.status === 200) resolve(answer)
        else reject(answer)
      })
      .catch((err) => {
        answer.status = 502
        answer.body = { code: 502, msg: err }
        reject(answer)
      })
  })
}

module.exports = request
