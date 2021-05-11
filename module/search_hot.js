const config = require('../config/index')
// 热门搜索
const mapping = {
  // 网易云
  netease: {
    type: 'POST',
    url: config.host['netease'] + '/weapi/search/hot',
    data: (query) => {
      return {
        type: 1111
      }
    },
    options: (query) => {
      return {
        crypto: 'weapi',
        ua: 'mobile',
        cookie: query.cookie,
        proxy: query.proxy,
        realIP: query.realIP
      }
    },
    body: (result) => {
      return result
    }
  },
  // 酷狗
  kugou: {
    'address': 'adres'
  },
  // 酷我
  kuwo: {
    'address': 'adres'
  }
}
module.exports = { mapping }
