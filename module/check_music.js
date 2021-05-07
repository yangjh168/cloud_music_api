const config = require('../config/index')
// 检查音乐是否可用
const mapping = {
  // 网易云
  netease: {
    type: 'POST',
    url: config.host['netease'] + '/weapi/song/enhance/player/url',
    data: (query) => {
      return {
        ids: '[' + parseInt(query.id) + ']',
        br: parseInt(query.br || 999000)
      }
    },
    headers: (query) => {
      return {
        crypto: 'weapi',
        cookie: query.cookie,
        proxy: query.proxy,
        realIP: query.realIP
      }
    },
    body: (result) => {
      return true
    }
  },
  // 酷狗
  KuGou: {
    'address': 'adres'
  },
  // 酷我
  Kuwo: {
    'address': 'adres'
  }
}
module.exports = { mapping }
