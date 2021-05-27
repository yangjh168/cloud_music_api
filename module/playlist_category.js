// 所有歌单分类
const config = require('../config/index')
const mapping = {
  // 网易云
  netease: {
    type: 'POST',
    url: config.host['netease'] + '/weapi/playlist/catalogue',
    data: (query) => {
      return {}
    },
    options: (query) => {
      return {
        crypto: 'weapi',
        cookie: query.cookie,
        proxy: query.proxy,
        realIP: query.realIP
      }
    },
    body: (result) => {
      console.log(result)
      return result
    }
  },
  // 酷狗
  kugou: {},
  // 酷我
  kuwo: {}
}
module.exports = { mapping }
