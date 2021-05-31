// 所有榜单内容摘要
const config = require('../config/index')
const mapping = {
  // 网易云
  netease: {
    type: 'POST',
    url: config.host['netease'] + '/weapi/toplist/detail',
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
      const res = {
        rank: [],
        other: []
      }
      result.list.forEach(item => {
        if (item.ToplistType !== undefined) {
          res.rank.push({
            id: item.id,
            name: item.name,
            tracks: item.tracks,
            updateFrequency: item.updateFrequency,
            coverImgUrl: item.coverImgUrl
          })
        } else {
          res.other.push({
            id: item.id,
            name: item.name,
            tracks: item.tracks,
            updateFrequency: item.updateFrequency,
            coverImgUrl: item.coverImgUrl
          })
        }
      })
      return res
    }
  },
  // 酷狗
  kugou: {},
  // 酷我
  kuwo: {}
}
module.exports = { mapping }
