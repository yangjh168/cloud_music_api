
var neteaseRequest = require('./request/netease')
var kugouRequest = require('./request/kugou')
var kuwoRequest = require('./request/kuwo')

const fetch = {
  get: function(url, data, options = {}) {
    options.platform = data.platform.toString()
    return this.request('get', url, data, options)
  },
  post: function(url, data, options = {}) {
    options.platform = data.platform.toString()
    return this.request('post', url, data, options)
  },
  request: (method, url, data, options) => {
    if (options.platform === '2') {
      console.log('请求平台：酷狗')
      return kugouRequest(method, url, data, options)
    } else if (options.platform === '3') {
      console.log('请求平台：酷我')
      return kuwoRequest(method, url, data, options)
    } else {
      console.log('请求平台：网易云')
      return neteaseRequest(method, url, data, options)
    }
  }
}

module.exports = fetch
