const config = require('../config/index')
// 歌词
const mapping = {
  // 网易云
  netease: {
    type: 'POST',
    url: config.host['netease'] + '/api/song/lyric',
    data: (query) => {
      return {
        id: query.id,
        lv: -1,
        kv: -1,
        tv: -1
      }
    },
    options: (query) => {
      return {
        crypto: 'api',
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
