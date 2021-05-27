// 热门歌单分类
const config = require('../config/index')
const mapping = {
  // 网易云
  netease: {
    type: 'POST',
    url: config.host['netease'] + '/weapi/playlist/hottags',
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
      return result.tags.map(item => {
        return {
          id: item.id,
          name: item.name
        }
      })
    }
  },
  // 酷狗
  kugou: {},
  // 酷我
  kuwo: {}
}
module.exports = { mapping }
