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
    options: (query) => {
      return {
        crypto: 'weapi',
        cookie: query.cookie,
        proxy: query.proxy,
        realIP: query.realIP
      }
    },
    body: (result) => {
      return result && result.data && result.data[0]['fee'] === 8
    }
  },
  // 酷狗
  kugou: {
    url: '',
    body: (result) => {
      return true
    }
  },
  // 酷我
  kuwo: {
    url: '',
    body: (result) => {
      return true
    }
  }
}
module.exports = { mapping }
